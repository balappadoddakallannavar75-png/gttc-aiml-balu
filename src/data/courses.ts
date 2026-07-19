import { Course, Department } from "../types";

export const DEPARTMENTS: Department[] = [
  {
    id: "DAIML",
    code: "DAIML",
    name: "Diploma in Artificial Intelligence and Machine Learning",
    curriculum: {
      1: [
        { code: "20SC01T", title: "Engineering Mathematics-I", maxMarks: 100, minMarks: 35 },
        { code: "20EG01P", title: "Communication Skills & English", maxMarks: 100, minMarks: 35 },
        { code: "20CS11P", title: "Basics of Information Technology", maxMarks: 100, minMarks: 35 },
        { code: "20SC02T", title: "Applied Physics", maxMarks: 100, minMarks: 35 },
        { code: "20EE11P", title: "Basics of Electrical & Electronics Engineering", maxMarks: 100, minMarks: 35 },
        { code: "20AI11P", title: "Computing Workshop & OS", maxMarks: 100, minMarks: 35 }
      ],
      2: [
        { code: "20SC03T", title: "Engineering Mathematics-II", maxMarks: 100, minMarks: 35 },
        { code: "20AI21T", title: "Problem Solving using C", maxMarks: 100, minMarks: 35 },
        { code: "20AI22P", title: "Digital Electronics & Logic Design", maxMarks: 100, minMarks: 35 },
        { code: "20SC04T", title: "Applied Chemistry", maxMarks: 100, minMarks: 35 },
        { code: "20AI23P", title: "Web Technology Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AI24P", title: "C Programming Lab", maxMarks: 100, minMarks: 35 }
      ],
      3: [
        { code: "20AI31T", title: "Object Oriented Programming with Java", maxMarks: 100, minMarks: 35 },
        { code: "20AI32T", title: "Data Structures and Algorithms", maxMarks: 100, minMarks: 35 },
        { code: "20AI33T", title: "Database Management Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AI34T", title: "Operating Systems Foundations", maxMarks: 100, minMarks: 35 },
        { code: "20AI35P", title: "Java Development Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AI36P", title: "DBMS SQL Practical Lab", maxMarks: 100, minMarks: 35 }
      ],
      4: [
        { code: "20AI41T", title: "Introduction to Artificial Intelligence", maxMarks: 100, minMarks: 35 },
        { code: "20AI42T", title: "Machine Learning Algorithms-I", maxMarks: 100, minMarks: 35 },
        { code: "20AI43P", title: "Python Programming & Data Analytics", maxMarks: 100, minMarks: 35 },
        { code: "20AI44T", title: "Computer Networks & Security", maxMarks: 100, minMarks: 35 },
        { code: "20AI45P", title: "Python AI & ML Implementation Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AI46P", title: "Computer Networks Practical Lab", maxMarks: 100, minMarks: 35 }
      ],
      5: [
        { code: "20AI51T", title: "Deep Learning Foundations", maxMarks: 100, minMarks: 35 },
        { code: "20AI52T", title: "Natural Language Processing (NLP)", maxMarks: 100, minMarks: 35 },
        { code: "20AI53T", title: "Software Engineering & Agile", maxMarks: 100, minMarks: 35 },
        { code: "20AI54T", title: "Cloud Computing & DevOps", maxMarks: 100, minMarks: 35 },
        { code: "20AI55P", title: "Deep Learning & NLP Practical Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AI56P", title: "Project Work - Phase I", maxMarks: 100, minMarks: 35 }
      ],
      6: [
        { code: "20AI61T", title: "Computer Vision & Image Processing", maxMarks: 100, minMarks: 35 },
        { code: "20AI62T", title: "Generative AI & LLMs", maxMarks: 100, minMarks: 35 },
        { code: "20AI63T", title: "Internet of Things (IoT) in AI", maxMarks: 100, minMarks: 35 },
        { code: "20AI64T", title: "Professional Ethics & Indian Constitution", maxMarks: 100, minMarks: 35 },
        { code: "20AI65P", title: "Project Work - Phase II", maxMarks: 200, minMarks: 70 },
        { code: "20AI66P", title: "Technical Seminar & Portfolio Review", maxMarks: 100, minMarks: 35 }
      ]
    }
  },
  {
    id: "DTDM",
    code: "DTDM",
    name: "Diploma in Tool and Die Making",
    curriculum: {
      1: [
        { code: "20SC01T", title: "Engineering Mathematics-I", maxMarks: 100, minMarks: 35 },
        { code: "20ME11T", title: "Engineering Drawing-I", maxMarks: 100, minMarks: 35 },
        { code: "20TD11T", title: "Workshop Technology-I", maxMarks: 100, minMarks: 35 },
        { code: "20SC02T", title: "Applied Physics & Chemistry", maxMarks: 100, minMarks: 35 },
        { code: "20TD12P", title: "Fitting & Bench Work Practice", maxMarks: 100, minMarks: 35 },
        { code: "20TD13P", title: "Machining Workshop-I (Lathe, Shaper)", maxMarks: 100, minMarks: 35 }
      ],
      2: [
        { code: "20SC03T", title: "Engineering Mathematics-II", maxMarks: 100, minMarks: 35 },
        { code: "20ME21T", title: "Engineering Drawing-II & Projections", maxMarks: 100, minMarks: 35 },
        { code: "20TD21T", title: "Workshop Technology-II", maxMarks: 100, minMarks: 35 },
        { code: "20TD22T", title: "Material Science & Metallurgy", maxMarks: 100, minMarks: 35 },
        { code: "20TD23P", title: "Turning & Milling Workshop Practice", maxMarks: 100, minMarks: 35 },
        { code: "20TD24P", title: "Machining Practice-II", maxMarks: 100, minMarks: 35 }
      ],
      3: [
        { code: "20TD31T", title: "Tool & Die Making Theory-I", maxMarks: 100, minMarks: 35 },
        { code: "20ME31T", title: "Strength of Materials", maxMarks: 100, minMarks: 35 },
        { code: "20TD32P", title: "Computer Aided Drafting (CAD-2D)", maxMarks: 100, minMarks: 35 },
        { code: "20TD33T", title: "Metrology & Mechanical Measurements", maxMarks: 100, minMarks: 35 },
        { code: "20TD34P", title: "Tool Design Practice-I & Assembly", maxMarks: 100, minMarks: 35 },
        { code: "20TD35P", title: "Grinding and Finishing Operations", maxMarks: 100, minMarks: 35 }
      ],
      4: [
        { code: "20TD41T", title: "Tool & Die Making Theory-II", maxMarks: 100, minMarks: 35 },
        { code: "20TD42T", title: "Fluid Power Systems (Hydraulics & Pneumatics)", maxMarks: 100, minMarks: 35 },
        { code: "20ME41T", title: "Design of Machine Elements", maxMarks: 100, minMarks: 35 },
        { code: "20TD43P", title: "Advanced CAD Modeling (3D)", maxMarks: 100, minMarks: 35 },
        { code: "20TD44P", title: "CNC Programming & CNC Turning Lab", maxMarks: 100, minMarks: 35 },
        { code: "20TD45P", title: "Tool Design Practice-II", maxMarks: 100, minMarks: 35 }
      ],
      5: [
        { code: "20TD51T", title: "Design of Press Tools", maxMarks: 100, minMarks: 35 },
        { code: "20TD52T", title: "Design of Moulds & Castings", maxMarks: 100, minMarks: 35 },
        { code: "20TD53T", title: "Jigs & Fixtures Design Theory", maxMarks: 100, minMarks: 35 },
        { code: "20TD54P", title: "CNC Milling, Wire Cut & EDM", maxMarks: 100, minMarks: 35 },
        { code: "20TD55P", title: "Press Tool & Die Assembly Lab", maxMarks: 100, minMarks: 35 },
        { code: "20TD56P", title: "Project Work - Phase I", maxMarks: 100, minMarks: 35 }
      ],
      6: [
        { code: "20TD61T", title: "Industrial Automation & Robotics", maxMarks: 100, minMarks: 35 },
        { code: "20TD62T", title: "Advanced Design & Simulation (CAM/CAE)", maxMarks: 100, minMarks: 35 },
        { code: "20TD63T", title: "Estimation, Costing & Management", maxMarks: 100, minMarks: 35 },
        { code: "20TD64P", title: "Mould & Die Manufacturing Lab", maxMarks: 100, minMarks: 35 },
        { code: "20TD65P", title: "Project Work - Phase II", maxMarks: 200, minMarks: 70 },
        { code: "20TD66P", title: "Industrial Internship & Seminar", maxMarks: 100, minMarks: 35 }
      ]
    }
  },
  {
    id: "DAR",
    code: "DAR",
    name: "Diploma in Automation and Robotics",
    curriculum: {
      1: [
        { code: "20SC01T", title: "Engineering Mathematics-I", maxMarks: 100, minMarks: 35 },
        { code: "20AR11T", title: "Basics of Robotics & Automation", maxMarks: 100, minMarks: 35 },
        { code: "20AR12T", title: "Digital Logic Design", maxMarks: 100, minMarks: 35 },
        { code: "20SC02T", title: "Applied Physics", maxMarks: 100, minMarks: 35 },
        { code: "20AR13P", title: "Basic Electrical & Electronics Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AR14P", title: "Basic Mechanical & Assembly Workshop", maxMarks: 100, minMarks: 35 }
      ],
      2: [
        { code: "20SC03T", title: "Engineering Mathematics-II", maxMarks: 100, minMarks: 35 },
        { code: "20AR21T", title: "Electric Circuits & Networks", maxMarks: 100, minMarks: 35 },
        { code: "20AR22T", title: "Programming in C", maxMarks: 100, minMarks: 35 },
        { code: "20AR23T", title: "Electronic Devices and Circuits", maxMarks: 100, minMarks: 35 },
        { code: "20AR24P", title: "C Programming & Micro-Simulation Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AR25P", title: "Electronics Design & Soldering Lab", maxMarks: 100, minMarks: 35 }
      ],
      3: [
        { code: "20AR31T", title: "Microcontrollers & Applications", maxMarks: 100, minMarks: 35 },
        { code: "20AR32T", title: "Sensors & Signal Conditioning", maxMarks: 100, minMarks: 35 },
        { code: "20AR33T", title: "Actuators & Drive Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AR34T", title: "Linear Control Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AR35P", title: "Microcontroller Lab & Programming", maxMarks: 100, minMarks: 35 },
        { code: "20AR36P", title: "Sensors & Instrumentation Lab", maxMarks: 100, minMarks: 35 }
      ],
      4: [
        { code: "20AR41T", title: "Programmable Logic Controllers (PLC)", maxMarks: 100, minMarks: 35 },
        { code: "20AR42T", title: "Industrial Robotics Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AR43T", title: "Hydraulic & Pneumatic Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AR44T", title: "Embedded Linux & Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AR45P", title: "PLC Programming & Pneumatics Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AR46P", title: "Embedded & IoT Development Lab", maxMarks: 100, minMarks: 35 }
      ],
      5: [
        { code: "20AR51T", title: "Robotic Computer Vision Systems", maxMarks: 100, minMarks: 35 },
        { code: "20AR52T", title: "Distributed Control Systems (DCS)", maxMarks: 100, minMarks: 35 },
        { code: "20AR53T", title: "Industrial IoT (IIoT) & Networks", maxMarks: 100, minMarks: 35 },
        { code: "20AR54T", title: "Automation System Architecture & Design", maxMarks: 100, minMarks: 35 },
        { code: "20AR55P", title: "Robotic Arm Operation & ROS Lab", maxMarks: 100, minMarks: 35 },
        { code: "20AR56P", title: "Project Work - Phase I", maxMarks: 100, minMarks: 35 }
      ],
      6: [
        { code: "20AR61T", title: "Advanced Autonomous Robotics & AI", maxMarks: 100, minMarks: 35 },
        { code: "20AR62T", title: "Mechatronic Systems Integration & Design", maxMarks: 100, minMarks: 35 },
        { code: "20AR63T", title: "Industrial Engineering, Health & Safety", maxMarks: 100, minMarks: 35 },
        { code: "20AR64P", title: "Virtual Commissioning & Simulation", maxMarks: 100, minMarks: 35 },
        { code: "20AR65P", title: "Project Work - Phase II & Prototyping", maxMarks: 200, minMarks: 70 },
        { code: "20AR66P", title: "Technical Seminar & Comprehensive Viva", maxMarks: 100, minMarks: 35 }
      ]
    }
  },
  {
    id: "DPM",
    code: "DPM",
    name: "Diploma in Precision Manufacturing",
    curriculum: {
      1: [
        { code: "20SC01T", title: "Engineering Mathematics-I", maxMarks: 100, minMarks: 35 },
        { code: "20PM11T", title: "Engineering Graphics & Tolerancing", maxMarks: 100, minMarks: 35 },
        { code: "20PM12T", title: "Basics of Precision Manufacturing", maxMarks: 100, minMarks: 35 },
        { code: "20SC02T", title: "Applied Physics", maxMarks: 100, minMarks: 35 },
        { code: "20PM13P", title: "Precision Bench Work Workshop", maxMarks: 100, minMarks: 35 },
        { code: "20PM14P", title: "Basic Machine Tool Lab-I", maxMarks: 100, minMarks: 35 }
      ],
      2: [
        { code: "20SC03T", title: "Engineering Mathematics-II", maxMarks: 100, minMarks: 35 },
        { code: "20PM21T", title: "Manufacturing Science & Dynamics", maxMarks: 100, minMarks: 35 },
        { code: "20PM22T", title: "Dimensional Metrology & Quality", maxMarks: 100, minMarks: 35 },
        { code: "20PM23T", title: "Basic Metallurgy & Engineering Materials", maxMarks: 100, minMarks: 35 },
        { code: "20PM24P", title: "Advanced Lathe & Shaping Lab", maxMarks: 100, minMarks: 35 },
        { code: "20PM25P", title: "Metrology Laboratory & Calibration", maxMarks: 100, minMarks: 35 }
      ],
      3: [
        { code: "20PM31T", title: "Precision Machine Tool Engineering", maxMarks: 100, minMarks: 35 },
        { code: "20PM32T", title: "Computer Aided Design (CAD 3D)", maxMarks: 100, minMarks: 35 },
        { code: "20PM33T", title: "Quality Management Systems (ISO/AS)", maxMarks: 100, minMarks: 35 },
        { code: "20PM34T", title: "CNC Machine Technology", maxMarks: 100, minMarks: 35 },
        { code: "20PM35P", title: "CNC Turing Programming Lab", maxMarks: 100, minMarks: 35 },
        { code: "20PM36P", title: "Grinding and Super-finishing Practice", maxMarks: 100, minMarks: 35 }
      ],
      4: [
        { code: "20PM41T", title: "Non-Conventional Precision Machining", maxMarks: 100, minMarks: 35 },
        { code: "20PM42T", title: "Precision Jig, Fixture & Gauge Design", maxMarks: 100, minMarks: 35 },
        { code: "20PM43T", title: "Lean Manufacturing & Six Sigma Principles", maxMarks: 100, minMarks: 35 },
        { code: "20PM44P", title: "CNC Milling and Multi-Axis Machining Lab", maxMarks: 100, minMarks: 35 },
        { code: "20PM45P", title: "Precision Grinding & Geometry Finishing", maxMarks: 100, minMarks: 35 },
        { code: "20PM46P", title: "CMM Measurement & Laser Metrology Lab", maxMarks: 100, minMarks: 35 }
      ],
      5: [
        { code: "20PM51T", title: "Micro-Machining & Nano-Manufacturing Technologies", maxMarks: 100, minMarks: 35 },
        { code: "20PM52T", title: "Statistical Process Control (SPC)", maxMarks: 100, minMarks: 35 },
        { code: "20PM53T", title: "Computer Integrated Manufacturing (CIM)", maxMarks: 100, minMarks: 35 },
        { code: "20PM54T", title: "Additive Manufacturing & 3D Printing", maxMarks: 100, minMarks: 35 },
        { code: "20PM55P", title: "Advanced Precision Systems & Robotics", maxMarks: 100, minMarks: 35 },
        { code: "20PM56P", title: "Project Work - Phase I", maxMarks: 100, minMarks: 35 }
      ],
      6: [
        { code: "20PM61T", title: "Smart Manufacturing & Industry 4.0", maxMarks: 100, minMarks: 35 },
        { code: "20PM62T", title: "Precision Assembly & Alignment Engineering", maxMarks: 100, minMarks: 35 },
        { code: "20PM63T", title: "Operations Planning & Resource Optimization", maxMarks: 100, minMarks: 35 },
        { code: "20PM64P", title: "Industrial Automation and PLC Controls", maxMarks: 100, minMarks: 35 },
        { code: "20PM65P", title: "Project Work - Phase II & Testing", maxMarks: 200, minMarks: 70 },
        { code: "20PM66P", title: "Comprehensive Seminar & Internship viva", maxMarks: 100, minMarks: 35 }
      ]
    }
  }
];
