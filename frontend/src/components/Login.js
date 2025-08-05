// // FILE: src/components/Login.js
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = ({ api, setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const { email, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", data.token);
//       setIsAuthenticated(true);
//       navigate("/flights");
//     } catch (err) {
//       setError(
//         err.response?.data?.msg ||
//           "Login failed. Please check your credentials."
//       );
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
//       <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//           {error}
//         </div>
//       )}
//       <form onSubmit={onSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={onChange}
//             required
//             className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={onChange}
//             required
//             className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Log In
//         </button>
//       </form>
//       <p className="text-center mt-4">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-blue-500 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// };
// export default Login;
// FILE: frontend/src/components/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ api, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // UPDATED: The backend now returns role along with token
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      // UPDATED: Save user's role to local storage
      localStorage.setItem("userRole", data.role);
      setIsAuthenticated(true);

      // UPDATED: Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/flights");
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Login failed. Please check your credentials."
      );
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
export default Login;
