const Employee = require('../models/EmpModel');

exports.addEmployee = async (req, res) => {
  const { empName, empCode, doj, department, project } = req.body;

  try {
    let emp = await Employee.findOne({ empCode });
    if (emp) {
      return res.status(400).json({ message: "Employee code already exists" });
    }

    emp = new Employee({ empName, empCode, doj, department, project });
    await emp.save();

    res.status(201).json({ message: "Employee added successfully", employee: emp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  const empId = req.params.id;
  const { empName, empCode, doj, department, project } = req.body;

  try {
    // Check if empCode is unique for other employees
    if (empCode) {
      const existingEmp = await Employee.findOne({ empCode, _id: { $ne: empId } });
      if (existingEmp) {
        return res.status(400).json({ message: "Employee code already exists" });
      }
    }

    const updatedEmp = await Employee.findByIdAndUpdate(
      empId,
      { empName, empCode, doj, department, project },
      { new: true, runValidators: true }
    );

    if (!updatedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully", employee: updatedEmp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const empId = req.params.id;
  console.log("Received empId to delete:", empId);  // Debug

  if (!empId) {
    return res.status(400).json({ message: "Employee id is required" });
  }

  try {
    const deletedEmp = await Employee.findByIdAndDelete(empId);
    if (!deletedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

