import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      {/* Asosiy Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Tashqi aylanuvchi qatlam */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>

        {/* Ichki kichik aylanuvchi qatlam (teskari tomonga) */}
        <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-dotted border-blue-400 border-t-transparent [animation-direction:reverse]"></div>
      </div>

      {/* Matnli qism */}
      <div className="mt-5 flex flex-col items-center">
        <span className="text-xl font-semibold text-gray-800 tracking-widest uppercase">
          Yuklanmoqda
        </span>
        {/* Nuqtalar animatsiyasi */}
        <div className="flex space-x-1 mt-2">
          <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
