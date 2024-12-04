import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getUsers, getEvents, getRoles, getPermissions } from "../services/api";

// Admin Data Context to store users, roles, events, etc.
const AdminDataContext = createContext();

export const useAdminData = () => {
  return useContext(AdminDataContext);
};

export const AdminDataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [events, setEvents] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // Fetch data when the app loads
  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual data fetching logic (e.g., API calls)
      const fetchedUsers = await getUsers();
      const fetchedRoles = await getRoles();
      const fetchedEvents = await getEvents();
      const fetchedPermissions = await getPermissions();

      setUsers(fetchedUsers);
      setRoles(fetchedRoles);
      setEvents(fetchedEvents);
      setPermissions(fetchedPermissions);
    };

    fetchData();
  }, []);

  // UseMemo to avoid recalculating the Maps unless data changes
  const usersMap = useMemo(() => new Map(users.map(user => [user.id, user])), [users]);
  const rolesMap = useMemo(() => new Map(roles.map(role => [role.id, role])), [roles]);
  const eventsMap = useMemo(() => new Map(events.map(event => [event.id, event])), [events]);
  const permissionsMap = useMemo(() => new Map(permissions.map(permission => [permission.id, permission])), [permissions]);

  return (
    <AdminDataContext.Provider
      value={{
        users,
        roles,
        events,
        permissions,
        usersMap,
        rolesMap,
        eventsMap,
        permissionsMap,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};