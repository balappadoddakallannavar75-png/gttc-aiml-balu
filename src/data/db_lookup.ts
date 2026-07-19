import { StudentResult } from "../types";

export async function lookupStudentResult(
  regNo: string,
  deptCode: string,
  semester: number
): Promise<StudentResult | null> {
  const cleanRegNo = regNo.trim().toUpperCase().replace(/\s/g, "");
  const cleanDeptCode = deptCode.trim().toUpperCase();

  try {
    const response = await fetch(`/api/student?dept=${encodeURIComponent(cleanDeptCode)}&sem=${semester}&reg=${encodeURIComponent(cleanRegNo)}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data as StudentResult;
  } catch (err) {
    console.error("API Lookup error:", err);
    return null;
  }
}
