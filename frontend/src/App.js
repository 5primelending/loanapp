import { useState, useEffect } from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import Leads from "./components/Leads";
import Loans from "./components/Loans";
import Profession from "./components/Profession";
import Carousel from "./components/Carousel";
import RefrshHandler from "./RefrshHandler";
import AddCarousel from "./components/AddCarousel";
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="App" style={{ display: "flex" }}>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      {isAuthenticated && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/add-carousel" element={<AddCarousel />} />
            <Route path="/carousel" element={<Carousel/>} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/profession" element={<Profession />} />
            <Route path="/home" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
