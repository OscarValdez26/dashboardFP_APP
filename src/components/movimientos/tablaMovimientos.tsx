import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import * as xlsx from "xlsx";
import { fechaHora, fechaHoraCorta } from "@/helpers/formatoFecha";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { Spinner } from "../ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function TablaMovimientos<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const exportToExcel = () => {
    setLoading(true);
    const rows = table.getFilteredRowModel().rows.map((row) => ({
      Cuenta: row.original.cuenta,
      Tipo: row.original.tipoMovimiento,
      Categoría: row.original.categoriaMovimiento,
      Descripción: row.original.descripcionMovimiento,
      Cantidad: formatoDivisa(row.original.cantidadMovimiento),
      Fecha: fechaHora(row.original.fechaMovimiento),
    }));

    const worksheet = xlsx.utils.json_to_sheet(rows);

    const workbook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workbook, worksheet, "Movimientos");

    xlsx.writeFile(
      workbook,
      `movimientos_${fechaHoraCorta(new Date().toISOString())}.xlsx`,
    );
    setLoading(false);
  };

  // const isMobile = useMobile();

  return (
    <div className="p-4">
      <div className="flex flex-col items-end py-4 w-full h-130">
        <div className="flex gap-4 p-4">
          {data.length > 10 && (
            <Input
              placeholder="Buscar..."
              value={
                (table
                  .getColumn("descripcionMovimiento")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("descripcionMovimiento")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-3xs"
            />
          )}
          {data.length > 0 && (
            <Button variant="outline" onClick={exportToExcel}>
              {loading && <Spinner data-icon="inline-start" />}
              {loading ? "Generando" : "Exportar Excel"}
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 10 && (
        <div className="flex items-center justify-end gap-4 px-4 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}

export default TablaMovimientos;
