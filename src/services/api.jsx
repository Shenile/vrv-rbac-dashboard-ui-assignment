import axios from 'axios'; 

const apiBaseUrl = "https://beevapi.onrender.com"; 



export const login = async (role) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/login`, { role });

    return response.data;
  } catch (error) {
    alert("Error during login:", error);
    throw error;
  }
};




// ------------------- Users API -------------------

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    
    return response.data;
  } catch (error) {
    alert('Error fetching users:', error);
    throw error;
  }
};

// Fetch a specific user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/${id}`);
    return response.data;
  } catch (error) {
    alert(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/users`, user);
    return response.data;
  } catch (error) {
    alert('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async ({ id, name, email, role_id, current_event, status }) => {
  try {
    // Prepare the data object to send to the API
    const updatedData = { name, email, role_id, current_event, status };

    // Make the API request to update the user
    const response = await axios.put(`${apiBaseUrl}/users/${id}`, updatedData);
    
    return response.data;
  } catch (error) {
    alert(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/users/${id}`);
    return response.data;
  } catch (error) {
    alert(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

// ------------------- Roles API -------------------

// Fetch all roles
export const getRoles = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// Fetch a specific role by ID
export const getRoleById = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching role with ID ${id}:`, error);
    throw error;
  }
};

// Create a new role
export const createRole = async (role) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/roles`, role);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
};

// Update an existing role
export const updateRole = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/roles/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with ID ${id}:`, error);
    throw error;
  }
};

// Delete a role
export const deleteRole = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with ID ${id}:`, error);
    throw error;
  }
};

// ------------------- Permissions API -------------------

// Fetch all permissions
export const getPermissions = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/permissions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};

// Fetch a specific permission by ID
export const getPermissionById = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching permission with ID ${id}:`, error);
    throw error;
  }
};

// Create a new permission
export const createPermission = async (permission) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/permissions`, permission);
    return response.data;
  } catch (error) {
    console.error('Error creating permission:', error);
    throw error;
  }
};

// Update an existing permission
export const updatePermission = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/permissions/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating permission with ID ${id}:`, error);
    throw error;
  }
};

// Delete a permission
export const deletePermission = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/permissions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting permission with ID ${id}:`, error);
    throw error;
  }
};

// ------------------- Events API -------------------

// Fetch all events
export const getEvents = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fetch a specific event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

// Create a new event
export const createEvent = async (event) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/events`, event);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update an existing event
export const updateEvent = async (id, updatedData) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/events/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating event with ID ${id}:`, error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with ID ${id}:`, error);
    throw error;
  }
};
