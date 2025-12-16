import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Layers,
  Users,
  TrendingUp,
  Wallet
} from "lucide-react";
import StatsCard from "./StatsCard";
import Button from "./ui/Button";

const BASE_URL = "http://localhost:8080/api";

const DashboardTab = ({ onAddLocationClick }) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const token = localStorage.getItem("token");

  // ===============================
  // FETCH DASHBOARD DATA
  // ===============================
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/dashboard/get-dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.error("DASHBOARD API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };
const downloadDashboardCsv = async () => {
  setDownloading(true);
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/download-csv`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    // Use filename exactly as provided by backend
    let fileName = "Dashboard_Stats.xlsx"; // fallback
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (fileNameMatch && fileNameMatch[1]) {
        fileName = fileNameMatch[1]; // use backend filename
      }
    }

    link.href = url;
    link.setAttribute("download", fileName); // <-- use extracted filename
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("CSV DOWNLOAD ERROR:", error);
  } finally {
    setDownloading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ===============================
  // STATS CONFIG (FULL)
  // ===============================
  const stats = [
    {
      title: "Total Locations",
      value: dashboard?.totalLocations ?? 0,
      icon: MapPin,
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/25",
    },
    {
      title: "Total Sports",
      value: dashboard?.totalSports ?? 0,
      icon: Calendar,
      color: "from-emerald-400 to-green-500",
      glow: "shadow-emerald-500/25",
    },
    {
      title: "Total Categories",
      value: dashboard?.totalCategories ?? 0,
      icon: Layers,
      color: "from-indigo-400 to-indigo-600",
      glow: "shadow-indigo-500/25",
    },
    {
      title: "Active Bookings",
      value: dashboard?.currentMonthSlotCount ?? 0,
      icon: Users,
      color: "from-purple-400 to-violet-500",
      glow: "shadow-purple-500/25",
    },
    {
      title: "Total Sales",
      value: `₹${dashboard?.totalSales ?? 0}`,
      icon: TrendingUp,
      color: "from-orange-400 to-red-500",
      glow: "shadow-orange-500/25",
    },
    {
      title: "Admin Earning",
      value: `₹${dashboard?.adminEarningYearly ?? 0}`,
      icon: Wallet,
      color: "from-green-400 to-teal-500",
      glow: "shadow-green-500/25",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-slate-400 mt-2">
            Welcome back, Admin! ✨
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <p className="text-slate-400">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-white mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={onAddLocationClick} variant="primary">
            Add Location
          </Button>
          <Button
            variant="success"
            onClick={downloadDashboardCsv}
            disabled={downloading}
          >
            {downloading ? "Downloading..." : "Download Dashboard CSV"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
