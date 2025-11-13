import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoaderScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-4" />
        <p className="text-white text-xl">Creating your booking...</p>
      </motion.div>
    </div>
  );
}
