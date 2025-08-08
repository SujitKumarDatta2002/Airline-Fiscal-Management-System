
import React, { useState, useEffect } from "react";

const AdminDashboard = ({ api }) => {
  const [activeTab, setActiveTab] = useState("flights"); 

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("flights")}
            className={`${
              activeTab === "flights"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Manage Flights
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`${
              activeTab === "users"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Manage User Tokens
          </button>
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === "flights" && <FlightManager api={api} />}
        {activeTab === "users" && <UserManager api={api} />}
      </div>
    </div>
  );
};

const FlightManager = ({ api }) => {
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: 60,
  });
  const [editingFlight, setEditingFlight] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      const { data } = await api.get("/flights");
      setFlights(data);
    };
    fetchFlights();
  }, [api]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFlight) {
        // Update existing flight
        const { data } = await api.put(
          `/admin/flights/${editingFlight._id}`,
          formData
        );
        setFlights(flights.map((f) => (f._id === data._id ? data : f)));
      } else {
        // Add new flight
        const { data } = await api.post("/admin/flights", formData);
        setFlights([...flights, data]);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save flight", error);
      alert("Error: Could not save flight.");
    }
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormData({
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      // Formatting date for input type datetime-local
      departureTime: new Date(flight.departureTime).toISOString().slice(0, 16),
      arrivalTime: new Date(flight.arrivalTime).toISOString().slice(0, 16),
      price: flight.price,
      totalSeats: flight.totalSeats,
    });
  };

  const resetForm = () => {
    setEditingFlight(null);
    setFormData({
      flightNumber: "",
      origin: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
      totalSeats: 60,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 border rounded-lg grid grid-cols-2 gap-4"
      >
        <h3 className="col-span-2 text-xl font-semibold">
          {editingFlight ? "Edit Flight" : "Add New Flight"}
        </h3>
        <input
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          placeholder="Flight Number"
          className="p-2 border rounded"
          required
        />
        <input
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="Origin"
          className="p-2 border rounded"
          required
        />
        <input
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 border rounded"
          required
        />
        <input
          name="departureTime"
          type="datetime-local"
          value={formData.departureTime}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="arrivalTime"
          type="datetime-local"
          value={formData.arrivalTime}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <div className="col-span-2 flex justify-end space-x-2">
          {editingFlight && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingFlight ? "Update Flight" : "Add Flight"}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Flights</h3>
        <div className="space-y-2">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span>
                {flight.flightNumber} - {flight.origin} to {flight.destination}
              </span>
              <button
                onClick={() => handleEdit(flight)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const UserManager = ({ api }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    };
    fetchUsers();
  }, [api]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setTokens(user.tokens);
  };

  const handleTokenUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const { data } = await api.put(
        `/admin/users/${selectedUser._id}/tokens`,
        { tokens }
      );
      setUsers(users.map((u) => (u._id === data.user._id ? data.user : u)));
      alert("Tokens updated successfully!");
    } catch (error) {
      console.error("Failed to update tokens", error);
      alert("Error: Could not update tokens.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">All Users</h3>
        <div className="space-y-2">
          {users
            .filter((u) => u.role === "user")
            .map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <span>
                  {user.name} ({user.email}) - Tokens: {user.tokens}
                </span>
                <button
                  onClick={() => handleSelectUser(user)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Manage
                </button>
              </div>
            ))}
        </div>
      </div>
      {selectedUser && (
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Manage Tokens for {selectedUser.name}
          </h3>
          <form onSubmit={handleTokenUpdate}>
            <label className="block mb-2">Set Token Amount:</label>
            <input
              type="number"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Tokens
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
