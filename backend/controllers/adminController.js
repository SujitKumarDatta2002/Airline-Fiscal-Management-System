
const Flight = require("../models/Flight");
const User = require("../models/User");
const Employee = require('../models/Employee');
const Cost = require('../models/Cost');



exports.addFlight = async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const flight = await newFlight.save();
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.updateFlight = async (req, res) => {
  try {
    let flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ msg: "Flight not found" });

    flight = await Flight.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.updateUserTokens = async (req, res) => {
  const { tokens } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });


    user.tokens = tokens;
    await user.save();

    res.json({ msg: "User tokens updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



exports.addEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const employee = await newEmployee.save();
        res.status(201).json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



exports.addCostToFlight = async (req, res) => {
    try {
        const newCost = new Cost(req.body);
        const cost = await newCost.save();
        res.status(201).json(cost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getCostsForFlight = async (req, res) => {
    try {
        const costs = await Cost.find({ flight: req.params.flightId });
        res.json(costs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};




exports.getFinancialReport = async (req, res) => {
    try {
        const allCosts = await Cost.find().populate('flight', 'flightNumber');
        const allEmployees = await Employee.find();

        const totalFuelCost = allCosts
            .filter(c => c.costType === 'Fuel')
            .reduce((sum, cost) => sum + cost.amount, 0);

        const totalMaintenanceCost = allCosts
            .filter(c => c.costType === 'Maintenance')
            .reduce((sum, cost) => sum + cost.amount, 0);
        
        const totalSalaryCost = allEmployees.reduce((sum, emp) => sum + emp.salary, 0);

        const operationalCost = totalFuelCost + totalMaintenanceCost;

        res.json({
            allCosts,
            allEmployees,
            summary: {
                totalFuelCost,
                totalMaintenanceCost,
                totalSalaryCost,
                operationalCost
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { role, salary } = req.body;
        const employee = await Employee.findByIdAndUpdate(
            req.params.id, 
            { $set: { role, salary } }, 
            { new: true }
        );
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await employee.deleteOne();
        res.json({ msg: 'Employee removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};