export type StatCard = { label: string; value: string; hint?: string; tone?: "default" | "positive" | "warning" | "danger" };
export type TableColumn = { key: string; label: string };
export type ModuleConfig = {
  title: string;
  subtitle: string;
  primaryAction: string;
  stats: StatCard[];
  columns: TableColumn[];
  rows: Record<string, string>[];
};

export const PATIENT_QUEUE: ModuleConfig = {
  title: "Patient Queue & Tokens",
  subtitle: "Live token board across all OPD counters · Auto-refreshing",
  primaryAction: "Call Next Token",
  stats: [
    { label: "Patients Waiting", value: "142", hint: "Across 18 doctors on duty" },
    { label: "Avg. Wait Time", value: "22 min", tone: "warning" },
    { label: "Tokens Served Today", value: "381", tone: "positive" },
    { label: "Priority / Fast-Track", value: "9", tone: "danger" },
  ],
  columns: [
    { key: "token", label: "Token #" },
    { key: "patient", label: "Patient" },
    { key: "dept", label: "Department" },
    { key: "doctor", label: "Doctor" },
    { key: "wait", label: "Wait Time" },
    { key: "status", label: "Status" },
  ],
  rows: [
    { token: "#084", patient: "Rajesh Kumar Sharma", dept: "Cardiology", doctor: "Dr. Vikramaditya Rao", wait: "25 min", status: "In Queue" },
    { token: "#085", patient: "Ananya Iyer", dept: "General Medicine", doctor: "Dr. Arvind Mehta", wait: "12 min", status: "In Queue" },
    { token: "#086", patient: "Mohit Verma", dept: "Orthopedics", doctor: "Dr. Rohit Bhandari", wait: "8 min", status: "Called" },
    { token: "#087", patient: "Fatima Sheikh", dept: "Pediatrics", doctor: "Dr. Priya Nair", wait: "—", status: "With Doctor" },
    { token: "#088", patient: "Karan Malhotra", dept: "Cardiology", doctor: "Dr. Neha Kulkarni", wait: "31 min", status: "In Queue" },
    { token: "#089", patient: "Aarav Mehta", dept: "General Medicine", doctor: "Dr. Suresh Patel", wait: "18 min", status: "In Queue" },
    { token: "#090", patient: "Priya Sharma", dept: "Gynecology", doctor: "Dr. Kavita Joshi", wait: "22 min", status: "In Queue" },
    { token: "#091", patient: "Rahul Singh", dept: "Cardiology", doctor: "Dr. Amit Deshmukh", wait: "5 min", status: "Called" },
    { token: "#092", patient: "Sneha Kapoor", dept: "Dermatology", doctor: "Dr. Ritu Malhotra", wait: "—", status: "With Doctor" },
    { token: "#093", patient: "Vivek Choudhary", dept: "Orthopedics", doctor: "Dr. Manish Sharma", wait: "35 min", status: "In Queue" },
    { token: "#094", patient: "Neha Agarwal", dept: "Pediatrics", doctor: "Dr. Anjali Verma", wait: "14 min", status: "In Queue" },
    { token: "#095", patient: "Rohan Gupta", dept: "ENT", doctor: "Dr. Rajiv Khanna", wait: "9 min", status: "Called" },
    { token: "#096", patient: "Pooja Yadav", dept: "General Medicine", doctor: "Dr. Nitin Jain", wait: "—", status: "With Doctor" },
    { token: "#097", patient: "Aditya Joshi", dept: "Neurology", doctor: "Dr. Sameer Kulkarni", wait: "42 min", status: "In Queue" },
    { token: "#098", patient: "Kavya Nair", dept: "Cardiology", doctor: "Dr. Meera Iyer", wait: "27 min", status: "In Queue" },
    { token: "#099", patient: "Manish Verma", dept: "Urology", doctor: "Dr. Deepak Rao", wait: "11 min", status: "Called" },
    { token: "#100", patient: "Isha Malhotra", dept: "Ophthalmology", doctor: "Dr. Sunita Kapoor", wait: "—", status: "With Doctor" },
    { token: "#101", patient: "Akash Mishra", dept: "Orthopedics", doctor: "Dr. Rakesh Bansal", wait: "29 min", status: "In Queue" },
    { token: "#102", patient: "Nisha Patel", dept: "Pediatrics", doctor: "Dr. Priyanka Shah", wait: "16 min", status: "In Queue" },
    { token: "#103", patient: "Sanjay Kumar", dept: "General Medicine", doctor: "Dr. Arvind Mehta", wait: "7 min", status: "Called" },
    { token: "#104", patient: "Divya Reddy", dept: "Gynecology", doctor: "Dr. Swati Rao", wait: "—", status: "With Doctor" },
    { token: "#105", patient: "Harsh Vardhan", dept: "Cardiology", doctor: "Dr. Vikram Singh", wait: "38 min", status: "In Queue" },
    { token: "#106", patient: "Simran Kaur", dept: "Dermatology", doctor: "Dr. Pooja Bhatia", wait: "20 min", status: "In Queue" },
    { token: "#107", patient: "Abhishek Tiwari", dept: "ENT", doctor: "Dr. Ashok Kumar", wait: "6 min", status: "Called" },
    { token: "#108", patient: "Riya Saxena", dept: "Neurology", doctor: "Dr. Anupam Gupta", wait: "—", status: "With Doctor" },
    { token: "#109", patient: "Varun Malhotra", dept: "Urology", doctor: "Dr. Sanjay Mehra", wait: "33 min", status: "In Queue" },
    { token: "#110", patient: "Aditi Sharma", dept: "Ophthalmology", doctor: "Dr. Neelam Joshi", wait: "15 min", status: "In Queue" },
    { token: "#111", patient: "Naveen Yadav", dept: "Orthopedics", doctor: "Dr. Rohit Bhandari", wait: "4 min", status: "Called" },
    { token: "#112", patient: "Shreya Iyer", dept: "Pediatrics", doctor: "Dr. Priya Nair", wait: "—", status: "With Doctor" },
    { token: "#113", patient: "Deepak Sharma", dept: "General Medicine", doctor: "Dr. Suresh Patel", wait: "26 min", status: "In Queue" },
    { token: "#114", patient: "Tanvi Mehta", dept: "Cardiology", doctor: "Dr. Neha Kulkarni", wait: "19 min", status: "In Queue" },
    { token: "#115", patient: "Gaurav Singh", dept: "ENT", doctor: "Dr. Rajiv Khanna", wait: "10 min", status: "Called" },
    { token: "#116", patient: "Muskan Verma", dept: "Gynecology", doctor: "Dr. Kavita Joshi", wait: "—", status: "With Doctor" },
    { token: "#117", patient: "Yash Thakur", dept: "Neurology", doctor: "Dr. Sameer Kulkarni", wait: "44 min", status: "In Queue" },
    { token: "#118", patient: "Pallavi Jain", dept: "Dermatology", doctor: "Dr. Ritu Malhotra", wait: "21 min", status: "In Queue" },
    { token: "#119", patient: "Rajat Gupta", dept: "Urology", doctor: "Dr. Deepak Rao", wait: "3 min", status: "Called" },
    { token: "#120", patient: "Anjali Sharma", dept: "Ophthalmology", doctor: "Dr. Sunita Kapoor", wait: "—", status: "With Doctor" },
    { token: "#121", patient: "Kunal Agarwal", dept: "Orthopedics", doctor: "Dr. Manish Sharma", wait: "32 min", status: "In Queue" },
    { token: "#122", patient: "Sakshi Patel", dept: "Pediatrics", doctor: "Dr. Anjali Verma", wait: "13 min", status: "In Queue" },
    { token: "#123", patient: "Rohit Chawla", dept: "General Medicine", doctor: "Dr. Nitin Jain", wait: "8 min", status: "Called" },
    { token: "#124", patient: "Mansi Shah", dept: "Cardiology", doctor: "Dr. Amit Deshmukh", wait: "—", status: "With Doctor" },
    { token: "#125", patient: "Aman Khan", dept: "ENT", doctor: "Dr. Ashok Kumar", wait: "37 min", status: "In Queue" },
    { token: "#126", patient: "Poonam Sethi", dept: "Gynecology", doctor: "Dr. Swati Rao", wait: "24 min", status: "In Queue" },
    { token: "#127", patient: "Vikas Tiwari", dept: "Neurology", doctor: "Dr. Anupam Gupta", wait: "5 min", status: "Called" },
    { token: "#128", patient: "Rashmi Reddy", dept: "Dermatology", doctor: "Dr. Pooja Bhatia", wait: "—", status: "With Doctor" },
    { token: "#129", patient: "Siddharth Jain", dept: "Urology", doctor: "Dr. Sanjay Mehra", wait: "28 min", status: "In Queue" },
    { token: "#130", patient: "Komal Joshi", dept: "Ophthalmology", doctor: "Dr. Neelam Joshi", wait: "17 min", status: "In Queue" },
    { token: "#131", patient: "Tarun Bansal", dept: "Orthopedics", doctor: "Dr. Rakesh Bansal", wait: "12 min", status: "Called" },
    { token: "#132", patient: "Shalini Kapoor", dept: "Pediatrics", doctor: "Dr. Priyanka Shah", wait: "—", status: "With Doctor" },
    { token: "#133", patient: "Pranav Mehta", dept: "Cardiology", doctor: "Dr. Vikram Singh", wait: "41 min", status: "In Queue" },
    { token: "#134", patient: "Nandini Rao", dept: "General Medicine", doctor: "Dr. Arvind Mehta", wait: "23 min", status: "In Queue" },
    { token: "#135", patient: "Saurabh Mishra", dept: "ENT", doctor: "Dr. Rajiv Khanna", wait: "2 min", status: "Called" },
    { token: "#136", patient: "Priti Yadav", dept: "Gynecology", doctor: "Dr. Kavita Joshi", wait: "—", status: "With Doctor" },
    { token: "#137", patient: "Arjun Malhotra", dept: "Neurology", doctor: "Dr. Sameer Kulkarni", wait: "36 min", status: "In Queue" },
    { token: "#138", patient: "Payal Verma", dept: "Dermatology", doctor: "Dr. Ritu Malhotra", wait: "18 min", status: "In Queue" },
    { token: "#139", patient: "Nikhil Sharma", dept: "Urology", doctor: "Dr. Deepak Rao", wait: "9 min", status: "Called" },
    { token: "#140", patient: "Ayesha Khan", dept: "Ophthalmology", doctor: "Dr. Sunita Kapoor", wait: "—", status: "With Doctor" },
    { token: "#141", patient: "Ravi Shukla", dept: "Orthopedics", doctor: "Dr. Rohit Bhandari", wait: "30 min", status: "In Queue" },
    { token: "#142", patient: "Megha Singh", dept: "Pediatrics", doctor: "Dr. Priya Nair", wait: "11 min", status: "In Queue" },
    { token: "#143", patient: "Chetan Patel", dept: "General Medicine", doctor: "Dr. Suresh Patel", wait: "6 min", status: "Called" },
    { token: "#144", patient: "Juhi Agarwal", dept: "Cardiology", doctor: "Dr. Neha Kulkarni", wait: "—", status: "With Doctor" },
    { token: "#145", patient: "Ashish Kumar", dept: "ENT", doctor: "Dr. Ashok Kumar", wait: "34 min", status: "In Queue" },
    { token: "#146", patient: "Garima Jain", dept: "Gynecology", doctor: "Dr. Swati Rao", wait: "20 min", status: "In Queue" },
    { token: "#147", patient: "Rakesh Verma", dept: "Neurology", doctor: "Dr. Anupam Gupta", wait: "7 min", status: "Called" },
    { token: "#148", patient: "Sonali Mehta", dept: "Dermatology", doctor: "Dr. Pooja Bhatia", wait: "—", status: "With Doctor" },
    { token: "#149", patient: "Lokesh Sharma", dept: "Urology", doctor: "Dr. Sanjay Mehra", wait: "39 min", status: "In Queue" },
    { token: "#150", patient: "Preeti Nair", dept: "Ophthalmology", doctor: "Dr. Neelam Joshi", wait: "16 min", status: "In Queue" },
  ],
};

export const APPOINTMENTS: ModuleConfig = {
  title: "Appointments Desk",
  subtitle: "Today's scheduled OPD appointments across all departments",
  primaryAction: "Book Appointment",
  stats: [
    { label: "Today's Appointments", value: "96" },
    { label: "Confirmed", value: "71", tone: "positive" },
    { label: "Pending Confirmation", value: "18", tone: "warning" },
    { label: "No-shows", value: "7", tone: "danger" },
  ],
  columns: [
    { key: "time", label: "Time" },
    { key: "patient", label: "Patient" },
    { key: "dept", label: "Department" },
    { key: "doctor", label: "Doctor" },
    { key: "status", label: "Status" },
  ],
  rows: [
    { time: "09:00 AM", patient: "Sunita Sharma", dept: "General Medicine", doctor: "Dr. Sana Sheikh", status: "Confirmed" },
    { time: "09:30 AM", patient: "Deepak Rao", dept: "Cardiology", doctor: "Dr. Vikramaditya Rao", status: "Confirmed" },
    { time: "10:00 AM", patient: "Meera Pillai", dept: "Pediatrics", doctor: "Dr. Priya Nair", status: "Pending" },
    { time: "10:15 AM", patient: "Arjun Nair", dept: "Orthopedics", doctor: "Dr. Rohit Bhandari", status: "Confirmed" },
    { time: "11:00 AM", patient: "Kavya Reddy", dept: "Cardiology", doctor: "Dr. Neha Kulkarni", status: "Pending" },
  ],
};

export const DOCTOR_ROSTER: ModuleConfig = {
  title: "Doctor Roster & Clinics",
  subtitle: "On-duty consultants, clinic rooms, and shift timings",
  primaryAction: "Edit Roster",
  stats: [
    { label: "Doctors On Duty", value: "18" },
    { label: "Departments Active", value: "4" },
    { label: "Clinic Rooms Open", value: "12" },
    { label: "On Leave Today", value: "2", tone: "warning" },
  ],
  columns: [
    { key: "doctor", label: "Doctor" },
    { key: "dept", label: "Department" },
    { key: "room", label: "Room" },
    { key: "shift", label: "Shift" },
    { key: "status", label: "Status" },
  ],
  rows: [
    { doctor: "Dr. Vikramaditya Rao", dept: "Cardiology", room: "OPD-204", shift: "9:00 AM – 5:00 PM", status: "Available" },
    { doctor: "Dr. Neha Kulkarni", dept: "Cardiology", room: "OPD-201", shift: "10:00 AM – 6:00 PM", status: "Available" },
    { doctor: "Dr. Arvind Mehta", dept: "General Medicine", room: "OPD-101", shift: "9:00 AM – 3:00 PM", status: "In Consultation" },
    { doctor: "Dr. Rohit Bhandari", dept: "Orthopedics", room: "OPD-301", shift: "11:00 AM – 7:00 PM", status: "Available" },
    { doctor: "Dr. Priya Nair", dept: "Pediatrics", room: "OPD-110", shift: "9:00 AM – 1:00 PM", status: "On Leave" },
  ],
};

export const OPD_BILLING: ModuleConfig = {
  title: "OPD Billing & Counter",
  subtitle: "Fee collection ledger for today's OPD registrations",
  primaryAction: "New Bill",
  stats: [
    { label: "Collected Today", value: "₹1,84,600", tone: "positive" },
    { label: "Pending Payments", value: "₹12,300", tone: "warning" },
    { label: "Transactions", value: "231" },
    { label: "Refunds Issued", value: "3", tone: "danger" },
  ],
  columns: [
    { key: "receipt", label: "Receipt #" },
    { key: "patient", label: "Patient" },
    { key: "amount", label: "Amount" },
    { key: "mode", label: "Mode" },
    { key: "status", label: "Status" },
  ],
  rows: [
    { receipt: "OP-BILL-8841", patient: "Rajesh Kumar Sharma", amount: "₹1,200.00", mode: "UPI / QR", status: "Paid" },
    { receipt: "OP-BILL-8842", patient: "Ananya Iyer", amount: "₹500.00", mode: "Cash", status: "Paid" },
    { receipt: "OP-BILL-8843", patient: "Mohit Verma", amount: "₹700.00", mode: "Card / POS", status: "Paid" },
    { receipt: "OP-BILL-8844", patient: "Fatima Sheikh", amount: "₹600.00", mode: "Insurance / TPA", status: "Pending" },
    { receipt: "OP-BILL-8845", patient: "Karan Malhotra", amount: "₹800.00", mode: "UPI / QR", status: "Paid" },
  ],
};

export const INSURANCE_TPA: ModuleConfig = {
  title: "Insurance / TPA Desk",
  subtitle: "Cashless approvals and TPA claim status tracking",
  primaryAction: "New Pre-Authorization",
  stats: [
    { label: "Active Claims", value: "27" },
    { label: "Approved", value: "19", tone: "positive" },
    { label: "Awaiting Approval", value: "6", tone: "warning" },
    { label: "Rejected", value: "2", tone: "danger" },
  ],
  columns: [
    { key: "claim", label: "Claim #" },
    { key: "patient", label: "Patient" },
    { key: "insurer", label: "Insurer / TPA" },
    { key: "amount", label: "Claim Amount" },
    { key: "status", label: "Status" },
  ],
  rows: [
    { claim: "TPA-22841", patient: "Suresh Iyengar", insurer: "Star Health", amount: "₹18,500", status: "Approved" },
    { claim: "TPA-22842", patient: "Neha Kapoor", insurer: "ICICI Lombard", amount: "₹9,200", status: "Awaiting Approval" },
    { claim: "TPA-22843", patient: "Aditya Ghosh", insurer: "MediAssist", amount: "₹4,600", status: "Approved" },
    { claim: "TPA-22844", patient: "Priyanka Das", insurer: "HDFC Ergo", amount: "₹22,000", status: "Rejected" },
  ],
};

export const TRIAGE_VITALS: ModuleConfig = {
  title: "Triage & Emergency Vitals",
  subtitle: "Casualty and red-flag triage board · Priority patients first",
  primaryAction: "Log Emergency Vitals",
  stats: [
    { label: "Red Triage Alerts", value: "1", tone: "danger" },
    { label: "Yellow / Urgent", value: "4", tone: "warning" },
    { label: "Green / Stable", value: "31", tone: "positive" },
    { label: "Casualty Beds Free", value: "6" },
  ],
  columns: [
    { key: "patient", label: "Patient" },
    { key: "complaint", label: "Chief Complaint" },
    { key: "bp", label: "BP" },
    { key: "spo2", label: "SpO2" },
    { key: "level", label: "Triage Level" },
  ],
  rows: [
    { patient: "Rajesh Kumar Sharma", complaint: "Chest tightness, shortness of breath", bp: "120/80", spo2: "99%", level: "Priority Fast-Track" },
    { patient: "Vinod Chauhan", complaint: "Severe abdominal pain", bp: "138/92", spo2: "97%", level: "Yellow / Urgent" },
    { patient: "Anjali Bose", complaint: "Fever, mild cough", bp: "118/76", spo2: "98%", level: "Green / Stable" },
    { patient: "Imran Qureshi", complaint: "Fall injury, ankle swelling", bp: "126/84", spo2: "98%", level: "Green / Stable" },
  ],
};

export const OPD_AUDIT_REPORTS: ModuleConfig = {
  title: "OPD Audit & Reports",
  subtitle: "Compliance snapshots and daily OPD operational reports",
  primaryAction: "Export Report",
  stats: [
    { label: "Registrations Today", value: "381" },
    { label: "HIPAA/NABH Flags", value: "0", tone: "positive" },
    { label: "Draft / Held Forms", value: "5", tone: "warning" },
    { label: "Avg. Registration Time", value: "3.2 min" },
  ],
  columns: [
    { key: "report", label: "Report" },
    { key: "period", label: "Period" },
    { key: "generated", label: "Generated" },
    { key: "status", label: "Status" },
  ],
  rows: [
    { report: "Daily OPD Registration Summary", period: "19 Aug 2026", generated: "19-Aug-2026 20:00", status: "Ready" },
    { report: "Department-wise Footfall", period: "Aug 2026 (MTD)", generated: "19-Aug-2026 20:00", status: "Ready" },
    { report: "Fee Collection Reconciliation", period: "19 Aug 2026", generated: "19-Aug-2026 20:05", status: "Ready" },
    { report: "NABH Compliance Audit Trail", period: "Q3 2026", generated: "—", status: "Scheduled" },
  ],
};
