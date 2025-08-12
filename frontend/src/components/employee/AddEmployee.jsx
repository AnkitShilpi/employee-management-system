import React, { useState, useContext } from "react";
import { addEmployee } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AddEmployee = ({ onAdd }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    empName: "",
    empCode: "",
    doj: "",
    department: "",
    project: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add Employee
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
        <input
          name="department"
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="project"
          type="text"
          placeholder="Project"
          value={formData.project}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>

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
