import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { handleSuccess } from "../utils";
import { FaTachometerAlt, FaUser, FaMoneyCheck, FaSignOutAlt,FaFileImage } from "react-icons/fa";
import { SiGoogleads, SiLinuxprofessionalinstitute } from "react-icons/si";
import classNames from "classnames"; // Added classnames for cleaner class handling

import "./Sidebar.css";

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    checkAuth(); 
    window.addEventListener("storage", checkAuth); // Listen for auth changes

    return () => window.removeEventListener("storage", checkAuth); // Cleanup on unmount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");

    setIsAuthenticated(false);
    setTimeout(() => navigate("/login"), 0); // Ensure state updates before navigation
  };

  if (!isAuthenticated) return null; // Hide sidebar when not authenticated

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav className="nav-links">
        <NavLink to="/home" className={({ isActive }) => classNames("sidebar-item", { "active-link": isActive })}>
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/leads" className={({ isActive }) => classNames("sidebar-item", { "active-link": isActive })}>
          <SiGoogleads /> <span>Leads</span>
        </NavLink> 
        <NavLink to="/loans" className={({ isActive }) => classNames("sidebar-item", { "active-link": isActive })}>
          <FaMoneyCheck /> <span>Loans</span>
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => classNames("sidebar-item", { "active-link": isActive })}>
          <FaUser /> <span>Users</span>
        </NavLink>    
        <NavLink to="/profession" className={({ isActive }) => classNames("sidebar-item", { "active-link": isActive })}>
          <SiLinuxprofessionalinstitute /> <span>Profession</span>
        </NavLink>  
        <NavLink to="/carousel" className={({ isActive }) => classNames("sidebar-item", { "active-link": isActive })}>
          <FaFileImage /> <span>Carousel</span>
        </NavLink> 
        <button className="sidebar-item logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
