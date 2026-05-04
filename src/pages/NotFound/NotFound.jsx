import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
        >
          <h1
            className="text-[160px] md:text-[200px] font-black leading-none"
            style={{
              fontFamily: "Georgia, serif",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-1 bg-amber-500/50 rounded-full mx-auto mb-8"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Sahifa topilmadi
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Siz qidirgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan
            bo'lishi mumkin.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-2xl shadow-amber-500/25 relative overflow-hidden group inline-block"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">🏠 Bosh sahifaga</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/18 border border-white/25 text-white font-semibold px-8 py-3.5 rounded-xl transition-all inline-block"
            >
              Murojaat qilish
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-600 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-amber-500 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </div>
  );
}

export default NotFound;
