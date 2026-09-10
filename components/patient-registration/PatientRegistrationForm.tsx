"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  patientRegistrationSchema,
  type PatientRegistrationFormOutput,
  type PatientRegistrationFormValues,
} from "@/lib/schemas/patientRegistrationSchema";
import PatientIdentitySection from "./sections/PatientIdentitySection";
import AddressKinSection from "./sections/AddressKinSection";
import DoctorAssignmentSection from "./sections/DoctorAssignmentSection";
import InvestigationAssignmentSection from "./sections/InvestigationAssignmentSection";
import PaymentSection from "./sections/PaymentSection";

const defaultValues: PatientRegistrationFormValues = {
  registrationCategory: "",
  prefix: "" as PatientRegistrationFormValues["prefix"],
  firstName: "",
  lastName: "",
   dob: "",
  gender: "" as PatientRegistrationFormValues["gender"],
  bloodGroup: "",
  mobile: "",
  email: "",
  maritalStatus: "",
  govtIdType: "" as PatientRegistrationFormValues["govtIdType"],
  govtIdNumber: "",
  abhaAddress: "",
  occupation: "",
  nationality: "Indian",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  emergencyContactName: "",
  relationship: "" as PatientRegistrationFormValues["relationship"],
  emergencyContactMobile: "",
  bloodPressure: "",
  pulse: undefined,
  spo2: undefined,
  bodyTemp: undefined,
  weight: undefined,
  height: undefined,
  rbsGlucose: undefined,
  chiefComplaint: "",
  allergies: "",
  department: "",
  clinicRoom: "",
  doctor: "",
  visitType: "" as PatientRegistrationFormValues["visitType"],
  triageLevel: "Normal",
  investigations: [],
  paymentMode: "" as PatientRegistrationFormValues["paymentMode"],
  transactionRef: "",
  discountRemarks: "",
  autoPrint: true,
};

function generateUHID() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `UHID-${year}-${new Date().getMonth() + 1}${new Date().getDate()}-${rand}`;
}

export default function PatientRegistrationForm() {
  const [submittedUhid, setSubmittedUhid] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visitTimestamp = useMemo(
    () =>
      new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PatientRegistrationFormValues, unknown, PatientRegistrationFormOutput>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: PatientRegistrationFormOutput) => {
    setIsSubmitting(true);
    try {
      // Replace with a real API call, e.g.:
      // await fetch("/api/patient-registration", { method: "POST", body: JSON.stringify(data) });
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("Patient registration submitted:", data);
      setSubmittedUhid(generateUHID());
    } finally {
      setIsSubmitting(false);
    }
  };

  const onReset = () => {
    reset(defaultValues);
    setSubmittedUhid(null);
  };

  if (submittedUhid) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-sm font-medium text-emerald-700">✓ OPD Registration Complete</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-800">{submittedUhid}</h2>
        <p className="mt-1 text-sm text-slate-500">Registered on {visitTimestamp} IST</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-md bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Register Another Patient
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-6xl">
      <header className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-slate-800">Outpatient (OPD) Registration</h1>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                ● Live Registration Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">Enterprise Multi-Speciality Clinic Portal · Standard Operating Procedure (SOP-OPD-012)</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Scan Aadhaar / ABHA QR
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Reset Form (Esc)
            </button>
            <button type="button" className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100">
              Hold / Draft (F2)
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSubmitting ? "Registering…" : "✓ Register & Collect Fee (Ctrl+Enter)"}
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>
            Auto-Generated UHID: <strong className="text-slate-700">Assigned on submit</strong>
          </span>
          <span>Visit Date &amp; Time: {visitTimestamp} IST</span>
        </div>
      </header>

      <div className="space-y-4">
        <PatientIdentitySection register={register} errors={errors} control={control} watch={watch} setValue={setValue} />
        <AddressKinSection register={register} errors={errors} control={control} watch={watch} setValue={setValue} />
        {/* <TriageVitalsSection register={register} errors={errors} control={control} watch={watch} setValue={setValue} /> */}
        <DoctorAssignmentSection register={register} errors={errors} control={control} watch={watch} setValue={setValue} />
        <InvestigationAssignmentSection register={register} errors={errors} control={control} watch={watch} setValue={setValue} />
        <PaymentSection register={register} errors={errors} control={control} watch={watch} setValue={setValue} />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
        >
          {isSubmitting ? "Registering…" : "Complete OPD Registration & Print Card"}
        </button>
      </div>
    </form>
  );
}
