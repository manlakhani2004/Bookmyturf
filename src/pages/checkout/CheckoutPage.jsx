import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import LoaderScreen from "./components/LoaderScreen";
import ErrorScreen from "./components/ErrorScreen";
import CountdownTimer from "./components/CountdownTimer";
import BookingSummary from "./components/BookingSummary";
import ActionButtons from "./components/ActionButtons";
import StatusMessage from "./components/StatusMessage";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { id: turfIdFromParams } = useParams();

  // ✅ Read from Redux: both slot IDs and full slot objects
  const selectedSlotIds = useSelector(
    (state) => state.selectedSlotIds.selectedSlotIds
  );
  const selectedSlots = useSelector(
    (state) => state.selectedSlotIds.selectedSlots
  );

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Create booking on mount
  useEffect(() => {
    if (!selectedSlotIds || selectedSlotIds.length === 0) {
      setError("No slots selected. Please go back and select slots.");
      setLoading(false);
      return;
    }
    createBooking();
  }, []);

  // Countdown timer
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
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  // API: Create booking
  const createBooking = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please login.");
        setLoading(false);
        return;
      }
      const cleanToken = token.replace(/^"|"$/g, "");

      // Send only ids as backend expects
      const res = await axios.post(
        "http://localhost:8080/api/bookings/create",
        selectedSlotIds, // array of ids
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.Status === "OK") {
        setBooking(res.data.Data);
      } else {
        setError(res.data.Message || "Failed to create booking");
      }
    } catch (err) {
      setError(
        err.response?.data?.Message || err.message || "Failed to create booking."
      );
    } finally {
      setLoading(false);
    }
  };

  // Confirm booking
  const handleConfirm = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const cleanToken = token.replace(/^"|"$/g, "");
      await axios.post(
        `http://localhost:8080/api/bookings/confirm/${booking.id}`,
        {},
        { headers: { Authorization: `Bearer ${cleanToken}` } }
      );
      setSuccess("Booking confirmed successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to confirm booking.");
    } finally {
      setActionLoading(false);
    }
  };

  // Cancel booking
  const handleCancel = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem("token");
      const cleanToken = token.replace(/^"|"$/g, "");
      await axios.post(
        `http://localhost:8080/api/bookings/cancel/${booking.id}`,
        {},
        { headers: { Authorization: `Bearer ${cleanToken}` } }
      );
      setSuccess("Booking cancelled successfully! Redirecting...");
      setTimeout(() => navigate("/turfs"), 1000);
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to cancel booking.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoaderScreen />;
  if (error && !booking)
    return <ErrorScreen message={error} onBack={() => navigate(-1)} />;

  // compute total either from booking or from selectedSlots
  const computedTotal = booking?.totalAmount ?? selectedSlots.reduce((a, s) => a + (s.price || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <CountdownTimer
          isExpired={isExpired}
          timeRemaining={timeRemaining}
          navigate={navigate}
        />

        {/* Booking Details */}
        {booking && (
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Booking Details
            </h2>

            <div className="text-gray-300 space-y-2">
              <p>
                <span className="font-semibold text-white">Booking ID:</span>{" "}
                {booking.id}
              </p>
              <p>
                <span className="font-semibold text-white">Status:</span>{" "}
                {booking.status}
              </p>
              <p>
                <span className="font-semibold text-white">Slots Selected:</span>{" "}
                {selectedSlotIds.length}
              </p>
              <p>
                <span className="font-semibold text-white">Total Amount:</span>{" "}
                ₹{computedTotal}
              </p>
              <p>
                <span className="font-semibold text-white">Expires At:</span>{" "}
                {booking.expiresAt ? new Date(booking.expiresAt).toLocaleString() : "-"}
              </p>
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <label className="text-white font-semibold">Payment Method:</label>
              <div className="flex gap-4 mt-2">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    paymentMethod === "UPI"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("UPI")}
                >
                  UPI
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    paymentMethod === "Cash"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("Cash")}
                >
                  Cash
                </button>
              </div>

              {paymentMethod === "UPI" && (
                <div className="mt-4 text-sm text-gray-400">
                  <p>
                    💳 Use UPI ID: <b>bookmyturf@upi</b>
                  </p>
                  <p>Complete payment before confirmation.</p>
                </div>
              )}

              {paymentMethod === "Cash" && (
                <div className="mt-4 text-sm text-gray-400">
                  <p>💵 Pay directly at the turf counter during arrival.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Selected slots list (from Redux) */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <h3 className="text-lg text-white font-semibold mb-3">Selected Slots</h3>
          {selectedSlots && selectedSlots.length > 0 ? (
            <ul className="space-y-2 text-gray-200">
              {selectedSlots.map((s) => (
                <li
                  key={s.slotId}
                  className="flex justify-between items-center bg-slate-900/30 p-3 rounded-lg border border-slate-700"
                >
                  <div>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Day:</span>{" "}
                      {s.dayOfWeek ?? "-"}
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Date:</span>{" "}
                      {s.date ? new Date(s.date).toLocaleDateString() : "-"}
                    </div>
                    <div className="text-sm text-gray-200">
                      <span className="font-medium">Time:</span> {s.startTime} -{" "}
                      {s.endTime}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-emerald-400 font-bold text-lg">
                      ₹{s.price ?? 0}
                    </div>
                    <div className="text-xs text-gray-400">Slot ID: {s.slotId}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No slot details available.</p>
          )}
        </div>

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
