import React, { useState, useEffect } from "react";

const AdminDashboard = ({ api }) => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl min-h-[600px]">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <TabButton
            activeTab={activeTab}
            tabName="flights"
            onClick={setActiveTab}
          >
            Manage Flights & Costs
          </TabButton>
          <TabButton
            activeTab={activeTab}
            tabName="users"
            onClick={setActiveTab}
          >
            Manage User Tokens
          </TabButton>
          <TabButton
            activeTab={activeTab}
            tabName="employees"
            onClick={setActiveTab}
          >
            Employee Management
          </TabButton>
          <TabButton
            activeTab={activeTab}
            tabName="report"
            onClick={setActiveTab}
          >
            Financial Report
          </TabButton>
        </nav>
      </div>

      <div className="mt-8">
        {activeTab === "flights" && <FlightManager api={api} />}
        {activeTab === "users" && <UserManager api={api} />}
        {activeTab === "employees" && <EmployeeManager api={api} />}
        {activeTab === "report" && <FinancialReport api={api} />}
      </div>
    </div>
  );
};

const TabButton = ({ activeTab, tabName, onClick, children }) => (
  <button
    onClick={() => onClick(tabName)}
    className={`${
      activeTab === tabName
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
  >
    {children}
  </button>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

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
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [selectedFlightForCost, setSelectedFlightForCost] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const { data } = await api.get("/flights");
    setFlights(data);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFlight) {
        const { data } = await api.put(
          `/admin/flights/${editingFlight._id}`,
          formData
        );
        setFlights(flights.map((f) => (f._id === data._id ? data : f)));
      } else {
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

  const openCostModal = (flight) => {
    setSelectedFlightForCost(flight);
    setIsCostModalOpen(true);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h3 className="col-span-1 md:col-span-2 text-xl font-semibold">
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
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
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
              className="flex justify-between items-center p-3 border rounded-lg bg-gray-50"
            >
              <span>
                {flight.flightNumber} - {flight.origin} to {flight.destination}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(flight)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openCostModal(flight)}
                  className="bg-cyan-500 text-white px-3 py-1 rounded text-sm hover:bg-cyan-600"
                >
                  Manage Costs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCostModalOpen && (
        <CostManagerModal
          flight={selectedFlightForCost}
          api={api}
          onClose={() => setIsCostModalOpen(false)}
        />
      )}
    </div>
  );
};

const CostManagerModal = ({ flight, api, onClose }) => {
  const [costs, setCosts] = useState([]);
  const [costType, setCostType] = useState("Fuel");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCosts = async () => {
      const { data } = await api.get(`/admin/costs/${flight._id}`);
      setCosts(data);
    };
    fetchCosts();
  }, [api, flight._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/costs", {
        flight: flight._id,
        costType,
        amount,
        description,
      });
      setCosts([...costs, data]);
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add cost", error);
      alert("Error: Could not add cost.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">
        Manage Costs for {flight.flightNumber}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Cost</h3>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={costType}
            onChange={(e) => setCostType(e.target.value)}
            className="p-2 border rounded"
          >
            <option>Fuel</option>
            <option>Maintenance</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (৳)"
            className="p-2 border rounded"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="p-2 border rounded col-span-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Cost
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Costs</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {costs.length > 0 ? (
            costs.map((cost) => (
              <div
                key={cost._id}
                className="flex justify-between p-2 bg-gray-100 rounded"
              >
                <span>
                  {cost.costType}: ৳{cost.amount}
                </span>
                <span className="text-sm text-gray-500">
                  {cost.description}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No costs recorded for this flight.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

const EmployeeManager = ({ api }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "", salary: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    const { data } = await api.get("/admin/employees");
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [api]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/employees", formData);
      fetchEmployees();
      setFormData({ name: "", role: "", salary: "" });
    } catch (error) {
      console.error("Failed to add employee", error);
      alert("Error: Could not add employee.");
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      try {
        await api.delete(`/admin/employees/${employeeId}`);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to remove employee", error);
        alert("Error: Could not remove employee.");
      }
    }
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const onEmployeeUpdate = () => {
    fetchEmployees();
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <h3 className="col-span-1 md:col-span-3 text-xl font-semibold">
          Add New Employee
        </h3>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Employee Name"
          className="p-2 border rounded"
          required
        />
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role (e.g., Pilot, Agent)"
          className="p-2 border rounded"
          required
        />
        <input
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary (Monthly, ৳)"
          className="p-2 border rounded"
          required
        />
        <div className="col-span-1 md:col-span-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Add Employee
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Employee List</h3>
        <div className="space-y-2">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center p-3 border rounded-lg bg-gray-50"
            >
              <span className="font-medium col-span-3 md:col-span-1">
                {emp.name}
              </span>
              <span className="text-gray-600">{emp.role}</span>
              <span className="text-green-600 font-semibold">
                ৳{emp.salary.toLocaleString()}
              </span>
              <div className="flex space-x-2 justify-end">
                <button
                  onClick={() => openEditModal(emp)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isEditModalOpen && (
        <EditEmployeeModal
          employee={editingEmployee}
          api={api}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onEmployeeUpdate}
        />
      )}
    </div>
  );
};

const EditEmployeeModal = ({ employee, api, onClose, onUpdate }) => {
  const [role, setRole] = useState(employee.role);
  const [salary, setSalary] = useState(employee.salary);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/employees/${employee._id}`, { role, salary });
      onUpdate();
    } catch (error) {
      console.error("Failed to update employee", error);
      alert("Error: Could not update employee.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">
        Edit Employee: {employee.name}
      </h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Salary (৳)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
const FinancialReport = ({ api }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [costFilter, setCostFilter] = useState("All");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await api.get("/admin/report");
        setReport(data);
      } catch (error) {
        console.error("Failed to fetch report", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [api]);

  if (loading) return <p>Generating report...</p>;
  if (!report) return <p>Could not generate report.</p>;

  const filteredCosts = report.allCosts.filter((cost) => {
    if (costFilter === "All") return true;
    return cost.costType === costFilter;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-red-800 font-bold">Total Fuel Cost</h3>
          <p className="text-2xl font-semibold">
            ৳{report.summary.totalFuelCost.toLocaleString()}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-yellow-800 font-bold">Total Maintenance Cost</h3>
          <p className="text-2xl font-semibold">
            ৳{report.summary.totalMaintenanceCost.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-blue-800 font-bold">Total Salary Expenditure</h3>
          <p className="text-2xl font-semibold">
            ৳{report.summary.totalSalaryCost.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-green-800 font-bold">Total Operational Cost</h3>
          <p className="text-2xl font-semibold">
            ৳{report.summary.operationalCost.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Detailed Cost Breakdown</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCostFilter("All")}
                className={`px-3 py-1 text-sm rounded ${
                  costFilter === "All"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCostFilter("Fuel")}
                className={`px-3 py-1 text-sm rounded ${
                  costFilter === "Fuel"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Fuel
              </button>
              <button
                onClick={() => setCostFilter("Maintenance")}
                className={`px-3 py-1 text-sm rounded ${
                  costFilter === "Maintenance"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Maintenance
              </button>
            </div>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-2">
            <div className="grid grid-cols-3 gap-4 p-2 font-bold border-b">
              <span>Flight</span>
              <span>Cost Type</span>
              <span className="text-right">Amount</span>
            </div>
            {filteredCosts.map((cost) => (
              <div
                key={cost._id}
                className="grid grid-cols-3 gap-4 p-2 hover:bg-gray-50"
              >
                <span>{cost.flight?.flightNumber || "N/A"}</span>
                <span>{cost.costType}</span>
                <span className="font-semibold text-right">
                  ৳{cost.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Employee Salary List</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-2">
            <div className="grid grid-cols-3 gap-4 p-2 font-bold border-b">
              <span>Employee Name</span>
              <span>Role</span>
              <span className="text-right">Salary</span>
            </div>
            {report.allEmployees.map((emp) => (
              <div
                key={emp._id}
                className="grid grid-cols-3 gap-4 p-2 hover:bg-gray-50"
              >
                <span className="font-medium">{emp.name}</span>
                <span className="text-gray-600">{emp.role}</span>
                <span className="font-semibold text-right">
                  ৳{emp.salary.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
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
