"use client";

import SectionCard from "../SectionCard";
import FieldWrapper from "../FieldWrapper";
import { inputClasses } from "../inputStyles";
import type { SectionProps } from "@/types/patient-registration";

export default function TriageVitalsSection({ register, errors }: SectionProps) {
  return (
    <SectionCard
      number={3}
      title="TRIAGE VITALS & CHIEF COMPLAINTS (OPTIONAL DESKTOP VITALS ENTRY)"
      badge={
        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-600">
          ⚠ Casualty Red Triage Alert System Active
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <FieldWrapper label="Blood Pressure" error={errors.bloodPressure?.message} hint="mmHg">
          <input {...register("bloodPressure")} placeholder="120/80" className={inputClasses(!!errors.bloodPressure)} />
        </FieldWrapper>
        <FieldWrapper label="Pulse / Heart Rate" error={errors.pulse?.message} hint="bpm">
          <input type="number" {...register("pulse")} placeholder="78" className={inputClasses(!!errors.pulse)} />
        </FieldWrapper>
        <FieldWrapper label="Oxygen SpO2" error={errors.spo2?.message} hint="%">
          <input type="number" {...register("spo2")} placeholder="99" className={inputClasses(!!errors.spo2)} />
        </FieldWrapper>
        <FieldWrapper label="Body Temp" error={errors.bodyTemp?.message} hint="°F">
          <input type="number" step="0.1" {...register("bodyTemp")} placeholder="98.6" className={inputClasses(!!errors.bodyTemp)} />
        </FieldWrapper>
        <FieldWrapper label="Weight" error={errors.weight?.message} hint="kg">
          <input type="number" {...register("weight")} placeholder="72" className={inputClasses(!!errors.weight)} />
        </FieldWrapper>
        <FieldWrapper label="Height" error={errors.height?.message} hint="cm">
          <input type="number" {...register("height")} placeholder="175" className={inputClasses(!!errors.height)} />
        </FieldWrapper>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="RBS Glucose" error={errors.rbsGlucose?.message} hint="mg/dL">
          <input type="number" {...register("rbsGlucose")} placeholder="110" className={inputClasses(!!errors.rbsGlucose)} />
        </FieldWrapper>
        <FieldWrapper label="Chief Complaint / Reason for Visit" required error={errors.chiefComplaint?.message}>
          <input
            {...register("chiefComplaint")}
            placeholder="Chest tightness, mild shortness of breath during exertion for past 2 days"
            className={inputClasses(!!errors.chiefComplaint)}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper
        label="Known Drug Allergies / Warnings"
        error={errors.allergies?.message}
        hint="Leave blank if none known"
        className="mt-4"
      >
        <input
          {...register("allergies")}
          placeholder="Penicillin (Severe Rash), NSAIDs Aspirin"
          className={`${inputClasses(!!errors.allergies)} border-rose-200 bg-rose-50/40`}
        />
      </FieldWrapper>
    </SectionCard>
  );
}
