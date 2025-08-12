const API_BASE = "http://localhost:5000/api";

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addEmployee(data, token) {
  const res = await fetch(`${API_BASE}/employee/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getEmployees(token) {
  const res = await fetch(`${API_BASE}/employee/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// ✅ Delete Employee
export async function deleteEmployee(id, token) {
  const res = await fetch(`${API_BASE}/employee/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// ✅ Update Employee
export async function updateEmployee(id, data, token) {
  const res = await fetch(`${API_BASE}/employee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
