import React, { useState, useEffect, useContext } from "react";
import { getEmployees, deleteEmployee, updateEmployee } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";

const EmployeePage = () => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await deleteEmployee(id, token);
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
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
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <AddEmployee token={token} onAdd={handleAddEmployee} />
      <EmployeeList
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateEmployee(editingEmployee);
              }}
            >
              <input
                type="text"
                value={editingEmployee.empName}
                onChange={(e) =>
                  setEditingEmployee({ ...editingEmployee, empName: e.target.value })
                }
                className="w-full mb-3 border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={editingEmployee.empCode}
                onChange={(e) =>
                  setEditingEmployee({ ...editingEmployee, empCode: e.target.value })
                }
                className="w-full mb-3 border px-3 py-2 rounded"
              />
              <input
                type="date"
                value={editingEmployee.doj.split("T")[0]}
                onChange={(e) =>
                  setEditingEmployee({ ...editingEmployee, doj: e.target.value })
                }
                className="w-full mb-3 border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={editingEmployee.department}
                onChange={(e) =>
                  setEditingEmployee({ ...editingEmployee, department: e.target.value })
                }
                className="w-full mb-3 border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={editingEmployee.project}
                onChange={(e) =>
                  setEditingEmployee({ ...editingEmployee, project: e.target.value })
                }
                className="w-full mb-3 border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEmployee(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
