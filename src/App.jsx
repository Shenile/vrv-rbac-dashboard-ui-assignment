import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Sidebar, SidebarItem } from "./components/SideBar"; // Import Sidebar and SidebarItem
import BottomNavBar from "./components/BottomNavBar";
import { Home, Users, Key, Shield, FileText, Settings, LayoutDashboard } from "lucide-react";
import { useRBAC, RBACProvider } from "./context/RBACcontext"; // Import RBACContext
import LandingPage from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { SettingsPage } from "./pages/SettingsPage";
import RulesPage from "./pages/RulesPage";
import ProtectedRoute from "./ProtectedRoute";
import { useMediaQuery } from "react-responsive"; // For media query hooks
import Loading from "./components/Loading";
import DemoPage from "./components/DemoPage";

function App() {
  const [activeItem, setActiveItem] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  const { currentUserRules, isloading } = useRBAC();

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const isLargeScreen = useMediaQuery({ minWidth: 769 });

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const handleItemClick = (itemId) => setActiveItem(itemId);

  // Sidebar configuration
  const sidebarItems = [
    {
      id: "dashboard",
      text: "Dashboard",
      icon: LayoutDashboard,
      route: "/dashboard",
      ruleContext: "dashboard",
    },
    {
      id: "users",
      text: "Users",
      icon: Users,
      route: "/users",
      ruleContext: "user",
    },
    {
      id: "roles",
      text: "Roles",
      icon: Shield,
      route: "/roles",
      ruleContext: "role",
    },
    {
      id: "rules",
      text: "Rules",
      icon: Key,
      route: "/rules",
      ruleContext: "rules",
    },
    {
      id: "auditLogs",
      text: "Audit Logs",
      icon: FileText,
      route: "/audit-logs",
      ruleContext: "audit-logs",
    },
    {
      id: "settings",
      text: "Settings",
      icon: Settings,
      route: "/settings",
      ruleContext: "settings",
    },
  ];

  const filteredSidebarItems = sidebarItems.filter((item) =>
    currentUserRules?.some((rule) => rule.context === item.ruleContext)
  );

  return (
    <div
      className={`flex xs:overflow-y-auto min-h-screen md:overflow-y-hidden md:h-screen p-2 bg-gray-50 dark:bg-surface-a0 ${
        isSmallScreen ? "pb-16" : ""
      }`}
    >
      {isloading && <Loading />}
      {/* Sidebar - Only show on larger screens */}
      {isLargeScreen && (
        <Sidebar toggletheme={toggleTheme} theme={theme}>
          {filteredSidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              onClick={() => handleItemClick(item.id)}
              className="w-full text-left"
            >
              <SidebarItem
                icon={item.icon}
                text={item.text}
                active={activeItem === item.id}
              />
            </Link>
          ))}
        </Sidebar>
      )}

      {/* Main Content */}
      <div className={`flex-1 xs:p-2 md:p-8 `}>
        <Routes>
          {sidebarItems.map(({ route, ruleContext }, index) => {
            const PageComponent = getPageComponent(route); // Helper function to get the correct page component
            return (
              <Route
                key={index}
                path={route}
                element={
                  <ProtectedRoute
                    allowedContexts={[ruleContext]}
                    element={<PageComponent />}
                  />
                }
              />
            );
          })}

          {/* Fallback Route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
      {/* Bottom Navigation Bar - Only show on small screens */}
      {isSmallScreen && (
        <BottomNavBar activeItem={activeItem} onItemClick={handleItemClick} />
      )}
    </div>
  );
}

const getPageComponent = (route) => {
  switch (route) {
    case "/dashboard":
      return DashboardPage;
    case "/users":
      return UsersPage;
    case "/roles":
      return RolesPage;
    case "/rules":
      return RulesPage;
    case "/audit-logs":
      return AuditLogsPage;
    case "/settings":
      return SettingsPage;
    default:
      return () => <LandingPage/>;
  }
};

function AppWithRBACProvider() {
  return (
    <RBACProvider>
      <Router>
        <App />
      </Router>
    </RBACProvider>
  );
}

export default AppWithRBACProvider;
