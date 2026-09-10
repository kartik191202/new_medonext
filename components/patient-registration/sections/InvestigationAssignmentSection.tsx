"use client";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import DataTable, { type DataTableColumn } from "@/components/data-table/DataTable";
import SectionCard from "../SectionCard";
import { INVESTIGATIONS, type Investigation } from "@/lib/data/hospitalData";
import { inputClasses } from "../inputStyles";
import type { SectionProps } from "@/types/patient-registration";

const investigationColumns: DataTableColumn<Investigation>[] = [
  {
    id: "investigation",
    header: "Investigation",
    accessor: (item) => (
      <div>
        <p className="font-medium text-slate-800">{item.name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{item.code}</p>
      </div>
    ),
  },
  { id: "category", header: "Category", accessor: (item) => item.category },
  { id: "turnaround", header: "TAT", accessor: (item) => item.turnaroundTime },
  { id: "fee", header: "Fee", accessor: (item) => `₹${item.fee.toFixed(2)}`, className: "text-right" },
];

export default function InvestigationAssignmentSection({ control, register }: SectionProps) {
  const { fields, append, remove, move } = useFieldArray({ control, name: "investigations" });
  const selectedCodes = fields.map((field) => field.code);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleSelectionChange = (codes: string[]) => {
    const addedCodes = codes.filter((code) => !selectedCodes.includes(code));
    const removedCodes = selectedCodes.filter((code) => !codes.includes(code));

    addedCodes.forEach((code) => append({ code, remark: "" }));
    [...removedCodes]
      .map((code) => fields.findIndex((field) => field.code === code))
      .filter((index) => index >= 0)
      .sort((a, b) => b - a)
      .forEach((index) => remove(index));
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    move(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  return (
    <SectionCard
      number={4}
      title="INVESTIGATION ASSIGNMENT"
      badge={<span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{fields.length} assigned</span>}
    >
      <p className="mb-3 text-xs text-slate-500">Select one or more investigations to assign to this patient. Search by name, code, or category.</p>
      <DataTable
        data={INVESTIGATIONS}
        columns={investigationColumns}
        getRowId={(item) => item.code}
        selectable
        selectedRowIds={selectedCodes}
        onSelectionChange={handleSelectionChange}
        searchPlaceholder="Search investigations…"
        searchText={(item) => `${item.code} ${item.name} ${item.category}`}
        emptyMessage="No investigations match your search."
      />

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600">Assigned investigations</h3>
            <p className="mt-1 text-xs text-slate-400">Drag rows to set execution order. Remarks are printed on the investigation request.</p>
          </div>
          {fields.length > 0 && <span className="text-xs text-slate-400">{fields.length} request{fields.length === 1 ? "" : "s"}</span>}
        </div>

        {fields.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="w-12 px-3 py-2 font-medium">Order</th>
                  <th className="px-3 py-2 font-medium">Investigation</th>
                  <th className="w-[45%] px-3 py-2 font-medium">Remark for lab / radiology</th>
                  <th className="w-20 px-3 py-2 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fields.map((field, index) => {
                  const investigation = INVESTIGATIONS.find((item) => item.code === field.code);
                  if (!investigation) return null;
                  return (
                    <tr
                      key={field.id}
                      draggable
                      onDragStart={() => setDraggedIndex(index)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => handleDrop(index)}
                      className={draggedIndex === index ? "bg-emerald-50 opacity-60" : "bg-white hover:bg-slate-50"}
                    >
                      <td className="px-3 py-3 align-top">
                        <button
                          type="button"
                          aria-label={`Drag ${investigation.name}`}
                          className="cursor-grab rounded px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          title="Drag to reorder"
                        >
                          ⋮⋮ <span className="sr-only">Drag</span>
                        </button>
                        <span className="ml-1 text-xs text-slate-400">{index + 1}</span>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <p className="font-medium text-slate-800">{investigation.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{investigation.code} · {investigation.category} · ₹{investigation.fee.toFixed(2)}</p>
                      </td>
                      <td className="px-3 py-3 align-top">
                        <input
                          {...register(`investigations.${index}.remark` as const)}
                          placeholder="e.g. Fasting sample; rule out anemia"
                          className={inputClasses(false)}
                        />
                      </td>
                      <td className="px-3 py-3 text-right align-top">
                        <button type="button" onClick={() => remove(index)} className="text-xs font-medium text-rose-600 hover:text-rose-700">
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-400">
            No investigations assigned yet. Select investigations above to add them to the request.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
