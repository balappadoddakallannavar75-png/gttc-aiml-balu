import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

import { DAIML_STUDENTS } from "./src/data/daiml_students";
import { DAR_STUDENTS } from "./src/data/dar_students";
import { DPM_STUDENTS } from "./src/data/dpm_students";
import { DTDM_STUDENTS } from "./src/data/dtdm_students";

const app = express();
const PORT = 3000;

app.use(express.json());

// Full-stack API to get student results
app.get("/api/student", (req, res) => {
  const { dept, sem, reg } = req.query;

  if (!dept || !sem || !reg) {
    return res.status(400).json({ error: "Missing required parameters: dept, sem, reg" });
  }

  const cleanDept = String(dept).trim().toUpperCase();
  const cleanReg = String(reg).trim().toUpperCase().replace(/\s/g, "");
  const semNum = Number(sem);

  if (isNaN(semNum)) {
    return res.status(400).json({ error: "Invalid Semester format." });
  }

  // Choose the database based on selected department
  let database: any[] = [];
  if (cleanDept === "DAIML") database = DAIML_STUDENTS;
  else if (cleanDept === "DAR") database = DAR_STUDENTS;
  else if (cleanDept === "DPM") database = DPM_STUDENTS;
  else if (cleanDept === "DTDM" || cleanDept === "DDTM") database = DTDM_STUDENTS;

  // Search strictly inside the selected department's database
  const foundRecord = database.find(
    (student) =>
      student.regNo.trim().toUpperCase() === cleanReg &&
      Number(student.semester) === semNum
  );

  if (foundRecord) {
    return res.json(foundRecord);
  }

  // Not found
  return res.status(404).json({
    error: "Result not found. Please check your Department, Semester and Registration Number."
  });
});

// Serve frontend assets via Vite middleware in dev, static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
