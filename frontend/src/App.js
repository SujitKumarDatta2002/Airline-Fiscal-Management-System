// // frontend/src/App.js
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import axios from "axios";
// // --- Import Components ---
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Flights from "./components/Flights";
// import Booking from "./components/Booking";
// import Feedback from "./components/Feedback";

// // --- API Configuration ---
// // This tells your frontend where to find your backend API
// const API = axios.create({ baseURL: "http://localhost:4000/api" });

// // This automatically adds your login token to every API request
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("token")) {
//     req.headers["x-auth-token"] = localStorage.getItem("token");
//   }
//   return req;
// });

// // --- Main App Component ---
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check if the user is already logged in when the app loads
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     // Redirect to login page after logout
//     window.location = "/login";
//   };

//   return (
//     <Router>
//       <div className="bg-gray-100 min-h-screen font-sans">
//         <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
//         <main className="container mx-auto p-4 md:p-8">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/flights" element={<Flights api={API} />} />
//             <Route
//               path="/login"
//               element={
//                 <Login api={API} setIsAuthenticated={setIsAuthenticated} />
//               }
//             />
//             <Route
//               path="/signup"
//               element={
//                 <Signup api={API} setIsAuthenticated={setIsAuthenticated} />
//               }
//             />
//             <Route path="/book/:flightId" element={<Booking api={API} />} />
//             <Route
//               path="/feedback/:flightId"
//               element={<Feedback api={API} />}
//             />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// // --- Navigation Component ---
// const Navbar = ({ isAuthenticated, handleLogout }) => {
//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-6 py-3">
//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-gray-800">
//             <Link to="/">✈️ AirlinePro</Link>
//           </div>
//           <div className="flex items-center">
//             <Link
//               to="/"
//               className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               to="/flights"
//               className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Flights
//             </Link>
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-4"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // --- Footer Component ---
// const Footer = () => {
//   return (
//     <footer className="bg-white mt-12">
//       <div className="container mx-auto px-6 py-4 text-center text-gray-600">
//         <p>&copy; 2024 AirlinePro Management System. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default App;
// frontend/src/App.js
// frontend/src/App.js
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link,
//   useLocation,
// } from "react-router-dom";
// import axios from "axios";
// // --- Import Components ---
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Flights from "./components/Flights";
// import Booking from "./components/Booking";
// import Feedback from "./components/Feedback";

// // --- API Configuration ---
// const API = axios.create({ baseURL: "http://localhost:4000/api" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("token")) {
//     req.headers["x-auth-token"] = localStorage.getItem("token");
//   }
//   return req;
// });

// // --- Main App Component ---
// function App() {
//   return (
//     <Router>
//       <MainLayout />
//     </Router>
//   );
// }

// // --- Layout Component ---
// // This component handles the overall page structure
// const MainLayout = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const location = useLocation(); // Hook to get the current page URL

//   // Check if the current page is the homepage
//   const isHomePage = location.pathname === "/";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     window.location = "/login";
//   };

//   return (
//     // Use flexbox to push footer to the bottom
//     <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
//       <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
//       {/* flex-grow allows this main section to fill available space */}
//       <main
//         className={`flex-grow ${
//           !isHomePage ? "container mx-auto p-4 md:p-8" : ""
//         }`}
//       >
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/flights" element={<Flights api={API} />} />
//           <Route
//             path="/login"
//             element={
//               <Login api={API} setIsAuthenticated={setIsAuthenticated} />
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <Signup api={API} setIsAuthenticated={setIsAuthenticated} />
//             }
//           />
//           <Route path="/book/:flightId" element={<Booking api={API} />} />
//           <Route path="/feedback/:flightId" element={<Feedback api={API} />} />
//         </Routes>
//       </main>
//       {/* The footer is now always rendered */}
//       <Footer />
//     </div>
//   );
// };

// // --- Navigation Component ---
// const Navbar = ({ isAuthenticated, handleLogout }) => {
//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-6 py-3">
//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-gray-800">
//             <Link to="/">✈️ AirlinePro</Link>
//           </div>
//           <div className="flex items-center">
//             <Link
//               to="/"
//               className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Home
//             </Link>
//             <Link
//               to="/flights"
//               className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Flights
//             </Link>
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-4"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // --- Footer Component ---
// const Footer = () => {
//   return (
//     // Added a white background to the footer for better visibility on all pages
//     <footer className="bg-white w-full">
//       <div className="container mx-auto px-6 py-4 text-center text-gray-600">
//         <p>&copy; 2024 AirlinePro Management System. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default App;

// FILE: frontend/src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";
// --- Import Components ---
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Flights from "./components/Flights";
import Booking from "./components/Booking";
import Feedback from "./components/Feedback";
import AdminDashboard from "./components/AdminDashboard"; // ADDED: AdminDashboard component

// --- API Configuration ---
const API = axios.create({ baseURL: "http://localhost:4000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers["x-auth-token"] = localStorage.getItem("token");
  }
  return req;
});

// --- Main App Component ---
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// --- Layout Component ---
const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // ADDED: State for user role
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole"); // ADDED: Get role from local storage
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role); // ADDED: Set user role state
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // ADDED: Remove role on logout
    setIsAuthenticated(false);
    setUserRole(null);
    window.location = "/login";
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      {/* UPDATED: Pass userRole to Navbar */}
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
          {/* ADDED: Protected route for the admin dashboard */}
          <Route path="/admin" element={<AdminDashboard api={API} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// --- Navigation Component ---
// UPDATED: Navbar now accepts userRole
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

            {/* ADDED: Show Admin link if user is an admin */}
            {isAuthenticated && userRole === "admin" && (
              <Link
                to="/admin"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin
              </Link>
            )}

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

// --- Footer Component ---
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
