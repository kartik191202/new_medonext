import PatientRegistrationForm from "@/components/patient-registration/PatientRegistrationForm";

export const metadata = {
  title: "OPD Patient Registration",
  description: "Outpatient registration form for Medonext Healthcare Enterprise HMS",
};

export default function PatientRegistrationPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-8">
      <PatientRegistrationForm />
    </main>
  );
}
