import { ReactNode } from "react";

type SectionCardProps = {
  number: number;
  title: string;
  badge?: ReactNode;
  children: ReactNode;
};

export default function SectionCard({ number, title, badge, children }: SectionCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
            {number}
          </span>
          <h2 className="text-sm font-semibold tracking-wide text-slate-700">{title}</h2>
        </div>
        {badge}
      </div>
      {children}
    </section>
  );
}
