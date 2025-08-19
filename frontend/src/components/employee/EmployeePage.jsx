import React, { useState, useEffect, useContext } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";

const EmployeePage = () => {
  const { token, logout, user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees(token);
      setEmployees(data);
    };
    fetchEmployees();
  }, [token]);

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleDeleteClick = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete || !employeeToDelete._id) return;

    await deleteEmployee(employeeToDelete._id, token);
    setEmployees((prev) => prev.filter((emp) => emp._id !== employeeToDelete._id));
    setEmployeeToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setEmployeeToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
  };

  const handleUpdateEmployee = async (updatedData) => {
    const updatedEmp = await updateEmployee(updatedData._id, updatedData, token);
    setEmployees((prev) =>
      prev.map((emp) => (emp._id === updatedEmp._id ? updatedEmp : emp))
    );
    setEditingEmployee(null);
    return updatedEmp;
  };

  const cancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome <span className=" text-red-900 font-bold">{user?.name || "User"}</span> to Employee Page
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>

      {/* Flex container for form and list */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form on left side */}
        <div className="md:w-1/3">
          <AddEmployee
            token={token}
            onAdd={handleAddEmployee}
            editingEmployee={editingEmployee}
            onUpdate={handleUpdateEmployee}
            cancelEdit={cancelEdit}
          />
        </div>

        {/* List on right side */}
        <div className="md:w-2/3">
          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>
              Are you sure you want to delete employee{" "}
              <strong>{employeeToDelete?.empName}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
