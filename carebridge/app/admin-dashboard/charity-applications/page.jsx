"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Charity Applications</CardTitle>
          <p className="text-gray-500">Review and approve/reject charity applications.</p>
        </CardHeader>
      </Card>

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
            <Card key={app.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{app.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{app.description}</p>
                <Badge variant="outline" className="mt-2">
                  Pending Review
                </Badge>
                <div className="mt-4 flex gap-3">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                    onClick={() => handleAction(app.id, "approved")}
                    disabled={actionLoading === app.id}
                  >
                    {actionLoading === app.id ? (
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Approve
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center"
                    onClick={() => handleAction(app.id, "rejected")}
                    disabled={actionLoading === app.id}
                  >
                    {actionLoading === app.id ? (
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityApplications;
