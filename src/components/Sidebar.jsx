import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FolderOpen,
  HelpCircle,
  ShieldAlert,
  User,
  Settings,
  LogOut,
  Landmark,
} from "lucide-react";

const Sidebar = () => {
  // Initialize the navigate hook here
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    {
      name: "File New Application",
      path: "/new",
      icon: <FilePlus size={20} />,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: <FolderOpen size={20} />,
    },
    { name: "Help", path: "/help", icon: <HelpCircle size={20} /> },
    {
      name: "Policy / Rules",
      path: "/policy",
      icon: <ShieldAlert size={20} />,
    },
  ];

  const bottomItems = [
    { name: "Manager Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-banking-navy text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-700">
        <Landmark className="text-banking-primary" size={28} />
        <span className="font-bold text-lg tracking-wide">
          Bank Loan
          <br />
          Processing
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-banking-primary text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 space-y-2">
        {bottomItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            {item.icon}
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-4 py-2 w-full text-left text-banking-error hover:text-red-400 transition-colors mt-4"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;