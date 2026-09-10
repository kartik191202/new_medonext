"use client";

import { useMemo, useState, type ReactNode } from "react";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  accessor?: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  selectable?: boolean;
  selectedRowIds?: string[];
  onSelectionChange?: (rowIds: string[]) => void;
  searchPlaceholder?: string;
  searchText?: (row: T) => string;
  emptyMessage?: string;
};

export default function DataTable<T>({
  data,
  columns,
  getRowId,
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  searchPlaceholder = "Search…",
  searchText = (row) => Object.values(row as Record<string, unknown>).join(" "),
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRows = useMemo(
    () => data.filter((row) => !normalizedQuery || searchText(row).toLowerCase().includes(normalizedQuery)),
    [data, normalizedQuery, searchText]
  );
  const filteredIds = filteredRows.map(getRowId);
  const allVisibleSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedRowIds.includes(id));

  const updateSelection = (rowId: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...selectedRowIds, rowId]))
      : selectedRowIds.filter((id) => id !== rowId);
    onSelectionChange?.(next);
  };

  const toggleVisibleRows = () => {
    if (allVisibleSelected) {
      onSelectionChange?.(selectedRowIds.filter((id) => !filteredIds.includes(id)));
      return;
    }
    onSelectionChange?.(Array.from(new Set([...selectedRowIds, ...filteredIds])));
  };

  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 p-3">
        <p className="text-xs text-slate-500">
          {selectedRowIds.length} selected <span className="text-slate-300">·</span> {filteredRows.length} shown
        </p>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search table</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-wide text-slate-500">
            <tr className="border-b border-slate-200">
              {selectable && (
                <th className="w-10 px-3 py-2" scope="col">
                  <input
                    type="checkbox"
                    aria-label="Select all visible rows"
                    checked={allVisibleSelected}
                    onChange={toggleVisibleRows}
                    className="h-4 w-4 accent-emerald-600"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.id} className={`px-3 py-2 font-medium ${column.className ?? ""}`} scope="col">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRows.map((row) => {
              const rowId = getRowId(row);
              const selected = selectedRowIds.includes(rowId);
              return (
                <tr key={rowId} className={selected ? "bg-emerald-50/60" : "hover:bg-slate-50"}>
                  {selectable && (
                    <td className="px-3 py-3 align-top">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${rowId}`}
                        checked={selected}
                        onChange={(event) => updateSelection(rowId, event.target.checked)}
                        className="h-4 w-4 accent-emerald-600"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.id} className={`px-3 py-3 align-top text-slate-700 ${column.className ?? ""}`}>
                      {column.accessor ? column.accessor(row) : null}
                    </td>
                  ))}
                </tr>
              );
            })}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-3 py-8 text-center text-sm text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
