import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, ExternalLink, Calendar, Search, ShieldAlert, Loader2, ArrowLeft, Sun, Moon } from "lucide-react";
import Header from "./components/Header";
import ResultSearchCard from "./components/ResultSearchCard";
import ResultSheet from "./components/ResultSheet";
import { StudentResult } from "./types";
import { lookupStudentResult } from "./data/db_lookup";

export default function App() {
  const [activeResult, setActiveResult] = useState<StudentResult | null>(null);
  const [searchParams, setSearchParams] = useState<{
    deptCode: string;
    semester: number;
    regNo: string;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("gttc-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Sync theme with document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("gttc-theme", nextTheme);
  };

  // Update current time on mount for authentic portal feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        }) + " | " + now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle direct links or new tabs for PDF download or specific results
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dept = params.get("dept");
      const sem = params.get("sem");
      const reg = params.get("reg");

      if (dept && sem && reg) {
        const semesterNum = Number(sem);
        setIsLoading(true);
        lookupStudentResult(reg, dept, semesterNum)
          .then((result) => {
            if (result) {
              setActiveResult(result);
              setSearchParams({ deptCode: dept, semester: semesterNum, regNo: reg });
            }
          })
          .catch((err) => console.error("Initial load error:", err))
          .finally(() => setIsLoading(false));
      }
    }
  }, []);

  const handleSearchSubmit = async (deptCode: string, semester: number, regNo: string) => {
    setIsLoading(true);
    setServerError(null);
    setSearchParams({ deptCode, semester, regNo });
    
    try {
      const result = await lookupStudentResult(regNo, deptCode, semester);
      if (result) {
        setActiveResult(result);
        setServerError(null);
      } else {
        setActiveResult(null);
        setServerError("Result not found. Please check your Department, Semester and Registration Number.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setActiveResult(null);
      setServerError("Result not found. Please check your Department, Semester and Registration Number.");
    } finally {
      setIsLoading(false);
      
      // Scroll to result view smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToSearch = () => {
    setActiveResult(null);
    setServerError(null);
    // Don't clear searchParams so search form remains pre-filled
  };

  return (
    <div className={theme}>
      <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-50/90 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
        
        {/* Theme Toggle Button - Positioned beautifully in the Top-Right Corner */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 print:hidden">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-md hover:shadow-lg active:scale-95 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center focus:outline-hidden"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-[#0f2e5c]" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </button>
        </div>

        {/* 0. Precise side dotted matrix patterns from the screenshot */}
        <div 
          className="absolute left-0 top-12 bottom-12 w-16 sm:w-24 opacity-15 dark:opacity-5 pointer-events-none hidden lg:block print:hidden" 
          style={{ 
            backgroundImage: `radial-gradient(${theme === "dark" ? "#60a5fa" : "#0050d6"} 1.5px, transparent 1.5px)`, 
            backgroundSize: '16px 16px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        ></div>
        <div 
          className="absolute right-0 top-12 bottom-12 w-16 sm:w-24 opacity-15 dark:opacity-5 pointer-events-none hidden lg:block print:hidden" 
          style={{ 
            backgroundImage: `radial-gradient(${theme === "dark" ? "#60a5fa" : "#0050d6"} 1.5px, transparent 1.5px)`, 
            backgroundSize: '16px 16px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        ></div>

        {/* 0.1 Bottom decorative curved waves from the screenshot */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none overflow-hidden print:hidden z-0">
          <svg className="absolute bottom-0 w-full h-36 text-blue-100/40 dark:text-slate-900/10" viewBox="0 0 1440 180" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,96C180,128,360,160,540,144C720,128,900,64,1080,48C1260,32,1440,64,1440,64V180H0Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-32 text-[#e0ecfc]/65 dark:text-slate-950/20" viewBox="0 0 1440 180" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,64C120,80,240,112,360,112C480,112,600,80,720,64C840,48,960,48,1080,64C1200,80,1320,112,1380,128L1440,144V180H0Z" />
          </svg>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col justify-start relative z-10">
          
          {/* Animated Header */}
          <AnimatePresence mode="popLayout">
            {!activeResult && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="print:hidden"
              >
                <Header />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Screen Transitions */}
          <div className="mt-2 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* STATE A: Loading Lookup State */}
              {isLoading && (
                <motion.div
                  key="loading-screen"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="flex flex-col items-center justify-center py-20 text-center space-y-4 print:hidden"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gttc-blue-500 opacity-15 blur-md animate-ping"></div>
                    <Loader2 className="w-14 h-14 text-gttc-blue-900 dark:text-blue-400 animate-spin relative" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-gttc-blue-900 dark:text-blue-200 font-display">Verifying Academic Records...</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                      Connecting to the centralized GTTC evaluation database to fetch student credentials safely.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STATE B: Result Search Form Screen */}
              {!isLoading && !activeResult && (
                <motion.div
                  key="search-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full"
                >
                  <ResultSearchCard 
                    onSearch={handleSearchSubmit} 
                    initialValues={searchParams || undefined}
                    serverError={serverError}
                  />
                </motion.div>
              )}

              {/* STATE C: Transcript Result Display Sheet */}
              {!isLoading && activeResult && (
                <motion.div
                  key="result-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  <ResultSheet 
                    result={activeResult} 
                    onBack={handleBackToSearch} 
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer Block */}
          <footer className="mt-auto pt-12 pb-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 w-full print:hidden">
            <div className="flex flex-col items-center justify-center gap-2 max-w-4xl mx-auto px-4">
              <span className="font-medium text-slate-500 dark:text-slate-400 tracking-wide text-xs">
                Created by <span className="text-[#0050d6] dark:text-blue-400 font-bold uppercase font-mono bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100/50 dark:border-blue-900/40 px-2.5 py-0.5 rounded-md">Balu_5th sem AIML</span>
              </span>
            </div>
          </footer>

        </main>

      </div>
    </div>
  );
}
