import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Flights from "./components/Flights";
import Booking from "./components/Booking";
import Feedback from "./components/Feedback";
import AdminDashboard from "./components/AdminDashboard";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers["x-auth-token"] = localStorage.getItem("token");
  }
  return req;
});

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole(null);
    window.location = "/login";
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        userRole={userRole}
      />
      <main
        className={`flex-grow ${
          !isHomePage ? "container mx-auto p-4 md:p-8" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights api={API} />} />
          <Route
            path="/login"
            element={
              <Login api={API} setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup api={API} setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route path="/book/:flightId" element={<Booking api={API} />} />
          <Route path="/feedback/:flightId" element={<Feedback api={API} />} />

          <Route path="/admin" element={<AdminDashboard api={API} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const Navbar = ({ isAuthenticated, handleLogout, userRole }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">✈️ AirlinePro</Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/flights"
              className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Flights
            </Link>

            

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-4"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white w-full">
      <div className="container mx-auto px-6 py-4 text-center text-gray-600">
        <p>&copy; 2024 AirlinePro Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;
