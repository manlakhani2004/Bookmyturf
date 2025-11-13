import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function ErrorScreen({ message, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border border-red-500 rounded-2xl p-8 max-w-md w-full text-center"
      >
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Booking Failed</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <button onClick={onBack} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
