"use client";

import { Controller } from "react-hook-form";
import SectionCard from "../SectionCard";
import FieldWrapper from "../FieldWrapper";
import RadioPillGroup from "../RadioPillGroup";
import { inputClasses } from "../inputStyles";
import {
  BLOOD_GROUPS,
  GENDERS,
  GOVT_ID_TYPES,
  MARITAL_STATUS,
  PREFIXES,
  REGISTRATION_CATEGORIES,
} from "@/lib/data/hospitalData";
import { calculateAge, calculateDobFromAge } from "@/lib/schemas/patientRegistrationSchema";
import type { SectionProps } from "@/types/patient-registration";

export default function PatientIdentitySection({ register, errors, control, watch, setValue }: SectionProps) {
  const dob = watch("dob");
  const age = dob ? calculateAge(dob) : NaN;

  function handleAgeChange(value: string) {
    if (!value) {
      setValue("dob", "", { shouldValidate: true });
      return;
    }

    const enteredAge = Number(value);
    if (!Number.isInteger(enteredAge) || enteredAge < 0 || enteredAge > 120) return;

    setValue("dob", calculateDobFromAge(enteredAge), { shouldValidate: true });
  }

  return (
    <SectionCard number={1} title="PATIENT IDENTIFICATION & CORE DEMOGRAPHICS">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <FieldWrapper label="Patient Registration Category" required error={errors.registrationCategory?.message} className="lg:col-span-1">
          <select {...register("registrationCategory")} className={inputClasses(!!errors.registrationCategory)}>
            <option value="">Select category…</option>
            {REGISTRATION_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Prefix / Title" required error={errors.prefix?.message}>
          <select {...register("prefix")} className={inputClasses(!!errors.prefix)}>
            <option value="">Select…</option>
            {PREFIXES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="First Name" required error={errors.firstName?.message}>
          <input {...register("firstName")} placeholder="Rajesh" className={inputClasses(!!errors.firstName)} />
        </FieldWrapper>

        <FieldWrapper label="Middle & Last Name" error={errors.lastName?.message}>
          <input {...register("lastName")} placeholder="Kumar Sharma" className={inputClasses(!!errors.lastName)} />
        </FieldWrapper>

        <FieldWrapper label="Date of Birth" required error={errors.dob?.message}>
          <input type="date" {...register("dob")} className={inputClasses(!!errors.dob)} max={new Date().toISOString().slice(0, 10)} />
        </FieldWrapper>

        <FieldWrapper label="Age" hint="Enter age to calculate date of birth">
          <input
              type="number"
            min={0}
            max={120}
            step={1}
            value={Number.isFinite(age) ? age : ""}
            placeholder="Years"
            onChange={(event) => handleAgeChange(event.target.value)}
            className={inputClasses(false)}
          />
        </FieldWrapper>

        <FieldWrapper label="Gender" required error={errors.gender?.message} className="sm:col-span-1">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioPillGroup name="gender" options={GENDERS} value={field.value ?? ""} onChange={field.onChange} />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="Blood Group" error={errors.bloodGroup?.message}>
          <select {...register("bloodGroup")} className={inputClasses(!!errors.bloodGroup)}>
            <option value="">Unknown</option>
            {BLOOD_GROUPS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Mobile Number (SMS Alerts)" required error={errors.mobile?.message}>
          <div className="flex">
            <span className="flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-2 text-sm text-slate-500">+91</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              {...register("mobile")}
              placeholder="9876543210"
              className={`${inputClasses(!!errors.mobile)} rounded-l-none`}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper label="Email ID (E-Prescription)" error={errors.email?.message}>
          <input type="email" {...register("email")} placeholder="rajesh.sharma@example.com" className={inputClasses(!!errors.email)} />
        </FieldWrapper>

        <FieldWrapper label="Marital Status" error={errors.maritalStatus?.message}>
          <select {...register("maritalStatus")} className={inputClasses(!!errors.maritalStatus)}>
            <option value="">Select…</option>
            {MARITAL_STATUS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper label="Govt ID Proof" required error={errors.govtIdType?.message || errors.govtIdNumber?.message} className="sm:col-span-2">
          <div className="flex gap-2">
            <select {...register("govtIdType")} className={`${inputClasses(!!errors.govtIdType)} max-w-[9rem]`}>
              <option value="">Type…</option>
              {GOVT_ID_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              {...register("govtIdNumber")}
              placeholder="5482 9182 3341"
              className={inputClasses(!!errors.govtIdNumber)}
            />
          </div>
        </FieldWrapper>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 sm:flex-row sm:items-end sm:justify-between">
        <FieldWrapper
          label="ABHA (Ayushman Bharat Health Account) ID"
          error={errors.abhaAddress?.message}
          hint="Optional — format name@provider"
          className="w-full sm:max-w-sm"
        >
          <input {...register("abhaAddress")} placeholder="rajesh.sharma@abdm" className={inputClasses(!!errors.abhaAddress)} />
        </FieldWrapper>
        <button
          type="button"
          onClick={() => setValue("abhaAddress", watch("abhaAddress"))}
          className="h-9 whitespace-nowrap rounded-md border border-emerald-600 px-4 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
        >
          Link Records
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Occupation" error={errors.occupation?.message}>
          <input {...register("occupation")} placeholder="Software Engineer" className={inputClasses(!!errors.occupation)} />
        </FieldWrapper>
        <FieldWrapper label="Nationality" required error={errors.nationality?.message}>
          <input {...register("nationality")} placeholder="Indian" className={inputClasses(!!errors.nationality)} />
        </FieldWrapper>
      </div>
    </SectionCard>
  );
}
