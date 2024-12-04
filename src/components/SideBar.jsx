import React, { useState, createContext, useContext } from "react";
import {
  Menu,
  MoreVertical,
  MoonStarIcon,
  Sun,
  ArrowRightLeft,
} from "lucide-react";
import { useRBAC } from "../context/RBACcontext";
import CustomButton from "./CustomButton";

// Context to manage expanded/collapsed state of the sidebar
const SidebarContext = createContext();

export function Sidebar({ children, toggletheme, theme, className }) {
  const [expanded, setExpanded] = useState(false);
  const { roles, handleRoleSwap, currentUserRole } = useRBAC();

  return (
    <aside className="h-full">
      <nav
        className={`h-full flex flex-col bg-white border border-gray-500 border-opacity-50 rounded-lg
                   dark:bg-surface-a10 dark:border-0 dark:rounded-lg shadow-sm ${className}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 pb-2 flex items-center ">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="flex items-center p-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-surface-a0"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>

          <span
            className={`font-bold tracking-wide text-lg text-gray-600 dark:text-gray-300 overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            beevent
          </span>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 ">{children}</ul>
        </SidebarContext.Provider>

        {/* Footer Section */}
        <div className="flex flex-col p-3 gap-6 overflow-hidden transition-all">
          <button
            onClick={toggletheme}
            className={`${
              !expanded
                ? "px-3 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-surface-a0"
                : "mx-2 px-3 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-surface-a0"
            }
            flex items-center justify-start`}
          >
            {/* Theme icon */}
            {theme === "dark" ? (
              <MoonStarIcon size={20} className="dark:text-gray-300 " />
            ) : (
              <Sun size={20} />
            )}

            {/* Theme text */}
            <span
              className={`font-medium text-gray-600 dark:text-gray-300 overflow-hidden transition-all ${
                expanded ? "ml-3 w-fit opacity-100" : "w-0 opacity-0"
              }`}
            >
              {theme}
            </span>
          </button>

          {expanded && (
            <RoleSwitcher
              roles={roles}
              currentUserRole={currentUserRole}
              handleRoleSwap={handleRoleSwap}
            />
          )}
          {!expanded && (
            <CustomButton
              icon={<ArrowRightLeft />}
              onClick={() => setExpanded(true)}
            />
          )}
        </div>
      </nav>
    </aside>
  );
}

// SidebarItem to render each item in the list
export function SidebarItem({ icon: Icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
    relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer
    transition-colors group dark:text-gray-300
    ${
      active
        ? "text-highlight dark:text-highlight hover:bg-gray-300 dark:hover:bg-surface-a0"
        : "hover:bg-gray-300 dark:hover:bg-surface-a0 text-gray-600"
    }
  `}
    >
      {/* Icon */}
      {Icon && <Icon size={20} />}
      {/* Item Label */}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Alert Dot */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* Tooltip for Collapsed Mode */}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

const RoleSwitcher = ({ roles, currentUserRole, handleRoleSwap }) => {
  const [selectedRole, setSelectedRole] = useState(
    roles.find((role) => role.role_name === currentUserRole)?.id || ""
  );

  const handleDropdownChange = (value) => {
    setSelectedRole(value); // Update local state when dropdown changes
  };

  const handleButtonClick = () => {
    if (selectedRole) {
      handleRoleSwap(selectedRole); // Trigger role swap with the selected role
    }
  };

  return (
    <div className="p-2 w-full flex flex-col gap-3">
      {/* Dropdown */}

      <select
        className="p-2 border dark:border-0 dark:text-gray-100 rounded-md dark:bg-surface-a0"
        value={selectedRole}
        onChange={(e) => handleDropdownChange(e.target.value)}
      >
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.role_name}
          </option>
        ))}
      </select>

      {/* Button */}
      <CustomButton
        onClick={handleButtonClick}
        label={"switch role"}
        icon={<ArrowRightLeft />}
        iconPosition="left"
        className={"w-full"}
      >
        Confirm Role
      </CustomButton>
    </div>
  );
};

export default RoleSwitcher;
