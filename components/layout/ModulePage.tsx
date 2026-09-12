import type { ModuleConfig } from "@/lib/data/prototypeModules";
import DynamicGrid from "@/components/data-table/DynamicGrid";
import type { ColDef } from "ag-grid-community";

const toneClasses: Record<NonNullable<import("@/lib/data/prototypeModules").StatCard["tone"]>, string> = {
  default: "text-slate-800",
  positive: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600",
};

export default function ModulePage({
  config,
  useGrid = false,
  enableRowDrag = false,
}: {
  config: ModuleConfig;
  useGrid?: boolean;
  enableRowDrag?: boolean;
}) {
  const gridColumnDefs: ColDef<Record<string, string>>[] = config.columns.map((column, index) => ({
    field: column.key,
    headerName: column.label,
    minWidth: 140,
    flex: 1,
    ...(enableRowDrag && index === 0 ? { rowDrag: true } : {}),
  }));

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">{config.title}</h1>
            <p className="text-xs text-slate-400">{config.subtitle}</p>
          </div>
          <button
            type="button"
            className="rounded-md bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            title="This is a UI prototype — no data is created."
          >
            {config.primaryAction}
          </button>
        </header>

        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {config.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-400">{stat.label}</p>
              <p className={`mt-1 text-xl font-semibold ${toneClasses[stat.tone ?? "default"]}`}>{stat.value}</p>
              {stat.hint && <p className="mt-0.5 text-[11px] text-slate-400">{stat.hint}</p>}
            </div>
          ))}
        </div>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {useGrid ? (
            <div className="h-[360px] w-full">
              <DynamicGrid<Record<string, string>>
                data={config.rows}
                columnDefs={gridColumnDefs}
                rowDragManaged={enableRowDrag}
                rowDragEntireRow={enableRowDrag}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    {config.columns.map((col) => (
                      <th key={col.key} className="whitespace-nowrap px-4 py-2.5 font-medium">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {config.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      {config.columns.map((col) => (
                        <td key={col.key} className="whitespace-nowrap px-4 py-2.5 text-slate-700">
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-400">
            {useGrid
              ? "Dynamic grid view — sortable and resizable columns."
              : "Prototype view — showing sample data. Wire this table up to your API to make it live."}
          </p>
        </section>
      </div>
    </main>
  );
}
