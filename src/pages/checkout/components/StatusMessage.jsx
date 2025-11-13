import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function StatusMessage({ success, error, booking }) {
  return (
    <>
      {success && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          className="mt-6 bg-emerald-500/20 border border-emerald-500 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-500" />
          <p className="text-emerald-500 font-medium">{success}</p>
        </motion.div>
      )}

      {error && booking && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          className="mt-6 bg-red-500/20 border border-red-500 rounded-xl p-4 flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-500" />
          <p className="text-red-500 font-medium">{error}</p>
        </motion.div>
      )}
    </>
  );
}
