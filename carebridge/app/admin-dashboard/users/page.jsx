"use client";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
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
        </div>
      ))}
    </div>
  );
};

export default Users;
