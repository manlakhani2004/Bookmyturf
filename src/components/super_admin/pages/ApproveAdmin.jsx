import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8080/api";

const ApproveAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ===============================
  // FETCH PENDING ADMINS
  // ===============================
  const fetchPendingAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/pending-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ BACKEND RETURNS ARRAY DIRECTLY
      setAdmins(response.data);

    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error("Failed to load pending admins");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // APPROVE ADMIN
  // ===============================
  const approveAdmin = async (adminId) => {
    const toastId = toast.loading("Approving admin...");
    try {
      await axios.post(
        `${BASE_URL}/admin/approve/${adminId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Admin approved successfully");
      fetchPendingAdmins(); // refresh list

    } catch (error) {
      console.error("APPROVE ERROR:", error);
      toast.error("Approval failed");
    } finally {
      toast.dismiss(toastId);
    }
  };

  // ===============================
  // LOAD ON PAGE MOUNT
  // ===============================
  useEffect(() => {
    fetchPendingAdmins();
  }, []);

  // ===============================
  // UI
  // ===============================
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Pending Admin Requests
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No pending admins
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-t border-gray-700"
                >
                  <td className="p-3 text-white">
                    {admin.firstName} {admin.lastName}
                  </td>
                  <td className="p-3 text-gray-300">
                    {admin.email}
                  </td>
                  <td className="p-3 text-gray-300">
                    {admin.contact}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => approveAdmin(admin.id)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveAdmin;
