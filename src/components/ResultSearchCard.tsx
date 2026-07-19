import React, { useState } from "react";
import { AlertCircle, User, Search as SearchIcon, Info } from "lucide-react";
import { DEPARTMENTS } from "../data/courses";
import { DAIML_STUDENTS } from "../data/daiml_students";
import { DAR_STUDENTS } from "../data/dar_students";
import { DPM_STUDENTS } from "../data/dpm_students";
import { DTDM_STUDENTS } from "../data/dtdm_students";

interface ResultSearchCardProps {
  onSearch: (deptCode: string, semester: number, regNo: string) => void;
  initialValues?: {
    deptCode: string;
    semester: number;
    regNo: string;
  };
  serverError?: string | null;
}

export default function ResultSearchCard({ onSearch, initialValues, serverError }: ResultSearchCardProps) {
  const [deptCode, setDeptCode] = useState(initialValues?.deptCode || "");
  const [semester, setSemester] = useState<string>(initialValues?.semester ? String(initialValues.semester) : "");
  const [regNo, setRegNo] = useState(initialValues?.regNo || "");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  
  // Validation error states
  const [errors, setErrors] = useState<{
    deptCode?: string;
    semester?: string;
    regNo?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    if (!deptCode) {
      newErrors.deptCode = "Please select a department";
    }
    if (!semester) {
      newErrors.semester = "Please select a semester";
    }
    if (!regNo.trim()) {
      newErrors.regNo = "Please enter your Registration Number";
    } else if (regNo.trim().length < 4) {
      newErrors.regNo = "Registration Number must be at least 4 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSearch(deptCode, Number(semester), regNo.trim());
  };

  // Clear single field error on focus/change
  const handleDeptChange = (val: string) => {
    setDeptCode(val);
    setStudentSearchQuery("");
    if (errors.deptCode) setErrors((prev) => ({ ...prev, deptCode: undefined }));
  };

  const handleSemChange = (val: string) => {
    setSemester(val);
    if (errors.semester) setErrors((prev) => ({ ...prev, semester: undefined }));
  };

  const handleRegNoChange = (val: string) => {
    setRegNo(val);
    if (errors.regNo) setErrors((prev) => ({ ...prev, regNo: undefined }));
  };

  // Quick helper to fill a sample for testing
  const handleQuickFill = (dept: string, sem: number, reg: string) => {
    setDeptCode(dept);
    setSemester(String(sem));
    setRegNo(reg);
    setErrors({});
  };

  // Filtered preloaded students list for selected department & semester
  const getPreloadedStudents = () => {
    if (!deptCode || !semester) return [];
    let students: Array<any> = [];
    if (deptCode === "DAIML") {
      students = DAIML_STUDENTS;
    } else if (deptCode === "DAR") {
      students = DAR_STUDENTS;
    } else if (deptCode === "DPM") {
      students = DPM_STUDENTS;
    } else if (deptCode === "DTDM") {
      students = DTDM_STUDENTS;
    }
    
    // Filter by selected semester
    const semNum = Number(semester);
    const filteredBySem = students.filter(st => st.semester === semNum);
    
    if (!studentSearchQuery) return filteredBySem;
    
    const query = studentSearchQuery.toLowerCase().trim();
    return filteredBySem.filter(
      st => st.studentName.toLowerCase().includes(query) || st.regNo.includes(query)
    );
  };

  const filteredStudents = getPreloadedStudents();

  return (
    <div className="w-full max-w-xl mx-auto px-1 sm:px-0">
      {/* Main Container Card: styled perfectly with a beautiful, premium soft-blue/dark gradient background that matches the GTTC identity */}
      <div id="search-card" className="bg-gradient-to-br from-[#f3f8ff] via-[#fafcff] to-[#ebf3ff] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-2xl border border-blue-100/80 dark:border-slate-800/80 shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Card Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          
          {/* Server Side/Database Error Banner */}
          {serverError && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-900 dark:text-red-200 rounded-xl p-4 flex items-start gap-3 shadow-xs animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm font-semibold leading-relaxed">
                {serverError}
              </div>
            </div>
          )}
          
          {/* Field 1: Select Department */}
          <div className="space-y-2">
            <label htmlFor="department-select" className="block text-[15px] font-bold text-[#0d2e5c] dark:text-blue-100">
              Select Department
            </label>
            <div className="relative">
              <select
                id="department-select"
                value={deptCode}
                onChange={(e) => handleDeptChange(e.target.value)}
                className={`w-full appearance-none pl-4 pr-11 py-3.5 bg-white dark:bg-slate-950 border shadow-xs rounded-xl text-slate-700 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 focus:border-[#0050d6] transition-all duration-200 cursor-pointer ${
                  errors.deptCode ? "border-red-400 bg-red-50/30 dark:bg-red-950/20" : "border-blue-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700"
                }`}
              >
                <option value="" className="dark:bg-slate-950">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id} className="dark:bg-slate-950">
                    {dept.code} – {dept.name}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Chevron exactly like the photo */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-700 dark:text-slate-300">
                <svg className="h-4 w-4 stroke-slate-500 dark:stroke-slate-400 stroke-2 fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {errors.deptCode && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.deptCode}
              </p>
            )}
          </div>

          {/* Field 2: Select Semester */}
          <div className="space-y-2">
            <label htmlFor="semester-select" className="block text-[15px] font-bold text-[#0d2e5c] dark:text-blue-100">
              Select Semester
            </label>
            <div className="relative">
              <select
                id="semester-select"
                value={semester}
                onChange={(e) => handleSemChange(e.target.value)}
                className={`w-full appearance-none pl-4 pr-11 py-3.5 bg-white dark:bg-slate-950 border shadow-xs rounded-xl text-slate-700 dark:text-slate-200 text-sm focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 focus:border-[#0050d6] transition-all duration-200 cursor-pointer ${
                  errors.semester ? "border-red-400 bg-red-50/30 dark:bg-red-950/20" : "border-blue-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700"
                }`}
              >
                <option value="" className="dark:bg-slate-950">Select Semester</option>
                {[1, 2, 3, 4, 5, 6].map((sem) => (
                  <option key={sem} value={String(sem)} className="dark:bg-slate-950">
                    Semester {sem}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-700 dark:text-slate-300">
                <svg className="h-4 w-4 stroke-slate-500 dark:stroke-slate-400 stroke-2 fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {errors.semester && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.semester}
              </p>
            )}
          </div>

          {/* Field 3: Enter Registration Number */}
          <div className="space-y-2">
            <label htmlFor="reg-no-input" className="block text-[15px] font-bold text-[#0d2e5c] dark:text-blue-100">
              Enter Registration Number
            </label>
            <div className="relative">
              <input
                id="reg-no-input"
                type="text"
                placeholder="Enter Registration Number"
                value={regNo}
                onChange={(e) => handleRegNoChange(e.target.value)}
                className={`w-full pl-4 pr-4 py-3.5 bg-white dark:bg-slate-950 border shadow-xs rounded-xl text-slate-800 dark:text-slate-250 text-sm focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 focus:border-[#0050d6] transition-all duration-200 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal ${
                  errors.regNo ? "border-red-400 bg-red-50/30 dark:bg-red-950/20" : "border-blue-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700"
                }`}
              />
            </div>
            {errors.regNo && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.regNo}
              </p>
            )}
          </div>

          {/* Preloaded Directory helper */}
          {deptCode && semester && (
            <div className="space-y-2 bg-white/70 dark:bg-slate-900/40 border border-blue-100/50 dark:border-slate-800/60 rounded-xl p-3 shadow-xs animate-fadeIn">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100/80 dark:border-slate-800/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gttc-blue-900 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-[#0d2e5c] dark:text-blue-200 uppercase tracking-wider">
                    Student Directory
                  </span>
                  <span className="text-[9px] bg-[#0050d6]/10 dark:bg-blue-500/20 text-[#0050d6] dark:text-blue-300 font-bold px-1.5 py-0.5 rounded-md uppercase">
                    {deptCode} • Sem {semester}
                  </span>
                </div>
                <span className="text-[10px] bg-[#0050d6]/10 dark:bg-blue-500/20 text-[#0050d6] dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                  {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
                </span>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Quick search ${deptCode} directory...`}
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 bg-white dark:bg-slate-950 border border-blue-100/80 dark:border-slate-800 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/15 focus:border-[#0050d6] transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <SearchIcon className="absolute left-2.5 top-2.5 w-3 h-3 text-slate-400 dark:text-slate-500" />
                {studentSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setStudentSearchQuery("")}
                    className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-semibold focus:outline-hidden"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="max-h-[125px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((st, index) => (
                    <button
                      key={st.regNo}
                      type="button"
                      onClick={() => handleQuickFill(deptCode, Number(semester), st.regNo)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between border ${
                        regNo === st.regNo
                          ? "bg-blue-50/90 dark:bg-blue-950/50 border-[#0050d6] dark:border-blue-500 text-[#0050d6] dark:text-blue-300 font-bold shadow-xs"
                          : `${
                              index % 2 === 0
                                ? "bg-white dark:bg-slate-950/60"
                                : "bg-slate-50/70 dark:bg-slate-900/20"
                            } border-slate-100/70 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 hover:border-blue-200 dark:hover:border-slate-750`
                      }`}
                    >
                      <span className="truncate pr-3 uppercase font-medium text-[11px] tracking-wide">{st.studentName}</span>
                      <span className={`font-mono text-[9px] flex-shrink-0 px-2 py-0.5 rounded-md font-bold border transition-colors ${
                        regNo === st.regNo
                          ? "bg-blue-100 dark:bg-blue-900/50 text-[#0050d6] dark:text-blue-200 border-[#0050d6]/20"
                          : "bg-slate-100/90 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-800"
                      }`}>{st.regNo}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-3 px-2">
                    {studentSearchQuery ? (
                      <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                        No students match "{studentSearchQuery}".
                      </p>
                    ) : (
                      <div className="space-y-1.5 text-center">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1">
                          <Info className="w-3.5 h-3.5 text-amber-500" />
                          No preloaded records for Semester {semester}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[280px] mx-auto leading-normal">
                          Only Semester 4 contains preloaded mock student data in this portal. Switch the dropdown to Semester 4 to browse the {deptCode} directory.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Field 4: Show Result Button (Centered, with custom SVG icon) */}
          <div className="pt-4 flex justify-center">
            <button
              id="submit-search-btn"
              type="submit"
              className="w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0050d6] to-[#003bb0] hover:from-[#0042b4] hover:to-[#002f8c] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-base select-none"
            >
              {/* Document Search Icon matching photo exactly */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 flex-shrink-0 text-white"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                {/* Embedded magnifying glass inside document */}
                <circle cx="11.5" cy="14.5" r="2.5" strokeWidth="2.2" />
                <line x1="13.3" y1="16.3" x2="16" y2="19" strokeWidth="2.2" />
              </svg>
              <span>Show Result</span>
            </button>
          </div>
        {/* Form closing is here */}
        </form>

      </div>
    </div>
  );
}
