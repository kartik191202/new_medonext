"use client";

import { Controller } from "react-hook-form";
import SectionCard from "../SectionCard";
import FieldWrapper from "../FieldWrapper";
import { inputClasses } from "../inputStyles";
import { DEPARTMENTS, INVESTIGATIONS, PAYMENT_MODES, REGISTRATION_CATEGORIES } from "@/lib/data/hospitalData";
import type { SectionProps } from "@/types/patient-registration";

export default function PaymentSection({ register, errors, control, watch }: SectionProps) {
  const categoryValue = watch("registrationCategory");
  const departmentValue = watch("department");
  const doctorValue = watch("doctor");
  const investigationValues = watch("investigations") ?? [];
  const paymentMode = watch("paymentMode");

  const regFee = REGISTRATION_CATEGORIES.find((c) => c.value === categoryValue)?.regFee ?? 0;
  const doctorFee =
    DEPARTMENTS.find((d) => d.value === departmentValue)?.doctors.find((d) => d.name === doctorValue)
      ?.consultationFee ?? 0;
  const assignedInvestigations = investigationValues
    .map((assignment) => INVESTIGATIONS.find((investigation) => investigation.code === assignment.code))
    .filter((investigation): investigation is (typeof INVESTIGATIONS)[number] => Boolean(investigation));
  const investigationTotal = assignedInvestigations.reduce((sum, investigation) => sum + investigation.fee, 0);
  const total = regFee + doctorFee + investigationTotal;

  return (
    <SectionCard number={4} title="OPD TARIFF, INSURANCE / TPA & PAYMENT FEE COLLECTION">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-md border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2 font-medium">Service / Item</th>
                  <th className="px-3 py-2 font-medium text-right">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-3 py-2 text-slate-700">Hospital OPD Registration Fee</td>
                  <td className="px-3 py-2 text-right text-slate-700">₹{regFee.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-slate-700">
                    {doctorValue ? `Consultation — ${doctorValue}` : "Consultation fee (select doctor above)"}
                  </td>
                  <td className="px-3 py-2 text-right text-slate-700">₹{doctorFee.toFixed(2)}</td>
                </tr>
                {assignedInvestigations.map((s, index) => (
                  <tr key={s.code}>
                    <td className="px-3 py-2 text-slate-700">
                      <span className="mr-2 text-xs text-slate-400">{index + 1}.</span>{s.name}
                      {investigationValues[index]?.remark && <span className="mt-0.5 block pl-5 text-xs text-slate-400">Remark: {investigationValues[index].remark}</span>}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">₹{s.fee.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-slate-400">Investigation charges are linked to the assignment section. Tax / GST: Exempted (Medical Services)</p>
        </div>

        <div className="rounded-md border border-slate-800 bg-slate-900 p-4 text-white">
          <p className="text-xs uppercase tracking-wide text-slate-400">Total Receivable Fee</p>
          <p className="mb-4 text-2xl font-semibold text-emerald-400">₹{total.toFixed(2)}</p>

          <FieldWrapper label="Select Payment Mode" required error={errors.paymentMode?.message}>
            <Controller
              name="paymentMode"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_MODES.map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => field.onChange(mode)}
                      className={`rounded-md border px-2 py-2 text-xs font-medium transition-colors ${
                        field.value === mode
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                          : "border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            />
          </FieldWrapper>

          {paymentMode && paymentMode !== "Cash" && (
            <FieldWrapper label="Transaction Ref / Txn ID" required error={errors.transactionRef?.message} className="mt-3">
              <input
                {...register("transactionRef")}
                placeholder="UPI-PAY-9821039281"
                className={`${inputClasses(!!errors.transactionRef)} bg-slate-800 text-white placeholder:text-slate-500`}
              />
            </FieldWrapper>
          )}

          <FieldWrapper label="Discount Remarks / Auth" error={errors.discountRemarks?.message} className="mt-3">
            <input
              {...register("discountRemarks")}
              placeholder="N/A"
              className={`${inputClasses(!!errors.discountRemarks)} bg-slate-800 text-white placeholder:text-slate-500`}
            />
          </FieldWrapper>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-300">
            <input type="checkbox" {...register("autoPrint")} className="h-4 w-4 accent-emerald-500" />
            Auto-print OPD Slip &amp; Barcode Sticker upon Submit
          </label>
        </div>
      </div>
    </SectionCard>
  );
}
