import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import { useRBAC } from "../context/RBACcontext";
import { useMediaQuery } from "react-responsive";
import CustomButton from "../components/CustomButton";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role_id: "",
    current_event: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { roles, setLoading } = useRBAC();

  // Media Queries
  const isMobile = useMediaQuery({ minWidth: 360, maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Set dynamic headers based on screen size
  const [headers, setHeaders] = useState([
    "Name",
    "Email",
    "Role",
    "Status",
    "Actions",
  ]);

  useEffect(() => {
   
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isMobile) {
      setHeaders(["User", "Actions"]);
    } else if (isTablet) {
      setHeaders(["User", "Role", "Status", "Actions"]);
    } else if (isDesktop) {
      setHeaders(["Name", "Email", "Role", "Status", "Actions"]);
    }
  }, [isMobile, isTablet, isDesktop]);

  const fetchUsers = async () => {
    setLoading(true);
    const users = await getUsers();
    setUsers(users);
    setLoading(false);
  };

  const handleAddUser = async () => {
    const newUser = { ...formData };
    setLoading(true);
    const { user } = await createUser(newUser);
    setUsers([...users, user]);
    setLoading(false);
    closeModal();
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setFormData({
      id: userToEdit.id,
      name: userToEdit.name,
      email: userToEdit.email,
      role_id: userToEdit.role_id,
      current_event: userToEdit.current_event,
      status: userToEdit.status,
    });
    setIsEditing(true);
    openModal();
  };

  const handleSaveUser = async () => {
    try{
      setLoading(true);
      const updatedUser = await updateUser(formData);
      setLoading(false);
      setUsers((prev) =>
        prev.map((user) => (user.id === formData.id ? updatedUser : user))
      );
      closeModal();
    }catch (err){
      setLoading(false);
      alert("ERROR : ", err);
    }
    
  };

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting user:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({
      name: "",
      email: "",
      role_id: "",
      current_event: "",
      status: "Active",
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role_id: e.target.value });
  };

  const renderRow = (user) => (
    <tr key={user.id} className="text-gray-800 dark:text-gray-400">
      {headers.includes("User") && isTablet && (
        <td className="font-normal tracking-wide border-b dark:border-surface-a90 py-4">
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </td>
      )}

      {headers.includes("User") && isMobile && (
        <td className=" border-b dark:border-surface-a90 py-4">
          <div className="flex flex-col gap-1 justify-center">
            <p className="font-sm">{user.name}</p>
            <p className="font-sm">{user.email}</p>
            <p className="font-sm">{user.role || "Not Assigned"}</p>
            <p className={`w-fit mt-1 px-2 py-1 font-sm text-sm border rounded-lg ${
            user.status == "Active"
              ? "text-green-500 dark:text-green-600 border-green-500 dark:border-green-600"
              : "text-red-500 dark:text-red-600 border-red-500 dark:border-red-600"
          }`}>{user.status}</p>
          </div>
        </td>
      )}

      {headers.includes("Name") && (
        <td className="font-normal tracking-wide border-b dark:border-surface-a90 py-4">
          {user.name}
        </td>
      )}
      {headers.includes("Email") && (
        <td className="font-normal tracking-wide border-b dark:border-surface-a90 py-4">
          {user.email}
        </td>
      )}
      {headers.includes("Role") && (
        <td className="font-normal tracking-wide border-b dark:border-surface-a90 py-4">
          {user.role || "Not assigned"}
        </td>
      )}
      {headers.includes("Status") && (
        <td
          className={`font-normal tracking-wide border-b dark:border-surface-a90 py-4 
          ${
            user.status == "Active"
              ? "text-sm text-green-500 dark:text-green-600"
              : "text-sm text-red-500 dark:text-red-600"
          }`}
        >
          <p
            className={`border ${
              user.status == "Active"
                ? "w-fit px-2 py-1 border rounded-lg border-green-500 dark:border-green-600"
                : "w-fit px-2 py-1 border rounded-lg border-red-500 dark:border-red-600"
            }`}
          >
            {user.status}
          </p>
        </td>
      )}
      {headers.includes("Actions") && (
        <td className="border-b dark:border-surface-a90 py-4">
          <div className="flex gap-4 items-center">
            <CustomButton
              label={"Edit"}
              onClick={() => handleEditUser(user.id)}
              defaultStyles={false}
              className={
                "text-custom-btn-light dark:text-custom-btn-dark hover:underline"
              }
            />
            <CustomButton
              label={"Delete"}
              onClick={() => handleDelete(user.id)}
              defaultStyles={false}
              className={"text-red-500 dark:text-red-700"}
            />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <div className="xs:px-4 xs:py-2 md:p-0">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold tracking-wide mb-4 dark:text-gray-100">Users Management</h1>
        </div>
        

        <CustomButton
          onClick={openModal}
          defaultStyles={false}
          label={"Add User"}
          className={`text-sm md:text-md px-2 py-1 h-fit w-fit md:px-3 md:py-2
            font-semibold text-white bg-custom-btn-light 
            hover:bg-custom-btn-hover-light dark:btn-custom-btn-dark 
            dark:custom-btn-hover-dark rounded-lg`}
        />
      </div>

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 dark:bg-surface-a10 dark:bg-opacity-25 dark:backdrop-blur-sm flex items-center justify-center z-45">
          <div className="p-12 bg-white dark:bg-surface-a0 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isEditing ? handleSaveUser() : handleAddUser();
              }}
              className="flex flex-col gap-4"
            >
              <p className="text-gray-700 dark:text-gray-100">Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border dark:border-0 dark:text-gray-100 dark:bg-surface-a10 p-2 rounded-md"
                required
              />

              <p className="text-gray-700 dark:text-gray-100">Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border dark:border-0 dark:text-gray-100 dark:bg-surface-a10 p-2 rounded-md"
                required
              />

              <p className="text-gray-700 dark:text-gray-100">Role</p>
              <select
                name="role_id"
                value={formData.role_id}
                onChange={handleRoleChange}
                className="border dark:border-0 dark:text-gray-100 dark:bg-surface-a10 p-2 rounded-md "
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>

              <p className="text-gray-700 dark:text-gray-100">Status</p>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border dark:border-0 dark:text-gray-100 dark:border-gray-600 p-2 rounded-md dark:bg-surface-a10"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex gap-4 mt-4">
                <CustomButton
                  label={isEditing ? "Save" : "Add User"}
                  type="submit"
                  className="bg-custom-btn-light dark:bg-custom-btn-dark dark:hover:bg-custom-btn-hover-dark text-white"
                />
                <CustomButton
                  label="Discard"
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-500 text-white"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table with Scrolling */}
      <div className="md:h-[575px] md:overflow-y-scroll scrollbar-thin 
      dark:scrollbar-thumb-surface-a10 dark:scrollbar-track-surface-a0 mt-4">
        <table className="w-full table-auto border-separate">
          <thead>
            <tr className="">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="text-left py-2 pb-4 font-semibold text-gray-700 dark:text-gray-100 border-b border-gray-300 dark:border-surface-a10"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{users.map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
