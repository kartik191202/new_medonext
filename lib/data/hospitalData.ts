// Static reference data for the OPD registration form.
// In a real system this would come from an API / database.

export const REGISTRATION_CATEGORIES = [
  { value: "general", label: "General Outpatient (Standard Fee)", regFee: 100 },
  { value: "senior", label: "Senior Citizen (Concession Fee)", regFee: 50 },
  { value: "emergency", label: "Emergency / Casualty", regFee: 0 },
  { value: "followup", label: "Follow-up Visit (Within 7 Days)", regFee: 0 },
] as const;

export const PREFIXES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Master", "Miss"] as const;

export const GENDERS = ["Male", "Female", "Other"] as const;

export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
] as const;

export const MARITAL_STATUS = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Prefer not to say",
] as const;

export const GOVT_ID_TYPES = ["Aadhaar", "Passport", "Voter ID", "PAN"] as const;

export const RELATIONSHIPS = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Guardian",
  "Friend",
  "Other",
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "West Bengal",
] as const;

export const TRIAGE_LEVELS = ["Normal", "Senior Citizen", "Priority Fast-Track"] as const;

export const PAYMENT_MODES = ["UPI / QR", "Cash", "Card / POS"] as const;

export type Department = {
  value: string;
  label: string;
  rooms: string[];
  doctors: { name: string; qualification: string; consultationFee: number }[];
};

export const DEPARTMENTS: Department[] = [
  {
    value: "cardiology",
    label: "Cardiology (OPD Block B)",
    rooms: ["OPD-Room 201 (Cardio Unit)", "OPD-Room 204 (Cardio Unit)"],
    doctors: [
      { name: "Dr. Vikramaditya Rao", qualification: "MD, DM Cardio", consultationFee: 800 },
      { name: "Dr. Neha Kulkarni", qualification: "MD, DNB Cardio", consultationFee: 700 },
    ],
  },
  {
    value: "general-medicine",
    label: "General Medicine (OPD Block A)",
    rooms: ["OPD-Room 101", "OPD-Room 102"],
    doctors: [
      { name: "Dr. Arvind Mehta", qualification: "MBBS, MD", consultationFee: 500 },
      { name: "Dr. Sana Sheikh", qualification: "MBBS, DNB", consultationFee: 450 },
    ],
  },
  {
    value: "orthopedics",
    label: "Orthopedics (OPD Block C)",
    rooms: ["OPD-Room 301", "OPD-Room 305"],
    doctors: [
      { name: "Dr. Rohit Bhandari", qualification: "MS Ortho", consultationFee: 700 },
    ],
  },
  {
    value: "pediatrics",
    label: "Pediatrics (OPD Block A)",
    rooms: ["OPD-Room 110"],
    doctors: [
      { name: "Dr. Priya Nair", qualification: "MD Pediatrics", consultationFee: 600 },
    ],
  },
];

export const VISIT_TYPES = [
  { value: "new", label: "New Consultation (First Visit)" },
  { value: "review", label: "Review / Follow-up Visit" },
  { value: "second-opinion", label: "Second Opinion" },
] as const;

export type Investigation = {
  code: string;
  name: string;
  category: "Laboratory" | "Radiology" | "Cardiology";
  turnaroundTime: string;
  fee: number;
};

export const INVESTIGATIONS: Investigation[] = [
  { code: "LAB-CBC-01", name: "Complete Blood Count (CBC)", category: "Laboratory", turnaroundTime: "4 hrs", fee: 250 },
  { code: "LAB-LFT-01", name: "Liver Function Test (LFT)", category: "Laboratory", turnaroundTime: "6 hrs", fee: 650 },
  { code: "LAB-RFT-01", name: "Renal Function Test (RFT)", category: "Laboratory", turnaroundTime: "6 hrs", fee: 550 },
  { code: "RAD-XRAY-01", name: "X-Ray Chest (Single View)", category: "Radiology", turnaroundTime: "2 hrs", fee: 400 },
  { code: "RAD-USG-01", name: "Ultrasound Whole Abdomen", category: "Radiology", turnaroundTime: "1 day", fee: 1200 },
  { code: "CAR-ECG-01", name: "12-Lead ECG Screening", category: "Cardiology", turnaroundTime: "30 mins", fee: 350 },
];
