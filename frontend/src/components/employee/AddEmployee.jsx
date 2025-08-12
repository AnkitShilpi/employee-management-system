import React, { useState, useEffect, useContext } from "react";
import { addEmployee } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const departmentProjects = {
  requirement: ["IT", "Non-IT"],
  development: ["Web Dev", "Mob Dev", "Software Dev"],
  account: ["Git", "Project"],
  hr: ["Hiring", "Induction", "Event", "Outing"],
};

const AddEmployee = ({ onAdd, editingEmployee, onUpdate, cancelEdit }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    empName: "",
    empCode: "",
    doj: "",
    department: "",
    project: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        empName: editingEmployee.empName || "",
        empCode: editingEmployee.empCode || "",
        doj: editingEmployee.doj ? editingEmployee.doj.split("T")[0] : "",
        department: editingEmployee.department || "",
        project: editingEmployee.project || "",
      });
      setMessage("");
    } else {
      setFormData({
        empName: "",
        empCode: "",
        doj: "",
        department: "",
        project: "",
      });
      setMessage("");
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setFormData({ ...formData, department: value, project: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEmployee) {
      // update employee
      const updatedData = { ...editingEmployee, ...formData };
      const res = await onUpdate(updatedData, token);
      if (res && res._id) {
        setMessage("Employee updated successfully.");
      } else {
        setMessage(res.message || "Failed to update employee.");
      }
    } else {
      // add new employee
      const res = await addEmployee(formData, token);
      if (res.message === "Employee added successfully") {
        setMessage("Employee added successfully.");
        onAdd(res.employee);
        setFormData({
          empName: "",
          empCode: "",
          doj: "",
          department: "",
          project: "",
        });
      } else {
        setMessage(res.message || "Failed to add employee.");
      }
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        <input
          name="empName"
          type="text"
          placeholder="Employee Name"
          value={formData.empName}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="empCode"
          type="text"
          placeholder="Employee Code"
          value={formData.empCode}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="doj"
          type="date"
          value={formData.doj}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value="" disabled>
            Select Department
          </option>
          <option value="requirement">Requirement</option>
          <option value="development">Development</option>
          <option value="account">Account</option>
          <option value="hr">HR</option>
        </select>

        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          required
          disabled={!formData.department}
          className={`w-full mb-6 px-4 py-2 border border-gray-300 rounded-md bg-white ${
            !formData.department ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          <option value="" disabled>
            {formData.department ? "Select Project" : "Select Department first"}
          </option>
          {departmentProjects[formData.department]?.map((proj) => (
            <option key={proj} value={proj.toLowerCase().replace(/\s/g, "-")}>
              {proj}
            </option>
          ))}
        </select>

        <div className="flex justify-between items-center">
          {editingEmployee && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="ml-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700"
          >
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddEmployee;
