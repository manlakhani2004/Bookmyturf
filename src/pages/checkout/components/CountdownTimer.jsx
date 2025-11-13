import { motion } from "framer-motion";
import { Clock, AlertTriangle } from "lucide-react";

export default function CountdownTimer({ isExpired, timeRemaining, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mb-6 p-6 rounded-2xl ${
        isExpired
          ? "bg-red-500/20 border border-red-500"
          : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isExpired ? (
            <AlertTriangle className="w-8 h-8 text-red-500" />
          ) : (
            <Clock className="w-8 h-8 text-emerald-500" />
          )}
          <div>
            <p className="text-gray-400 text-sm">
              {isExpired ? "Booking Expired" : "Time Remaining"}
            </p>
            <p className={`text-3xl font-bold ${isExpired ? "text-red-500" : "text-white"}`}>
              {timeRemaining || "00:00"}
            </p>
          </div>
        </div>
        {isExpired && (
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reselect Slots
          </button>
        )}
      </div>
    </motion.div>
  );
}
