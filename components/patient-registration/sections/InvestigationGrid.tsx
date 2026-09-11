"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent, RowDragEndEvent, SelectionChangedEvent } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";

import type { Investigation } from "@/lib/data/hospitalData";

ModuleRegistry.registerModules([AllCommunityModule]);

type InvestigationGridProps = {
  [key: string]: unknown;
  data: Investigation[];
  selectedCodes: string[];
  onSelectionChange: (codes: string[]) => void;
};

const hmsTheme = themeQuartz.withParams({
  accentColor: "#059669",
  backgroundColor: "#ffffff",
  foregroundColor: "#0f172a",
  borderColor: "#cbd5e1",
  headerBackgroundColor: "#ffffff",
  headerTextColor: "#0f172a",
  rowHoverColor: "#f8fafc",
  selectedRowBackgroundColor: "#ecfdf5",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: 12,
  rowHeight: "36px",
  headerHeight: "32px",
  wrapperBorderRadius: "6px",
});

export default function InvestigationGrid({ data, selectedCodes, onSelectionChange }: InvestigationGridProps) {
  const [query, setQuery] = useState("");
  const [shownCount, setShownCount] = useState(data.length);
  const [rowOrder, setRowOrder] = useState(data);
  const gridApi = useRef<GridApi<Investigation> | null>(null);
  const syncingSelection = useRef(false);

  const columnDefs = useMemo<ColDef<Investigation>[]>(
    () => [
      {
        field: "name",
        headerName: "Investigation",
        rowDrag: true,
        flex: 2,
        minWidth: 260,
        cellRenderer: (params: { data: Investigation }) => (
          <div className="py-1">
            <p className="font-medium text-slate-800">{params.data.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">{params.data.code}</p>
          </div>
        ),
      },
      { field: "category", headerName: "Category", flex: 1, minWidth: 130 },
      { field: "turnaroundTime", headerName: "TAT", width: 110 },
      {
        field: "fee",
        headerName: "Fee",
        width: 110,
        type: "numericColumn",
        valueFormatter: (params) => `₹${Number(params.value).toFixed(2)}`,
      },
    ],
    []
  );

  useEffect(() => {
    if (!gridApi.current) return;
    syncingSelection.current = true;
    gridApi.current.forEachNode((node) => {
      node.setSelected(Boolean(node.data && selectedCodes.includes(node.data.code)));
    });
    syncingSelection.current = false;
  }, [selectedCodes]);

  const handleGridReady = (event: GridReadyEvent<Investigation>) => {
    gridApi.current = event.api;
    event.api.forEachNode((node) => {
      node.setSelected(Boolean(node.data && selectedCodes.includes(node.data.code)));
    });
  };

  const handleSelectionChanged = (event: SelectionChangedEvent<Investigation>) => {
    if (!syncingSelection.current) onSelectionChange(event.api.getSelectedRows().map((row) => row.code));
  };

  const handleRowDragEnd = (event: RowDragEndEvent<Investigation>) => {
    const nextOrder: Investigation[] = [];
    event.api.forEachNode((node) => {
      if (node.data) nextOrder.push(node.data);
    });
    setRowOrder(nextOrder);
  };

  return (
    <div className="overflow-hidden rounded-md border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 p-3">
        <p className="text-xs text-slate-500">
          {selectedCodes.length} selected <span className="text-slate-300">·</span> {shownCount} shown
        </p>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search investigations</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search investigations…"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>
      </div>
      <div className="hms-investigation-grid h-[280px] w-full">
        <AgGridReact<Investigation>
           theme={hmsTheme}
          rowData={rowOrder}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, resizable: true, suppressHeaderMenuButton: true }}
          rowSelection={{ mode: "multiRow", checkboxes: true, headerCheckbox: true }}
          getRowId={(params) => params.data.code}
          quickFilterText={query}
          rowDragManaged
          rowDragEntireRow
          animateRows
          onGridReady={handleGridReady}
          onSelectionChanged={handleSelectionChanged}
          onRowDragEnd={handleRowDragEnd}
          onModelUpdated={(event) => setShownCount(event.api.getDisplayedRowCount())}
          overlayNoRowsTemplate="No investigations match your search."
        />
      </div>
      <p className="border-t border-slate-100 bg-white px-3 py-2 text-[11px] text-slate-400">
        Drag the handle beside an investigation to reorder rows. Drag column headers to rearrange columns.
      </p>
    </div>
  );
}
