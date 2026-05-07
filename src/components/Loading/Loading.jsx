import React from "react";

const Loading = () => {
  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center backdrop-blur-md"
      style={{ backgroundColor: "rgba(244, 245, 248, 0.8)" }} // --bg-light-section
    >
      {/* Spinner va Logo Konteyneri */}
      <div className="relative flex items-center justify-center">
        {/* 1. Tashqi aylanuvchi halqa (Mint) */}
        <div
          className="h-24 w-24 animate-spin rounded-full border-2 border-solid border-t-transparent"
          style={{
            borderColor: "var(--color-primary)",
            borderTopColor: "transparent",
          }}
        ></div>

        {/* 2. Ichki teskari aylanuvchi halqa (Binafsha) */}
        <div
          className="absolute h-20 w-20 animate-spin rounded-full border-2 border-dotted border-t-transparent [animation-direction:reverse] opacity-70"
          style={{
            borderColor: "var(--color-secondary)",
            borderTopColor: "transparent",
          }}
        ></div>

        {/* 3. Markazdagi Logo */}
        <div className="absolute flex items-center justify-center bg-white rounded-full p-2 shadow-sm">
          <img
            src="/logo.png" // Agar logotip nomi boshqacha bo'lsa (masalan logo.svg), shuni yozing
            alt="Logo"
            className="h-10 w-10 object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Matnli qism */}
      <div className="mt-8 flex flex-col items-center">
        <span
          className="text-sm font-bold tracking-[0.3em] opacity-80"
          style={{ color: "var(--text-dark)" }}
        >
          Yuklanmoqda...
        </span>

        {/* Progress bar uslubidagi chiziq */}
        <div className="w-32 h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full animate-[progress_1.5s_ease-in-out_infinite]"
            style={{
              backgroundColor: "var(--color-primary)",
              width: "40%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
