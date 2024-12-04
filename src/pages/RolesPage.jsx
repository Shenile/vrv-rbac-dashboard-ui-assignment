import React, { useState } from "react";
import { UsersRound, TicketX, Shield, Key, Wrench } from "lucide-react";
import { useRBAC } from "../context/RBACcontext";
import { createRole, updateRole, deleteRole } from "../services/api";
import CustomButton from "../components/CustomButton";


function RoleForm({
  mode = "create", 
  initialData = {}, 
  rules, 
  fetchRoles, 
  onCancel, 
}) {
  const [roleName, setRoleName] = useState(initialData.role_name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [selectedPermissions, setSelectedPermissions] = useState(
    initialData.permissions || []
  );


  const groupedPermissions = rules.reduce((acc, rule) => {
    acc[rule.context] = acc[rule.context] || [];
    acc[rule.context].push(rule);
    return acc;
  }, {});

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions(
      (prev) =>
        prev.includes(permissionId)
          ? prev.filter((id) => id !== permissionId) // Remove permission
          : [...prev, permissionId] // Add permission
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      role_name: roleName,
      description: description,
      permissions: selectedPermissions,
    };

    try {
      if (mode === "create") {
        await createRole(payload);
      }

      if (mode === "edit") {
        await updateRole(initialData.id, payload);
      }

      fetchRoles();
    } catch (err) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  const getContextIcon = (context) => {
    switch (context.toLowerCase()) {
      case "user":
        return <UsersRound size={20} className="mr-2 text-highlight" />;
      case "role":
        return <Shield size={20} className="mr-2 text-highlight" />;
      case "event":
        return <TicketX size={20} className="mr-2 text-highlight" />;
      case "rules":
        return <Key size={20} className="mr-2 text-highlight" />;
      default:
        return <Wrench size={20} className="mr-2 text-highlight" />;
    }
  };

  return (
    <div className="w-full xs:p-4 md:p-8 bg-white border dark:bg-surface-a0 dark:border-0 rounded-xl shadow-md mx-auto xs:px-4 md:px-20 lg:px-48">
      <form onSubmit={handleSubmit}>
        {/* Role Name */}
        <div className="mb-12">
          <label
            className="block font-semibold text-gray-900 dark:text-white"
            htmlFor="roleName"
          >
            Role Name
          </label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="xs:w-full md:w-52 p-2 border border-gray-300 rounded-lg mt-4 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Enter role name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-12">
          <label
            className="block font-semibold text-gray-900 dark:text-white"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="xs:w-full md:w-3/4 h-24 p-2 border border-gray-300 rounded-lg mt-4 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Enter role description"
            required
          />
        </div>

        {/* Permissions */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-900 dark:text-white mb-4">
            Permissions/Rules
          </label>
          {Object.entries(groupedPermissions).map(
            ([context, permissionsList]) => (
              <div key={context} className="mb-6">
                <h2 className="flex items-center gap-2 py-2 my-2 border-t border-b border-gray-300 dark:border-surface-a10 text-md font-semibold text-gray-800 dark:text-white capitalize mb-2">
                  {getContextIcon(context)}
                  {context} Management
                </h2>
                <div className="space-y-2">
                  {permissionsList.map((rule) => (
                    <div key={rule.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`permission-${rule.id}`}
                        checked={selectedPermissions.includes(rule.id)}
                        onChange={() => handlePermissionChange(rule.id)}
                        className="mr-2 rounded"
                      />
                      <label
                        htmlFor={`permission-${rule.id}`}
                        className="text-gray-700 dark:text-white"
                      >
                        {rule.permission_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-8 mt-12">
          <CustomButton
            label="Cancel"
            onClick={onCancel}
            className="bg-gray-300 dark:bg-surface-a10 text-white text-sm px-2 py-1 md:text-md md:px-3 md:py-2 rounded-md font-semibold"
          />
          <CustomButton
            type="submit"
            label={mode === "create" ? "Create Role" : "Update Role"}
            onClick={handleSubmit}
            className="bg-highlight text-white text-sm px-2 py-1 md:text-md md:px-3 md:py-2 rounded-md font-semibold"
          />
        </div>
      </form>
    </div>
  );
}

function ManageMode({ roles, rules, fetchRoles }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async (roleId) => {
    try {
      await deleteRole(roleId);
      alert("Role deleted successfully!");
      fetchRoles(); 
    } catch (error) {
      alert(`Error deleting role: ${error.message}`);
    }
  };
  return (
    <div className="">
      {!createMode && !selectedRole && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Existing Roles */}
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex flex-col gap-4 bg-white dark:bg-surface-a0 shadow-md rounded-lg p-4 
            border border-gray-200 dark:border-surface-a10 dark:text-white"
            >
              <h3 className=" font-semibold text-gray-900 dark:text-gray-100 tracking-wide">
                {role.role_name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {role.description}
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  className="px-3 py-2 text-highlight dark:text-btn-dark hover:underline"
                  onClick={() => {
                    setSelectedRole(role);
                    setEditMode(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-2 text-red-500 hover:text-red-400 dark:hover:text-red-600 hover:underline"
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* "Create Role" Card */}
          <div
            className="flex flex-col items-center justify-center 
          bg-gray-100 dark:bg-surface-a0 hover:bg-gray-300 dark:hover:bg-surface-a10 border-dashed border-2 border-gray-300 dark:border-surface-a10 rounded-lg p-6 hover:shadow-md cursor-pointer"
            onClick={() => setCreateMode(true)}
          >
            <span className="text-3xl text-gray-400">+</span>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create New Role
            </p>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {selectedRole && (
        <RoleForm
          mode="edit"
          initialData={selectedRole}
          rules={rules}
          onCancel={() => (setSelectedRole(null), setEditMode(false))}
          fetchRoles={fetchRoles}
        />
      )}

      {/* Create Role Modal */}
      {createMode && (
        <div>
          <h3 className="text-xl font-bold mb-4">Create New Role</h3>
          <RoleForm
            mode="create"
            onCancel={() => setCreateMode(false)}
            rules={rules}
            fetchRoles={fetchRoles}
          />
        </div>
      )}
    </div>
  );
}

function RolesPage() {
  const { rules, fetchRoles, roles } = useRBAC(); // Fetching the rules/permissions

  return (
    <div className="xs:p-4 md:p-0 overflow-y-scroll scrollbar scrollbar-thin dark:scrollbar-thumb-surface-a10 dark:scrollbar-track-surface-a0 md:h-screen lg:h-[625px]">
      <h1 className="text-lg dark:text-gray-100  font-semibold tracking-wide mb-4">
        Roles Management
      </h1>
      <ManageMode roles={roles} rules={rules} fetchRoles={fetchRoles} />
    </div>
  );
}

export default RolesPage;
