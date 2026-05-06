import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex items-center justify-center px-6 antialiased">
      <div className="max-w-xl w-full text-center">
        {/* 404 Raqami - Soddalashtirilgan */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[100px] md:text-[150px] font-black leading-none tracking-tighter text-slate-200">
            404
          </h1>
        </motion.div>

        {/* Matnlar qismi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 -mt-8 md:-mt-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {t("not_found.title")}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 max-w-sm mx-auto leading-relaxed">
            {t("not_found.desc")}
          </p>
        </motion.div>

        {/* Tugma - Brend rangida (Yashil) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-[#3de082] hover:bg-[#32c972] text-slate-900 font-black px-10 py-4 rounded-[1.5rem] shadow-xl shadow-emerald-500/20 transition-all duration-300  text-xs tracking-[0.2em]"
          >
            Bosh sahifaga qaytish
          </Link>
        </motion.div>

        {/* Orqa fondagi mayin rangli nuqtalar (Binafsha va Yashil) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-full -translate-y-full w-64 h-64 bg-[#892be2]/5 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 translate-x-1/4 w-64 h-64 bg-[#3de082]/5 blur-[100px] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
