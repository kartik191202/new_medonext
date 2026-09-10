"use client";

import SectionCard from "../SectionCard";
import FieldWrapper from "../FieldWrapper";
import { inputClasses } from "../inputStyles";
import { INDIAN_STATES, RELATIONSHIPS } from "@/lib/data/hospitalData";
import type { SectionProps } from "@/types/patient-registration";

export default function AddressKinSection({ register, errors }: SectionProps) {
  return (
    <SectionCard number={2} title="RESIDENTIAL ADDRESS & NEXT-OF-KIN (EMERGENCY CONTACT)">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FieldWrapper label="Residential Address (Street / Flat No / Landmark)" required error={errors.address?.message} className="lg:col-span-2">
          <input {...register("address")} placeholder="Flat 402, Green Valley Heights, MG Road Sector 14" className={inputClasses(!!errors.address)} />
        </FieldWrapper>
        <FieldWrapper label="City / District" required error={errors.city?.message}>
          <input {...register("city")} placeholder="Bengaluru" className={inputClasses(!!errors.city)} />
        </FieldWrapper>

        <FieldWrapper label="State / Union Territory" required error={errors.state?.message}>
          <select {...register("state")} className={inputClasses(!!errors.state)}>
            <option value="">Select…</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="PIN Code / Postal Code" required error={errors.pincode?.message}>
          <input inputMode="numeric" maxLength={6} {...register("pincode")} placeholder="560001" className={inputClasses(!!errors.pincode)} />
        </FieldWrapper>
        <FieldWrapper label="Country" required error={errors.country?.message}>
          <input {...register("country")} placeholder="India" className={inputClasses(!!errors.country)} />
        </FieldWrapper>

        <FieldWrapper label="Emergency Contact Person Name" required error={errors.emergencyContactName?.message}>
          <input {...register("emergencyContactName")} placeholder="Sunita Sharma" className={inputClasses(!!errors.emergencyContactName)} />
        </FieldWrapper>
        <FieldWrapper label="Relationship" required error={errors.relationship?.message}>
          <select {...register("relationship")} className={inputClasses(!!errors.relationship)}>
            <option value="">Select…</option>
            {RELATIONSHIPS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Emergency Contact Mobile" required error={errors.emergencyContactMobile?.message}>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            {...register("emergencyContactMobile")}
            placeholder="9811223344"
            className={inputClasses(!!errors.emergencyContactMobile)}
          />
        </FieldWrapper>
      </div>
    </SectionCard>
  );
}
