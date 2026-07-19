export interface Course {
  code: string;
  title: string;
  maxMarks: number;
  minMarks: number;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  curriculum: {
    [semester: number]: Course[];
  };
}

export interface SubjectResult {
  code: string;
  title: string;
  maxMarks: number;
  minMarks: number;
  marksObtained: number; // Graded total
  marksIA: number;       // Internal Assessment marks
  marksExam: number;     // Examination marks
  grade: string;
  gradePoint: number;
  status: "PASS" | "FAIL";
  credits: number;
}

export interface StudentResult {
  regNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  departmentCode: string;
  departmentName: string;
  semester: number;
  centerName: string;
  scheme: string;
  examMonthYear: string;
  subjectResults: SubjectResult[];
  totalMaxMarks: number;
  totalMarksObtained: number;
  percentage: number;
  sgpa: number;
  cgpa: number;
  resultStatus: "PASS" | "FAIL" | "WITHHELD";
  classAwarded: string;
  enrollmentType: "Regular" | "Repeater";
  academicYear: string;
  dateOfIssue: string;
}
