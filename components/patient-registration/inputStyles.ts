export const baseInputClasses =
  "w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/40 disabled:bg-slate-100 disabled:text-slate-400";

export function inputClasses(hasError: boolean) {
  return `${baseInputClasses} ${
    hasError
      ? "border-rose-400 focus:border-rose-500"
      : "border-slate-300 focus:border-emerald-500"
  }`;
}

export const labelClasses = "mb-1 block text-xs font-medium text-slate-600";
export const helperClasses = "mt-1 text-xs text-slate-400";
export const errorClasses = "mt-1 text-xs font-medium text-rose-600";
