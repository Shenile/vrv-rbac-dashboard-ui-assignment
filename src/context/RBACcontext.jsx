import React, { createContext, useContext, useEffect, useState } from "react";
import { getRoles, getPermissions, login, getEvents } from "../services/api";
import Loading from "../components/Loading";

const RBACContext = createContext();

export const useRBAC = () => {
  return useContext(RBACContext);
};

export const RBACProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentUserRules, setCurrentUserRules] = useState(null);
  const [roles, setRoles] = useState([]);
  const [rules, setRules] = useState([]);
  const [events, setEvents] = useState([]);
  const [isloading, setLoading] = useState();

  const fetchUserDetails = async (role = 1) => {
    try {
      setLoading(true);
      const res = await login(role); // Fetch user data based on role
      setLoading(false);
      setCurrentUser(res.user);
      setCurrentUserRole(res.role.role_name);
      setCurrentUserRules(res.role.permissions);

    } catch (err) {
      setLoading(false);
      alert("Error fetching user details: " + err);
    }
  };

  const fetchRules = async () => {
    try {
      const res = await getPermissions();

      setRules(res);
    } catch (err) {
      alert("Error Rules: " + err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res);
    } catch (err) {
      alert("Error Rules: " + err);
    }
  }

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      setRoles(res);
    } catch (err) {
      alert("Error fetching roles: " + err);
    }
  };

  // Handle login with a specific role
  const handleLoginWithRole = async (role) => {
    fetchUserDetails(role); // Fetch user details when role changes
  };

  // Handle role swap
  const handleRoleSwap = async (newRole) => {
    try {
      await fetchUserDetails(newRole);
     
    } catch (err) {
      alert("ERROR", err);
    }
  };


  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
    fetchRules();
    fetchEvents();
  }, []);

  const value = {
    currentUser,
    currentUserRole,
    currentUserRules,
    roles,
    handleLoginWithRole,
    handleRoleSwap,
    rules, 
    events,
    fetchRoles,
    fetchRules, 
    isloading, 
    setLoading,
    fetchUserDetails
  };
  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
};
