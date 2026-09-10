"use client";

import { Controller } from "react-hook-form";
import SectionCard from "../SectionCard";
import FieldWrapper from "../FieldWrapper";
import RadioPillGroup from "../RadioPillGroup";
import { inputClasses } from "../inputStyles";
import { DEPARTMENTS, TRIAGE_LEVELS, VISIT_TYPES } from "@/lib/data/hospitalData";
import type { SectionProps } from "@/types/patient-registration";

export default function DoctorAssignmentSection({ register, errors, control, watch, setValue }: SectionProps) {
  const departmentValue = watch("department");
  const selectedDepartment = DEPARTMENTS.find((d) => d.value === departmentValue);

  return (
    <SectionCard number={3} title="OPD DEPARTMENT, CLINIC & DOCTOR ASSIGNMENT">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FieldWrapper label="Medical Department" required error={errors.department?.message}>
          <select
            {...register("department", {
              onChange: () => {
                setValue("clinicRoom", "");
                setValue("doctor", "");
              },
            })}
            className={inputClasses(!!errors.department)}
          >
            <option value="">Select department…</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Clinic Unit / Room No." required error={errors.clinicRoom?.message}>
          <select {...register("clinicRoom")} disabled={!selectedDepartment} className={inputClasses(!!errors.clinicRoom)}>
            <option value="">{selectedDepartment ? "Select room…" : "Select department first"}</option>
            {selectedDepartment?.rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Attending Consultant Doctor" required error={errors.doctor?.message}>
          <select {...register("doctor")} disabled={!selectedDepartment} className={inputClasses(!!errors.doctor)}>
            <option value="">{selectedDepartment ? "Select doctor…" : "Select department first"}</option>
            {selectedDepartment?.doctors.map((doc) => (
              <option key={doc.name} value={doc.name}>
                {doc.name} ({doc.qualification}) — ₹{doc.consultationFee}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Visit Category / Type" required error={errors.visitType?.message}>
          <select {...register("visitType")} className={inputClasses(!!errors.visitType)}>
            <option value="">Select…</option>
            {VISIT_TYPES.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Patient Fast-Track / Triage Level" className="mt-4">
        <Controller
          name="triageLevel"
          control={control}
          render={({ field }) => (
            <RadioPillGroup name="triageLevel" options={TRIAGE_LEVELS} value={field.value} onChange={field.onChange} />
          )}
        />
      </FieldWrapper>
    </SectionCard>
  );
}
