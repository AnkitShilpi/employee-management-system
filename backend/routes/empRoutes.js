const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controller/EmpController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addEmployee);
router.get('/all', authMiddleware, getEmployees);

// Update employee by ID
router.put('/:id', authMiddleware, updateEmployee);

// Delete employee by ID
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
