// components/BottomNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Key, Shield, FileText, Settings } from 'lucide-react';

const BottomNavBar = ({ activeItem, onItemClick }) => {
  const items = [
    { id: 'dashboard', text: 'Dashboard', icon: <Home size={16}/> },
    { id: 'users', text: 'Users', icon: <Users size={16}/> },
    { id: 'roles', text: 'Roles', icon: <Shield size={16}/> },
    { id: 'rules', text: 'Rules', icon: <Key size={16}/> },
    { id: 'audit-Logs', text: 'Audit Logs', icon: <FileText size={16}/> },
    { id: 'settings', text: 'Settings', icon: <Settings size={16}/> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-100  dark:bg-surface-a0
    dark:border-t dark:border-surface-a10 text-white flex justify-around p-4">
      {items.map((item) => (
        <Link
          key={item.id}
          to={`/${item.id}`}
          className={`flex flex-col items-center ${activeItem === item.id ? 'text-highlight' : 'text-gray-500 dark:text-gray-100'}`}
          onClick={() => onItemClick(item.id)}
        >
          {item.icon}
          <span className="text-xs">{item.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavBar;
