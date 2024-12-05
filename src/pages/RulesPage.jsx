import React, { useState } from 'react';
import { useRBAC } from '../context/RBACcontext';
import { createPermission, updatePermission, deletePermission } from '../services/api';
import {
  UsersRound,
  TicketX,
  Shield,
  Key,
  Wrench,

} from "lucide-react";

function RulesPage() {
  const { rules, fetchRules } = useRBAC(); // Assuming these API functions are available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: '', permission_name: '', context: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  const groupedRules = rules.reduce((acc, rule) => {
    if (!acc[rule.context]) acc[rule.context] = [];
    acc[rule.context].push(rule);
    return acc;
  }, {});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = (context, rule = null) => {
    if (rule) {
      setFormData(rule);
      setIsEditing(true);
    } else {
      setFormData({ id: '', permission_name: '', context, description: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ id: '', permission_name: '', context: '', description: '' });
  };

  const handleSubmit = async() => {
    if (isEditing) {
      const {id, ...dataToUpdate} = formData;
      await updatePermission(id, dataToUpdate); // Update rule via API
    } else {
      await createPermission(formData); // Create new rule via API
    }

    fetchRules();
    handleCloseModal();
  };

  const handleDelete = async(id) => {
    try{
      await deletePermission(id);
      fetchRules();
    }catch(err){

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
  }

  return (
    <div className='xs:p-4 lg:px-20 md:h-screen'>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Rules Management
      </h1>

      <div className="mt-6 md:pr-8 md:h-[550px] md:overflow-y-scroll scrollbar scrollbar-thin dark:scrollbar-thumb-surface-a0 dark:scrollbar-track-surface-a10">
        {Object.entries(groupedRules).map(([context, contextRules]) => (
          <div key={context} className="mb-8 ">
            <h2 className="flex gap-2 items-center font-semibold text-gray-700 
            dark:text-gray-300 dark:border-surface-a10 border-b pb-2 mb-4">
              {getContextIcon(context)}{context.charAt(0).toUpperCase() + context.slice(1)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contextRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 border dark:border-surface-a10 rounded shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div>
                    <p className="font-medium dark:text-gray-100">{rule.permission_name}</p>
                    <p className="text-sm text-gray-500">{rule.description}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <button
                      className="text-sm md:text-md text-highlight hover:underline pr-2 md:px-2"
                      onClick={() => handleOpenModal(context, rule)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm md:text-md text-red-500 hover:underline pr-2 md:px-2"
                      onClick={() => handleDelete(rule.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div
                className="p-4 border-dashed border-2 border-gray-300 dark:border-gray-600 
                rounded flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-surface-a10"
                onClick={() => handleOpenModal(context)}
              >
                <span className="text-blue-500 font-semibold">+ Create Rule</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-surface-a10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-a0 dark:text-gray-100 p-6 rounded shadow-md w-11/12 sm:w-1/3">
            <h2 className="text-lg font-semibold">{isEditing ? 'Edit Rule' : 'Create Rule'}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mt-4">
                <label className="block dark:text-gray-400 mt-2">Permission Name</label>
                <input
                  type="text"
                  name="permission_name"
                  value={formData.permission_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mt-2 dark:bg-surface-a10 dark:border-0"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block dark:text-gray-400 mt-2 ">Context</label>
                <input
                  type="text"
                  name="context"
                  value={formData.context}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mt-2 dark:bg-surface-a10 dark:border-0"
                  readOnly
                />
              </div>
              <div className="mt-4">
                <label className="block dark:text-gray-400 mt-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mt-2 dark:bg-surface-a10 dark:border-0"
                  required
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="dark:text-gray-100 px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-custom-btn-light hover:bg-custom-btn-hover-light
                             dark:bg-custom-btn-dark dark:hover:bg-custom-btn-hover-dark text-white px-4 py-2 rounded"
                  onClick={handleSubmit}
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RulesPage;
