import { motion } from "framer-motion";
import { Calendar, DollarSign } from "lucide-react";

export default function BookingSummary({ booking }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Calendar className="w-5 h-5 text-emerald-500" />
            {/* <span className="text-gray-300">Number of Slots</span> */}
          </div>
          {/* <span className="text-white font-semibold">{booking?.slots?.length || 0} </span> */}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <span className="text-gray-300">Total Amount</span>
          </div>
          <span className="text-white font-semibold text-xl">
            ₹{booking?.totalAmount?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-semibold text-white mb-4">Selected Slots</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {booking?.bookingSlots?.map((slot) => (
            <div key={slot.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">{slot.slotTiming.dayOfWeek}</p>
                  <p className="text-gray-400 text-sm">
                    {slot.slotTiming.startTime} - {slot.slotTiming.endTime}
                  </p>
                </div>
                <p className="text-emerald-500 font-semibold">₹{slot.slotTiming.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
