import { motion } from "framer-motion";
import { XCircle, CheckCircle, Loader2 } from "lucide-react";

export default function ActionButtons({ handleCancel, handleConfirm, isExpired, actionLoading }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-4">
      <button
        onClick={handleCancel}
        disabled={isExpired || actionLoading}
        className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-red-500 font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
        Cancel Booking
      </button>

      <button
        onClick={handleConfirm}
        disabled={isExpired || actionLoading}
        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/50 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
        Confirm Booking
      </button>
    </motion.div>
  );
}
