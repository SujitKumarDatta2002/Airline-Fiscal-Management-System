
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { 
    addFlight, 
    updateFlight, 
    getAllUsers, 
    updateUserTokens,
    addEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    addCostToFlight,
    getCostsForFlight,
    getFinancialReport
} = require('../controllers/adminController');

router.post('/flights', [authMiddleware, adminMiddleware], addFlight);
router.put('/flights/:id', [authMiddleware, adminMiddleware], updateFlight);
router.get('/users', [authMiddleware, adminMiddleware], getAllUsers);
router.put('/users/:id/tokens', [authMiddleware, adminMiddleware], updateUserTokens);
router.post('/employees', [authMiddleware, adminMiddleware], addEmployee);
router.get('/employees', [authMiddleware, adminMiddleware], getAllEmployees);
router.put('/employees/:id', [authMiddleware, adminMiddleware], updateEmployee);
router.delete('/employees/:id', [authMiddleware, adminMiddleware], deleteEmployee);
router.post('/costs', [authMiddleware, adminMiddleware], addCostToFlight);
router.get('/costs/:flightId', [authMiddleware, adminMiddleware], getCostsForFlight);
router.get('/report', [authMiddleware, adminMiddleware], getFinancialReport);



module.exports = router;
