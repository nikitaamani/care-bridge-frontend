"use client";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    fetch("https://carebridge-backend-fys5.onrender.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Failed to fetch users: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    console.log(`Deleting user with ID: ${id}`); // Debugging

    fetch(`https://carebridge-backend-fys5.onrender.com/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(`Response status: ${res.status}`); // Debugging
  
        if (!res.ok) {
          return res.text().then((text) => {
            console.error(`Error response: ${text}`); // Debugging
            throw new Error(`Failed to delete user: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4 text-black">User Management</h2>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 && !loading && !error && (
        <p className="text-gray-600">No users found.</p>
      )}

      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-black">{user.name}</h3>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Role: {user.role}</p>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded mt-2"
            onClick={() => deleteUser(user.id)}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
