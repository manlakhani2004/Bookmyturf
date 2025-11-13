import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import LoaderScreen from "./components/LoaderScreen";
import ErrorScreen from "./components/ErrorScreen";
import CountdownTimer from "./components/CountdownTimer";
import BookingSummary from "./components/BookingSummary";
import ActionButtons from "./components/ActionButtons";
import StatusMessage from "./components/StatusMessage";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSlotIds } = location.state || {};

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  // --- Create booking on mount ---
  useEffect(() => {
    if (!selectedSlotIds || selectedSlotIds.length === 0) {
      setError("No slots selected. Please go back and select slots.");
      setLoading(false);
      return;
    }
    createBooking();
  }, []);

  // --- Countdown timer ---
  useEffect(() => {
    if (!booking?.expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(booking.expiresAt).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining("00:00");
        clearInterval(interval);
      } else {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  // --- API: Create booking ---
  const createBooking = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please login.");
        setLoading(false);
        return;
      }

      const res = await axios.post("http://localhost:8080/api/bookings/create", selectedSlotIds, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      if (res.data.Status === "OK") setBooking(res.data.Data);
      else setError(res.data.Message || "Failed to create booking");
    } catch (err) {
      setError(err.response?.data?.Message || err.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  // --- API: Confirm booking ---
  const handleConfirm = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8080/api/bookings/confirm/${booking.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Booking confirmed successfully! Redirecting...");
      setTimeout(() => navigate("/bookings"), 2000);
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to confirm booking.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- API: Cancel booking ---
  const handleCancel = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8080/api/bookings/cancel/${booking.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Booking cancelled successfully! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to cancel booking.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- Loading / Error State ---
  if (loading) return <LoaderScreen />;
  if (error && !booking) return <ErrorScreen message={error} onBack={() => navigate(-1)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <CountdownTimer isExpired={isExpired} timeRemaining={timeRemaining} navigate={navigate} />
        <BookingSummary booking={booking} />
        <ActionButtons
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          isExpired={isExpired}
          actionLoading={actionLoading}
        />
        <AnimatePresence>
          <StatusMessage success={success} error={error} booking={booking} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutPage;
