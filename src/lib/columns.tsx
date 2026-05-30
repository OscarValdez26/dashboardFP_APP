import ButtonSort from "@/components/generic/buttonSort";
import { Badge } from "@/components/ui/badge";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { fechaHora } from "@/helpers/formatoFecha";
import type { ColumnDef } from "@tanstack/react-table";

type DatosTablaType = {
  cuenta: string;
  tipoMovimiento: string;
  categoriaMovimiento: string;
  descripcionMovimiento: string;
  cantidadMovimiento: string;
  fechaMovimiento: string;
  color?: string;
};

export const columnas: ColumnDef<DatosTablaType>[] = [
  {
    accessorKey: "cuenta",
    header: ({ column }) => {
      return (
        <ButtonSort
          texto="Cuenta"
          click={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue("cuenta")}</div>;
    },
  },
  {
    accessorKey: "tipoMovimiento",
    header: ({ column }) => {
      return (
        <ButtonSort
          texto="Tipo"
          click={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Badge className={row.original.color}>
          {row.getValue("tipoMovimiento")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "categoriaMovimiento",
    header: ({ column }) => {
      return (
        <ButtonSort
          texto="Categoría"
          click={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">{row.getValue("categoriaMovimiento")}</div>
      );
    },
  },
  {
    accessorKey: "descripcionMovimiento",
    header: () => <div className="text-center">Descripción</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.getValue("descripcionMovimiento")}
        </div>
      );
    },
  },
  {
    accessorKey: "cantidadMovimiento",
    header: ({ column }) => {
      return (
        <ButtonSort
          texto="Cantidad"
          click={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-end">
          {formatoDivisa(Number(row.getValue("cantidadMovimiento")))}
        </div>
      );
    },
  },
  {
    accessorKey: "fechaMovimiento",
    header: ({ column }) => {
      return (
        <ButtonSort
          texto="Fecha"
          click={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-end">
          {fechaHora(row.getValue("fechaMovimiento"))}
        </div>
      );
    },
  },
];
