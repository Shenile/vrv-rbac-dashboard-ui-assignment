import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Key, Shield, FileText, Settings } from "lucide-react";

const BottomNavBar = ({ activeItem, onItemClick }) => {
  const items = [
    { id: "dashboard", text: "Dashboard", icon: <Home size={20} /> },
    { id: "users", text: "Users", icon: <Users size={20} /> },
    { id: "roles", text: "Roles", icon: <Shield size={20} /> },
    { id: "rules", text: "Rules", icon: <Key size={20} /> },
    { id: "audit-Logs", text: "Audit Logs", icon: <FileText size={20} /> },
    { id: "settings", text: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed bottom-4 left-0 w-full px-2">
      <div className="rounded-full left-0 w-full bg-white shadow-lg border border-gray-300
       dark:bg-surface-a0 dark:border-t dark:border-surface-a10 text-white flex justify-around p-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/${item.id}`}
            className={`flex flex-col items-center relative ${
              activeItem === item.id
                ? "text-highlight"
                : "text-gray-500 dark:text-gray-100"
            } transition-all duration-200 ease-in-out`}
            onClick={() => onItemClick(item.id)}
          >
            {item.icon}

            {/* Tooltip Text */}
            <span className="absolute bottom-full mb-2 hidden text-sm bg-black text-white p-2 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:block">
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
