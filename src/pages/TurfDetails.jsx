import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

const TurfDetails = () => {
  const { id } = useParams();

  const [turfData, setTurfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchTurfDetails();
  }, [id]);

  const fetchTurfDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/locations/sports/${id}/details`
      );
      const result = await response.json();

      if (result.Status === "OK" && result.Data) {
        setTurfData(result.Data);
        const todayName = new Date()
          .toLocaleDateString("en-US", { weekday: "long" })
          .toUpperCase();
        setSelectedDay(todayName);
      } else {
        setError(result.Message || "Failed to fetch turf details");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch turf details");
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot, date) => {
    if (selectedSlots.length > 0 && selectedDate && selectedDate !== date) {
      alert(
        "You can select slots for one day only. Please clear your previous selections first."
      );
      return;
    }

    const exists = selectedSlots.find(
      (s) =>
        s.dayOfWeek === slot.dayOfWeek &&
        s.startTime === slot.startTime &&
        s.endTime === slot.endTime
    );

    let updatedSlots;
    if (exists) {
      updatedSlots = selectedSlots.filter(
        (s) =>
          !(
            s.dayOfWeek === slot.dayOfWeek &&
            s.startTime === slot.startTime &&
            s.endTime === slot.endTime
          )
      );
    } else {
      updatedSlots = [...selectedSlots, { ...slot, date }];
      if (!selectedDate) setSelectedDate(date);
    }

    setSelectedSlots(updatedSlots);
    setTotalAmount(updatedSlots.reduce((acc, s) => acc + s.price, 0));
    if (updatedSlots.length === 0) setSelectedDate(null);
  };

  const isSlotSelected = (slot) =>
    selectedSlots.some(
      (s) =>
        s.dayOfWeek === slot.dayOfWeek &&
        s.startTime === slot.startTime &&
        s.endTime === slot.endTime
    );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !turfData) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl text-white font-bold mb-2">😔 Oops!</h2>
        <p className="text-gray-400 mb-4">{error || "No data found"}</p>
        <button
          onClick={() => window.history.back()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const allDays = turfData.weekSlots || [];
  const selectedDayData = allDays.find((d) => d.day === selectedDay);
  const slotsForDay = selectedDayData?.slots || [];

  const groupedSlots = {
    Morning: slotsForDay.filter((s) => parseInt(s.startTime.split(":")[0]) < 12),
    Afternoon: slotsForDay.filter(
      (s) =>
        parseInt(s.startTime.split(":")[0]) >= 12 &&
        parseInt(s.startTime.split(":")[0]) < 17
    ),
    Evening: slotsForDay.filter(
      (s) =>
        parseInt(s.startTime.split(":")[0]) >= 17 &&
        parseInt(s.startTime.split(":")[0]) < 21
    ),
    Night: slotsForDay.filter(
      (s) => parseInt(s.startTime.split(":")[0]) >= 21
    ),
  };

  const mediaFiles = turfData.mediaFiles || [];
  const currentImage =
    mediaFiles.length > 0
      ? mediaFiles[currentImageIndex]?.base64Data?.startsWith("http") ||
        mediaFiles[currentImageIndex]?.base64Data?.startsWith("data:")
        ? mediaFiles[currentImageIndex].base64Data
        : `data:image/jpeg;base64,${mediaFiles[currentImageIndex].base64Data}`
      : "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800";

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % mediaFiles.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? mediaFiles.length - 1 : prev - 1
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="relative w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={turfData.name}
                className="rounded-2xl shadow-2xl w-full h-96 object-cover border border-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            {mediaFiles.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="w-full lg:w-1/2 text-white space-y-3">
            <h1 className="text-4xl font-bold">{turfData.name}</h1>
            <p className="text-gray-400">{turfData.description}</p>
            <p className="text-emerald-400 font-semibold">
              {turfData.locationName}
            </p>
            <p className="text-sm text-gray-400">
              Category: {turfData.categoryName}
            </p>
          </div>
        </div>

        {/* DATE NAVBAR */}
        <div className="flex overflow-x-auto gap-3 mt-8 pb-3 border-b border-slate-700 scrollbar-hide">
          {allDays.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(day.day)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl border ${
                selectedDay === day.day
                  ? "bg-emerald-600 border-emerald-500 text-white"
                  : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"
              } transition`}
            >
              <span className="font-bold">
                {new Date(day.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
              <span className="text-sm">{day.day.slice(0, 3)}</span>
            </button>
          ))}
        </div>

        {/* SLOT SECTIONS */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Slots for {selectedDay?.toLowerCase()}
          </h2>

          {slotsForDay.length === 0 ? (
            <div className="text-center py-10 bg-slate-800 border border-slate-700 rounded-xl">
              <p className="text-gray-400 text-lg">No slots available today 😕</p>
            </div>
          ) : (
            Object.entries(groupedSlots).map(([period, slots]) =>
              slots.length > 0 ? (
                <div key={period} className="mb-6">
                  <h3 className="text-xl text-emerald-400 font-semibold mb-3">
                    {period}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {slots.map((slot, idx) => {
                      const isDisabled = slot.status !== "AVAILABLE";
                      return (
                        <motion.div
                          key={idx}
                          whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                          onClick={() =>
                            !isDisabled &&
                            handleSlotSelect(slot, selectedDayData.date)
                          }
                          className={`p-4 rounded-xl border-2 transition ${
                            isDisabled
                              ? "bg-gray-700 border-gray-600 cursor-not-allowed opacity-50"
                              : isSlotSelected(slot)
                              ? "border-emerald-500 bg-emerald-500/20 cursor-pointer"
                              : "border-slate-700 bg-slate-800 hover:border-emerald-400 cursor-pointer"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-200 font-semibold">
                              {slot.startTime} - {slot.endTime}
                            </span>
                            <span className="text-emerald-400 font-bold">
                              ₹{slot.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            {isDisabled ? "Unavailable" : "Tap to select"}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : null
            )
          )}
        </div>

        {/* TOTAL BAR */}
        {selectedSlots.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-4 left-0 right-0 flex justify-center"
          >
            <div className="bg-slate-900 border border-emerald-500 shadow-xl rounded-2xl px-6 py-3 flex items-center gap-6">
              <p className="text-white text-lg font-semibold">
                Selected Slots: {selectedSlots.length}
              </p>
              <p className="text-emerald-400 text-2xl font-bold">
                Total: ₹{totalAmount}
              </p>
              <button
                onClick={() => alert("Proceed to Booking")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
              >
                Proceed to Book
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TurfDetails;
