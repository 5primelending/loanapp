import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaCheckCircle, FaClock, FaMoneyCheckAlt } from "react-icons/fa";
import Chart from "react-apexcharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [loggedInUser] = useState(() => localStorage.getItem("loggedInUser") || "User");

  // Stats data
  const stats = [
    { title: "Total Loans", value: 120, icon: <FaMoneyCheckAlt />, className: "total-loans" },
    { title: "Approved Loans", value: 85, icon: <FaCheckCircle />, className: "approved-loans" },
    { title: "Pending Loans", value: 35, icon: <FaClock />, className: "pending-loans" },
  ];

  // Chart Data (Loan Approval Trends)
  const chartData = {
    options: {
      chart: { id: "loan-trends" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    },
    series: [{ name: "Approved Loans", data: [10, 15, 25, 30, 40, 50] }],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 aria-label={`Welcome ${loggedInUser}`}>Welcome, {loggedInUser} 👋</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.className}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Loan Approval Chart */}
      <div className="chart-container">
        <h2>Loan Approval Trends</h2>
        <Chart options={chartData.options} series={chartData.series} type="line" width="100%" height="350" />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
