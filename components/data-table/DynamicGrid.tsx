"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef, type ReactElement, type RefAttributes } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, RowDragModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule, RowDragModule]);

export type DynamicGridProps<T extends Record<string, unknown>> = Omit<
  GridOptions<T>,
  "rowData" | "columnDefs" | "defaultColDef" | "getRowId" | "onGridReady"
> & {
  data: T[];
  columnDefs?: ColDef<T>[];
  getRowId?: GridOptions<T>["getRowId"];
  onGridReady?: (event: GridReadyEvent<T>) => void;
  onExportToPdf?: (api: GridApi<T>) => void;
};

export type DynamicGridRef = {
  exportToPdf: () => void;
};

export function generateColumnDefs<T extends Record<string, unknown>>(data: T[]): ColDef<T>[] {
  const keys = Array.from(new Set(data.flatMap((row) => Object.keys(row))));

  return keys.map((key) => ({
    field: key as ColDef<T>["field"],
    headerName: key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (character) => character.toUpperCase()),
    sortable: true,
    resizable: true,
    flex: 1,
    minWidth: 120,
  }));
}

function DynamicGridInner<T extends Record<string, unknown>>({
  data,
  columnDefs: configuredColumnDefs,
  getRowId,
  onGridReady,
  onExportToPdf,
  ...gridProps
}: DynamicGridProps<T>, ref: React.ForwardedRef<DynamicGridRef>) {
  const gridApiRef = useRef<GridApi<T> | null>(null);
  const columnDefs = useMemo<ColDef<T>[]>(
    () => configuredColumnDefs ?? generateColumnDefs(data),
    [configuredColumnDefs, data]
  );

  const defaultColDef = useMemo<ColDef<T>>(
    () => ({
      sortable: true,
      resizable: true,
      suppressHeaderMenuButton: true,
    }),
    []
  );

  const handleGridReady = (event: GridReadyEvent<T>) => {
    gridApiRef.current = event.api;
    onGridReady?.(event);
  };

  useImperativeHandle(
    ref,
    () => ({
      exportToPdf: () => {
        if (gridApiRef.current) onExportToPdf?.(gridApiRef.current);
      },
    }),
    [onExportToPdf]
  );

  return (
    <AgGridReact<T>
      rowData={data}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      getRowId={getRowId}
      onGridReady={handleGridReady}
      suppressDragLeaveHidesColumns
      suppressMovableColumns={false}
      animateRows
      {...gridProps}
    />
  );
}

type DynamicGridComponent = <T extends Record<string, unknown>>(
  props: DynamicGridProps<T> & RefAttributes<DynamicGridRef>
) => ReactElement | null;

const DynamicGrid = forwardRef(DynamicGridInner) as DynamicGridComponent;

export default DynamicGrid;