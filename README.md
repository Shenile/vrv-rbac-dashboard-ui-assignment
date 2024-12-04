
# **College Event Management System with Role-Based Access Control (RBAC)**

**Live Link**: [College Event Management System](https://beevent.netlify.app/)

## **Overview**

This project is a **College Event Management System** that incorporates **Role-Based Access Control (RBAC)** to manage users, roles, and rules for event management. Administrators and event organizers can efficiently manage users, define roles, assign permissions, and control access to various system features based on roles.

The system allows dynamic role assignments, permission modifications, and CRUD operations for users, roles, and rules, providing a secure, organized way to manage access within the application.

## **Features**

- **User Management (CRUD):**
  - Add, edit, delete, and view users.
  - Assign roles to users to control their access to specific features.
  
- **Role Management (CRUD):**
  - Define new roles, edit existing ones, and assign them appropriate permissions.
  
- **Rule Management (CRUD):**
  - Define, edit, and manage rules associated with each role to ensure proper access control.

- **RBAC Rules and Role Switching:**
  - Dynamic assignment and modification of roles and rules.
  - Role-based rendering: The UI adjusts content based on the role of the logged-in user.
  - Feature to switch between different roles for testing or demonstration of RBAC functionality.

- **Theming:**
  - Both **dark** and **light** themes are available, allowing users to switch between themes for better accessibility and comfort.

- **Responsive Navbar:**
  - Fully responsive navigation bar that adapts to different screen sizes for a seamless experience on mobile and desktop.

- **Specialized API:**
  - Developed using **Python Flask** to handle backend logic, including user, role, and rule management.

## **Tech Stack**

- **Frontend:**
  - **React.js**: For building the user interface and managing state.
  - **Tailwind CSS**: For designing the UI with utility-first CSS.
  
- **Backend:**
  - **Python Flask**: For creating a specialized API to handle CRUD operations and role-based access control logic.

  API REPOSITORY LINK : --

## **How It Works**

1. **User Management**: Admins can manage users and assign roles that define their permissions.
2. **Role Management**: Admins can create roles with specific permissions and assign them to users.
3. **Rule Management**: Permissions and rules for each role can be defined and modified dynamically.
4. **RBAC Logic**: The app dynamically renders content based on the user's assigned role. Role switching allows for testing different RBAC setups and demonstrations.
5. **Theming**: Users can toggle between dark and light themes to suit their preferences.
6. **Navigation**: A responsive navbar ensures a fluid experience across different screen sizes.

## **Getting Started**

To run the project locally, follow these steps:

### **Frontend Setup (React)**

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

    This will start the React application on `http://localhost:5743`.

    The API is deployed using Render., So no setup required .

### **Testing RBAC**

- Once the app is running, you can log in as different users with various roles (e.g., Admin, Organizer, Viewer) to see the RBAC implementation in action.
- Use the role-switching feature to test how the UI changes when switching roles.
  
## **Screenshots**

- ![image](https://github.com/user-attachments/assets/44e6ab2c-4ea6-4c30-8b1c-e1a2ad6b3bb0)
- ![image](https://github.com/user-attachments/assets/3b195185-e54a-48c2-a320-b07c3f280802)

- Dark theme samples, 
- ![image](https://github.com/user-attachments/assets/74b86115-e25b-4917-abef-f94339ecb490)
- ![image](https://github.com/user-attachments/assets/0d42b31b-4b70-43b9-940f-bcc32f0e18c8)


- Mobile UI
- ![image](https://github.com/user-attachments/assets/4481b189-48ca-4387-acc9-9b7af5c5918e)
- ![image](https://github.com/user-attachments/assets/5e7d8d51-0825-4d93-9d62-a8ad815b4605)




## **Security Considerations**

- The system ensures that all user inputs are validated, preventing any unauthorized or malicious access.
- Sensitive operations are only available to users with the necessary roles and permissions.

