import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Employee List</h2>

      {employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Code", "DOJ", "Department", "Project", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="text-left px-4 py-2 border-b border-gray-300 font-medium text-gray-700"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-2 border-b border-gray-300">{emp.empName}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{emp.empCode}</td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {new Date(emp.doj).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">{emp.department}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{emp.project}</td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <button
                      onClick={() => onEdit(emp)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(emp)} // Pass full employee object
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
