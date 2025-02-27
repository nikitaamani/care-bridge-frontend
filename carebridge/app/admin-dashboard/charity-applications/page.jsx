"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const CharityApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetch("/api/admin/charity-applications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applications");
        return res.json();
      })
      .then((data) => setApplications(data))
      .catch(() => toast.error("Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = (id, status) => {
    setActionLoading(id);
    fetch(`/api/admin/charity-applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update application");
        return res.json();
      })
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id));
        toast.success(`Application ${status}`);
      })
      .catch(() => toast.error("Action failed!"))
      .finally(() => setActionLoading(null));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full">
      {/* Header Section */}
      <div className="mb-6 shadow p-4 rounded-lg bg-gray-100">
        <h2 className="text-2xl font-bold text-black">Charity Applications</h2>
        <p className="text-gray-500">Review and approve/reject charity applications.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
          <span className="ml-2 text-gray-600">Loading Applications...</span>
        </div>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-500">No pending applications.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="shadow-md p-4 bg-white rounded-lg">
              <h3 className="text-lg font-semibold">{app.name}</h3>
              <p className="text-gray-600 mt-2">{app.description}</p>

              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-semibold rounded mt-3">
                Pending Review
              </span>

              <div className="mt-4 flex gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => handleAction(app.id, "approved")}
                  disabled={actionLoading === app.id}
                >
                  {actionLoading === app.id ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => handleAction(app.id, "rejected")}
                  disabled={actionLoading === app.id}
                >
                  {actionLoading === app.id ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityApplications;
