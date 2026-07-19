import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center text-center pt-6 pb-4 px-4 select-none">
      
      {/* Official GTTC Circular Logo Emblem loaded from image URL */}
      <div className="mb-6 flex items-center justify-center">
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 filter drop-shadow-md hover:scale-105 transition-transform duration-300 bg-white dark:bg-slate-900 rounded-full p-1.5 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
          <img 
            src="https://www.gttcmsdc.com/public/nusrat-assets/img/logo2.jpg" 
            alt="GTTC Logo" 
            className="w-full h-full object-contain rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Official Government Title Heading */}
      <h1 className="text-[20px] sm:text-[24px] md:text-[28px] font-extrabold text-[#0d2e5c] dark:text-blue-100 tracking-tight font-display max-w-3xl leading-tight">
        Government Tool Room and Training Centre (GTTC)
      </h1>

      {/* Sub-Heading with Side Horizontal Accent Lines */}
      <div className="flex items-center justify-center gap-5 w-full max-w-xl mt-3 mb-6">
        <div className="h-[1.5px] flex-1 bg-linear-to-r from-transparent via-[#b2bec3]/40 dark:via-slate-700/40 to-[#b2bec3]/70 dark:to-slate-600/70"></div>
        <h2 className="text-[18px] sm:text-[22px] md:text-[24px] font-bold text-slate-600 dark:text-slate-300 tracking-wide font-sans shrink-0 select-none">
          Student Result System
        </h2>
        <div className="h-[1.5px] flex-1 bg-linear-to-l from-transparent via-[#b2bec3]/40 dark:via-slate-700/40 to-[#b2bec3]/70 dark:to-slate-600/70"></div>
      </div>
      
    </header>
  );
}
