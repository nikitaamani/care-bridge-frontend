'use client';
import { useEffect, useState } from 'react';

const ManageCharities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/admin/charities')
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch charities");
        }
        return res.json();
      })
      .then((data) => {
        setCharities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteCharity = (id) => {
    fetch(`/api/admin/charities/${id}`, { method: 'DELETE' })
      .then(() => {
        setCharities((prev) => prev.filter((charity) => charity.id !== id));
      })
      .catch((err) => setError("Failed to delete charity"));
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Manage Charities</h2>

      {loading && <p className="text-gray-500">Loading charities...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {charities.length === 0 && !loading && !error && (
        <p className="text-gray-600">No charities found.</p>
      )}

      {charities.map((charity) => (
        <div key={charity.id} className="p-4 border rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-black">{charity.name}</h3>
          <p className="text-gray-700">{charity.description}</p>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded mt-2"
            onClick={() => deleteCharity(charity.id)}
          >
            Remove Charity
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageCharities;
