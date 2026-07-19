import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, AlertTriangle, QrCode, Download, Loader2 } from "lucide-react";
import { StudentResult } from "../types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ResultSheetProps {
  result: StudentResult;
  onBack: () => void;
}

// Convert a number into a word string (up to 2000)
function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  const convertLessThanOneThousand = (n: number): string => {
    if (n < 20) return ones[n];
    if (n < 100) {
      const tenDigit = Math.floor(n / 10);
      const oneDigit = n % 10;
      return tens[tenDigit] + (oneDigit ? " " + ones[oneDigit] : "");
    }
    const hundredDigit = Math.floor(n / 100);
    const remainder = n % 100;
    return ones[hundredDigit] + " Hundred" + (remainder ? " " + convertLessThanOneThousand(remainder) : "");
  };

  if (num >= 1000) {
    const thousandDigit = Math.floor(num / 1000);
    const remainder = num % 1000;
    return ones[thousandDigit] + " Thousand" + (remainder ? " " + convertLessThanOneThousand(remainder) : "");
  }
  
  return convertLessThanOneThousand(num);
}

// Translate numerical semester to words
const getSemesterWord = (sem: number): string => {
  const map: { [key: number]: string } = {
    1: "FIRST SEMESTER",
    2: "SECOND SEMESTER",
    3: "THIRD SEMESTER",
    4: "FOURTH SEMESTER",
    5: "FIFTH SEMESTER",
    6: "SIXTH SEMESTER",
    7: "SEVENTH SEMESTER",
    8: "EIGHTH SEMESTER"
  };
  return map[sem] || `${sem} SEMESTER`;
};

// Calculate Max and Min splits for IA/Exam/Total depending on subject maximum
const getMarksSplits = (subject: any) => {
  const max = subject.maxMarks;
  const min = subject.minMarks;
  
  let maxIA: string | number = "-";
  let maxExam: string | number = "-";
  let maxTotal: string | number = "-";
  
  let minIA: string | number = "-";
  let minExam: string | number = "-";
  let minTotal: string | number = "-";

  let obtIA: string | number = subject.marksIA;
  let obtExam: string | number = subject.marksExam;
  let obtTotal: string | number = subject.marksObtained;

  if (max === 120) {
    maxIA = 70;
    maxExam = 50;
    maxTotal = 120;
    minIA = 35;
    minExam = 25;
    minTotal = 60;
  } else if (max === 70) {
    maxIA = 70;
    maxExam = "-";
    maxTotal = 70;
    minIA = 35;
    minExam = "-";
    minTotal = 35;
    obtExam = "-";
  } else if (max === 1000) {
    maxIA = 100;
    maxExam = 900;
    maxTotal = 1000;
    minIA = 60;
    minExam = 540;
    minTotal = 600;
  } else {
    maxTotal = max;
    minTotal = min;
    maxIA = Math.round(max * 0.4);
    maxExam = max - maxIA;
    minIA = Math.round(min * 0.4);
    minExam = min - minIA;
  }

  return {
    maxIA, maxExam, maxTotal,
    minIA, minExam, minTotal,
    obtIA, obtExam, obtTotal
  };
};

export default function ResultSheet({ result, onBack }: ResultSheetProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const isIframe = typeof window !== "undefined" && window.self !== window.top;
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  // Auto-scale mark card on mobile viewports to prevent horizontal scroll
  useEffect(() => {
    const handleResize = () => {
      if (!printAreaRef.current) return;
      const parent = printAreaRef.current.parentElement;
      if (!parent) return;
      
      const parentWidth = parent.getBoundingClientRect().width;
      const idealWidth = 760; // Optimal desktop layout width for table columns
      
      if (parentWidth < idealWidth) {
        const s = parentWidth / idealWidth;
        setScale(s);
        // Measure the unscaled scrollHeight
        const unscaledHeight = printAreaRef.current.scrollHeight || 950;
        setContainerHeight(unscaledHeight * s);
      } else {
        setScale(1);
        setContainerHeight(undefined);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Timeout to ensure initial DOM layout and rendering completes
    const t1 = setTimeout(handleResize, 100);
    const t2 = setTimeout(handleResize, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [result]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Page Margins and Coordinates
      const marginX = 12;
      const contentWidth = 186; // 210 - 24

      // 1. Watermark background (drawn first so text sits on top)
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(80);
      pdf.setTextColor(250, 250, 250);
      pdf.text("GTTC", 105, 160, { align: "center" });

      // Reset text color to black
      pdf.setTextColor(0, 0, 0);

      // Outer borders
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(5, 5, 200, 287); // Page boundary
      pdf.setLineWidth(0.25);
      pdf.rect(6.5, 6.5, 197, 284); // Inner elegant border

      // 2. Header Block
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text("GOVERNMENT TOOL ROOM & TRAINING CENTRE", 105, 18, { align: "center" });

      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text("BELAGAVI - 590010", 105, 23, { align: "center" });

      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("STATEMENT OF MARKS", 105, 31, { align: "center" });
      pdf.line(78, 32, 132, 32); // Underline statement

      pdf.setFontSize(10);
      pdf.text(`DIPLOMA IN ${result.departmentName.toUpperCase()}`, 105, 39, { align: "center" });

      // 3. Metadata Table
      const metaY = 46;
      pdf.setLineWidth(0.35);
      pdf.rect(marginX, metaY, contentWidth, 32);

      // Metadata horizontal lines
      pdf.line(marginX, metaY + 8, marginX + contentWidth, metaY + 8);
      pdf.line(marginX, metaY + 16, marginX + contentWidth, metaY + 16);
      pdf.line(marginX, metaY + 24, marginX + contentWidth, metaY + 24);

      // Metadata vertical lines
      pdf.line(marginX + 43, metaY, marginX + 43, metaY + 32); // Divide label and value
      pdf.line(marginX + 123, metaY + 16, marginX + 123, metaY + 32); // Divide left and right
      pdf.line(marginX + 143, metaY + 16, marginX + 143, metaY + 32); // Divide semester and date labels

      pdf.setFontSize(8.5);

      // Row 1: Student Name
      pdf.setFont("Helvetica", "bold");
      pdf.text("Student Name", marginX + 2, metaY + 5.5);
      pdf.setFont("Helvetica", "bold");
      pdf.text(result.studentName.toUpperCase(), marginX + 45, metaY + 5.5);

      // Row 2: Father Name
      pdf.setFont("Helvetica", "bold");
      pdf.text("Father Name", marginX + 2, metaY + 13.5);
      pdf.setFont("Helvetica", "normal");
      pdf.text(result.fatherName.toUpperCase(), marginX + 45, metaY + 13.5);

      // Row 3: Register Number & Semester
      pdf.setFont("Helvetica", "bold");
      pdf.text("Register Number", marginX + 2, metaY + 21.5);
      pdf.setFont("Helvetica", "bold");
      pdf.text(result.regNo, marginX + 45, metaY + 21.5);

      pdf.setFont("Helvetica", "bold");
      pdf.text("Semester", marginX + 125, metaY + 21.5);
      pdf.setFont("Helvetica", "bold");
      pdf.text(getSemesterWord(result.semester), marginX + 145, metaY + 21.5);

      // Row 4: Exam Month Year & Date
      pdf.setFont("Helvetica", "bold");
      pdf.text("Exam", marginX + 2, metaY + 29.5);
      pdf.setFont("Helvetica", "normal");
      pdf.text(result.examMonthYear.toUpperCase(), marginX + 45, metaY + 29.5);

      pdf.setFont("Helvetica", "bold");
      pdf.text("Date", marginX + 125, metaY + 29.5);
      pdf.setFont("Helvetica", "normal");
      pdf.text(result.dateOfIssue, marginX + 145, metaY + 29.5);


      // 4. Evaluation Marks Table Header
      const tableY = 84;
      pdf.setLineWidth(0.35);
      pdf.rect(marginX, tableY, contentWidth, 14);
      pdf.line(marginX, tableY + 7, marginX + contentWidth, tableY + 7);

      // Header vertical dividers
      pdf.line(marginX + 10, tableY, marginX + 10, tableY + 14); // Sl. No.
      pdf.line(marginX + 76, tableY, marginX + 76, tableY + 14); // Subject
      pdf.line(marginX + 112, tableY, marginX + 112, tableY + 14); // Max Marks
      pdf.line(marginX + 148, tableY, marginX + 148, tableY + 14); // Min Marks

      // Max marks subdivisions
      pdf.line(marginX + 88, tableY + 7, marginX + 88, tableY + 14);
      pdf.line(marginX + 100, tableY + 7, marginX + 100, tableY + 14);

      // Min marks subdivisions
      pdf.line(marginX + 124, tableY + 7, marginX + 124, tableY + 14);
      pdf.line(marginX + 136, tableY + 7, marginX + 136, tableY + 14);

      // Obtained marks subdivisions
      pdf.line(marginX + 160, tableY + 7, marginX + 160, tableY + 14);
      pdf.line(marginX + 172, tableY + 7, marginX + 172, tableY + 14);

      // Texts inside table header
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.text("Sl.", marginX + 5, tableY + 4, { align: "center" });
      pdf.text("No.", marginX + 5, tableY + 6.2, { align: "center" });
      pdf.text("Subject", marginX + 12, tableY + 5);

      pdf.text("Maximum Marks", marginX + 94, tableY + 4, { align: "center" });
      pdf.text("Minimum Marks", marginX + 130, tableY + 4, { align: "center" });
      pdf.text("Marks Obtained", marginX + 167, tableY + 4, { align: "center" });

      pdf.setFontSize(7.5);
      pdf.text("IA", marginX + 82, tableY + 11, { align: "center" });
      pdf.text("E", marginX + 94, tableY + 11, { align: "center" });
      pdf.text("T", marginX + 106, tableY + 11, { align: "center" });

      pdf.text("IA", marginX + 118, tableY + 11, { align: "center" });
      pdf.text("E", marginX + 130, tableY + 11, { align: "center" });
      pdf.text("T", marginX + 142, tableY + 11, { align: "center" });

      pdf.text("IA", marginX + 154, tableY + 11, { align: "center" });
      pdf.text("E", marginX + 166, tableY + 11, { align: "center" });
      pdf.text("T", marginX + 179, tableY + 11, { align: "center" });


      // 5. Subject rows loop
      let rowY = tableY + 14;
      pdf.setFontSize(8);

      result.subjectResults.forEach((subject, index) => {
        const {
          maxIA, maxExam, maxTotal,
          minIA, minExam, minTotal,
          obtIA, obtExam, obtTotal
        } = getMarksSplits(subject);

        pdf.setLineWidth(0.2);
        pdf.rect(marginX, rowY, contentWidth, 8);

        // Vertical separators
        pdf.line(marginX + 10, rowY, marginX + 10, rowY + 8);
        pdf.line(marginX + 76, rowY, marginX + 76, rowY + 8);
        pdf.line(marginX + 88, rowY, marginX + 88, rowY + 8);
        pdf.line(marginX + 100, rowY, marginX + 100, rowY + 8);
        pdf.line(marginX + 112, rowY, marginX + 112, rowY + 8);
        pdf.line(marginX + 124, rowY, marginX + 124, rowY + 8);
        pdf.line(marginX + 136, rowY, marginX + 136, rowY + 8);
        pdf.line(marginX + 148, rowY, marginX + 148, rowY + 8);
        pdf.line(marginX + 160, rowY, marginX + 160, rowY + 8);
        pdf.line(marginX + 172, rowY, marginX + 172, rowY + 8);

        // Texts inside row
        pdf.setFont("Helvetica", "normal");
        pdf.text(String(index + 1), marginX + 5, rowY + 5.5, { align: "center" });

        const subTitle = `${subject.title} (${subject.code})`.toUpperCase();
        const dispTitle = subTitle.length > 40 ? subTitle.substring(0, 38) + "..." : subTitle;
        pdf.text(dispTitle, marginX + 12, rowY + 5.5);

        pdf.text(String(maxIA), marginX + 82, rowY + 5.5, { align: "center" });
        pdf.text(String(maxExam), marginX + 94, rowY + 5.5, { align: "center" });
        pdf.text(String(maxTotal), marginX + 106, rowY + 5.5, { align: "center" });

        pdf.text(String(minIA), marginX + 118, rowY + 5.5, { align: "center" });
        pdf.text(String(minExam), marginX + 130, rowY + 5.5, { align: "center" });
        pdf.text(String(minTotal), marginX + 142, rowY + 5.5, { align: "center" });

        const isWithheld = result.resultStatus === "WITHHELD";
        pdf.setFont("Helvetica", "bold");
        pdf.text(isWithheld ? "XX" : String(obtIA), marginX + 154, rowY + 5.5, { align: "center" });
        pdf.text(isWithheld ? "XX" : String(obtExam), marginX + 166, rowY + 5.5, { align: "center" });
        pdf.text(isWithheld ? "XX" : String(obtTotal), marginX + 179, rowY + 5.5, { align: "center" });

        rowY += 8;
      });


      // 6. Aggregates Table
      const summaryY = rowY + 4;
      pdf.setLineWidth(0.35);
      pdf.rect(marginX, summaryY, contentWidth, 16);
      pdf.line(marginX, summaryY + 8, marginX + contentWidth, summaryY + 8);

      // Dividers for summary box
      pdf.line(marginX + 45, summaryY, marginX + 45, summaryY + 16);
      pdf.line(marginX + 90, summaryY, marginX + 90, summaryY + 16);
      pdf.line(marginX + 135, summaryY, marginX + 135, summaryY + 16);

      // Row 1 values
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.text("Grand Total", marginX + 2, summaryY + 5.5);
      pdf.setFont("Helvetica", "bold");
      pdf.text(result.resultStatus === "WITHHELD" ? "XX" : String(result.totalMarksObtained), marginX + 47, summaryY + 5.5);

      pdf.setFont("Helvetica", "bold");
      pdf.text("Percentage", marginX + 92, summaryY + 5.5);
      pdf.setFont("Helvetica", "bold");
      pdf.text(result.resultStatus === "WITHHELD" ? "XX.XX%" : `${result.percentage}%`, marginX + 137, summaryY + 5.5);

      // Row 2 values
      pdf.setFont("Helvetica", "bold");
      pdf.text("Result", marginX + 2, summaryY + 13.5);
      pdf.setFont("Helvetica", "bold");
      pdf.text(result.resultStatus.toUpperCase(), marginX + 47, summaryY + 13.5);

      pdf.setFont("Helvetica", "bold");
      pdf.text("Total in Words", marginX + 92, summaryY + 13.5);
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(7.5);
      const textWords = result.resultStatus === "WITHHELD" ? "WITHHELD" : `${numberToWords(result.totalMarksObtained)} Only`.toUpperCase();
      pdf.text(textWords, marginX + 137, summaryY + 13.5);


      // 7. Signature blocks exactly matching the paper
      const sigY = summaryY + 36;
      pdf.setLineWidth(0.25);
      pdf.line(marginX + 10, sigY, marginX + 60, sigY);
      pdf.line(marginX + 120, sigY, marginX + 170, sigY);

      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text("CHECKED BY", marginX + 35, sigY + 5, { align: "center" });
      pdf.text("PRINCIPAL", marginX + 145, sigY + 5, { align: "center" });


      // 8. Output and trigger save securely
      pdf.save(`MarksCard_${result.regNo}_Semester_${result.semester}.pdf`);
    } catch (error) {
      console.error("PDF download error:", error);
      alert("Failed to generate PDF. Please try again or use standard print feature.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("download") === "1") {
        // Clean URL query params so it doesn't auto-download again if reloaded
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        
        // Wait a small moment for rendering to complete before converting to canvas
        setTimeout(() => {
          handleDownloadPDF();
        }, 800);
      }
    }
  }, []);

  const downloadUrl = typeof window !== "undefined"
    ? `${window.location.origin}${window.location.pathname}?download=1&dept=${encodeURIComponent(result.departmentCode)}&sem=${result.semester}&reg=${encodeURIComponent(result.regNo)}`
    : "#";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-2 sm:px-0">
      
      {/* Action Buttons Toolbar - Hidden during print */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden w-full transition-colors duration-300">
        <button
          onClick={onBack}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 px-4 py-2 rounded-lg transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Search Another Result
        </button>
        
        {isIframe ? (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gttc-blue-900 dark:bg-blue-600 hover:bg-gttc-blue-950 dark:hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer text-center"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        ) : (
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gttc-blue-900 dark:bg-blue-600 hover:bg-gttc-blue-950 dark:hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isDownloading ? "Downloading PDF..." : "Download PDF"}
          </button>
        )}
      </div>

      {/* WITHHELD Warning - Hidden during print unless printing */}
      {result.resultStatus === "WITHHELD" && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-600 text-amber-900 dark:text-amber-200 text-sm rounded-r-lg flex items-start gap-3 print:border-amber-400 transition-colors duration-300">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
          <div>
            <span className="font-bold">RESULT WITHHELD:</span> The academic result for this registration number has been withheld. Please contact your center administration office for clearing outstanding verifications.
          </div>
        </div>
      )}

      {/* CLASSIC GOVERNMENT STATEMENT OF MARKS LAYOUT */}
      <div className="bg-slate-100 dark:bg-slate-950/40 p-1 sm:p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner print:bg-white print:p-0 print:border-none print:shadow-none transition-colors duration-300 overflow-hidden flex justify-center items-start" style={containerHeight ? { height: `${containerHeight}px` } : undefined}>
        <div 
          ref={printAreaRef}
          className="bg-white dark:bg-slate-900 text-black dark:text-slate-100 p-3.5 sm:p-10 md:p-14 mx-auto max-w-[800px] border border-slate-300 dark:border-slate-800 shadow-lg font-serif relative print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:mx-0 print:max-w-full transition-colors duration-300 overflow-hidden"
          id="classic-marks-card" style={scale < 1 ? { "--card-scale": scale, "--card-width": "760px", transform: "scale(var(--card-scale, 1))", transformOrigin: "top center", width: "var(--card-width, 100%)", minWidth: "760px" } as React.CSSProperties : undefined}
        >
          {/* Elegant Print Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] dark:opacity-[0.03] pointer-events-none select-none">
            <span className="text-[70px] sm:text-[140px] font-bold uppercase tracking-widest text-slate-950 dark:text-slate-100 rotate-12">
              GTTC
            </span>
          </div>

          {/* Header Block */}
          <div className="text-center space-y-1 mb-8">
            <h1 className="text-base sm:text-2xl font-bold tracking-wide uppercase text-slate-900 dark:text-slate-100 leading-tight">
              GOVERNMENT TOOL ROOM &amp; TRAINING CENTRE
            </h1>
            <p className="text-[10px] sm:text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wider">
              BELAGAVI - 590010
            </p>
            <div className="py-2">
              <span className="text-xs sm:text-base font-bold uppercase border-b border-black dark:border-slate-700 pb-0.5 px-4 tracking-widest">
                STATEMENT OF MARKS
              </span>
            </div>
            <h2 className="text-[11px] sm:text-sm font-bold tracking-wider text-slate-800 dark:text-slate-200 uppercase pt-1">
              DIPLOMA IN {result.departmentName.toUpperCase()}
            </h2>
          </div>

          {/* Metadata Table */}
          <div className="w-full overflow-x-auto scrollbar-thin dark:border-slate-800 print:overflow-visible mb-6">
            <table className="w-full min-w-[650px] sm:min-w-0 border-collapse border border-black dark:border-slate-700 text-[11px] sm:text-[13px]">
              <tbody>
                <tr className="border-b border-black dark:border-slate-700">
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40 w-[180px]">Student Name</td>
                  <td className="p-2 uppercase font-semibold text-slate-900 dark:text-slate-100" colSpan={3}>{result.studentName}</td>
                </tr>
                <tr className="border-b border-black dark:border-slate-700">
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40">Father Name</td>
                  <td className="p-2 uppercase font-semibold text-slate-900 dark:text-slate-100" colSpan={3}>{result.fatherName}</td>
                </tr>
                <tr className="border-b border-black dark:border-slate-700">
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40">Register Number</td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-mono font-bold w-[220px] text-slate-900 dark:text-slate-100">{result.regNo}</td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40 w-[120px]">Semester</td>
                  <td className="p-2 uppercase font-bold text-slate-800 dark:text-slate-200">{getSemesterWord(result.semester)}</td>
                </tr>
                <tr>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40">Exam</td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold uppercase text-slate-900 dark:text-slate-100">{result.examMonthYear}</td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40">Date</td>
                  <td className="p-2 font-mono text-slate-850 dark:text-slate-200">{result.dateOfIssue}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Evaluation Marks Table */}
          <div className="w-full overflow-x-auto scrollbar-thin dark:border-slate-800 print:overflow-visible mb-6">
            <table className="w-full min-w-[650px] sm:min-w-0 border-collapse border border-black dark:border-slate-700 text-[10px] sm:text-xs text-center">
              <thead>
                <tr className="border-b border-black dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="border-r border-black dark:border-slate-700 p-1 sm:p-2 w-10" rowSpan={2}>Sl. No.</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 sm:p-2 text-left" rowSpan={2}>Subject</th>
                  <th className="border-r border-black dark:border-slate-700 p-1" colSpan={3}>Maximum Marks</th>
                  <th className="border-r border-black dark:border-slate-700 p-1" colSpan={3}>Minimum Marks</th>
                  <th className="p-1" colSpan={3}>Marks Obtained</th>
                </tr>
                <tr className="border-b border-black dark:border-slate-700 bg-slate-50/20 dark:bg-slate-800/20 text-[9px] sm:text-[11px] font-bold">
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">IA</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">E</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">T</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">IA</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">E</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">T</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">IA</th>
                  <th className="border-r border-black dark:border-slate-700 p-1 w-8 sm:w-10">E</th>
                  <th className="p-1 w-8 sm:w-10">T</th>
                </tr>
              </thead>
              <tbody>
                {result.subjectResults.map((subject, index) => {
                  const {
                    maxIA, maxExam, maxTotal,
                    minIA, minExam, minTotal,
                    obtIA, obtExam, obtTotal
                  } = getMarksSplits(subject);
                  
                  return (
                    <tr key={subject.code} className="border-b border-black dark:border-slate-700 text-[10px] sm:text-xs hover:bg-slate-50/30 dark:hover:bg-slate-800/30">
                      <td className="border-r border-black dark:border-slate-700 p-2 text-slate-900 dark:text-slate-100">{index + 1}</td>
                      <td className="border-r border-black dark:border-slate-700 p-2 text-left font-medium uppercase leading-tight text-slate-900 dark:text-slate-100">
                        <span className="font-bold">{subject.title}</span>{" "}
                        <span className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 font-mono">({subject.code})</span>
                      </td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono text-slate-900 dark:text-slate-100">{maxIA}</td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono text-slate-900 dark:text-slate-100">{maxExam}</td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono text-slate-900 dark:text-slate-100">{maxTotal}</td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono text-slate-900 dark:text-slate-100">{minIA}</td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono text-slate-900 dark:text-slate-100">{minExam}</td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono text-slate-900 dark:text-slate-100">{minTotal}</td>
                      
                      {/* Marks Obtained section - Hide if withheld */}
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono font-semibold text-slate-900 dark:text-slate-100">
                        {result.resultStatus === "WITHHELD" ? "XX" : obtIA}
                      </td>
                      <td className="border-r border-black dark:border-slate-700 p-1.5 font-mono font-semibold text-slate-900 dark:text-slate-100">
                        {result.resultStatus === "WITHHELD" ? "XX" : obtExam}
                      </td>
                      <td className="p-1.5 font-mono font-bold text-slate-900 dark:text-slate-100">
                        {result.resultStatus === "WITHHELD" ? "XX" : obtTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Aggregates Summary Table */}
          <div className="w-full overflow-x-auto scrollbar-thin dark:border-slate-800 print:overflow-visible mb-8">
            <table className="w-full min-w-[650px] sm:min-w-0 border-collapse border border-black dark:border-slate-700 text-[11px] sm:text-[13px]">
              <tbody>
                <tr className="border-b border-black dark:border-slate-700">
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40 w-1/4">Grand Total</td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-mono font-bold w-1/4 text-left text-sm text-slate-900 dark:text-slate-100">
                    {result.resultStatus === "WITHHELD" ? "XX" : result.totalMarksObtained}
                  </td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40 w-1/4">Percentage</td>
                  <td className="p-2 font-mono font-bold w-1/4 text-left text-sm text-slate-900 dark:text-slate-100">
                    {result.resultStatus === "WITHHELD" ? "XX.XX%" : `${result.percentage}%`}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40">Result</td>
                  <td className={`border-r border-black dark:border-slate-700 p-2 font-bold text-left uppercase ${
                    result.resultStatus === "FAIL" ? "text-red-700 dark:text-red-400" : "text-slate-900 dark:text-slate-100"
                  }`}>
                    {result.resultStatus}
                  </td>
                  <td className="border-r border-black dark:border-slate-700 p-2 font-bold bg-slate-50/20 dark:bg-slate-800/40">Total in Words</td>
                  <td className="p-2 font-bold text-left uppercase text-[9px] sm:text-[11px] leading-tight text-slate-900 dark:text-slate-100">
                    {result.resultStatus === "WITHHELD" ? "WITHHELD" : `${numberToWords(result.totalMarksObtained)} Only`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signature blocks exactly matching the paper */}
          <div className="mt-20 flex flex-row justify-between items-end px-4 mb-4 gap-4 w-full">
            <div className="text-center w-1/2 max-w-[200px]">
              <div className="border-b border-black dark:border-slate-700 w-full mb-2"></div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">Checked By</span>
            </div>
            <div className="text-center w-1/2 max-w-[200px]">
              <div className="border-b border-black dark:border-slate-700 w-full mb-2"></div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Principal</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
