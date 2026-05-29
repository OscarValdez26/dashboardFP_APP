import { apiRequest } from "@/api/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fechaHora, fechaHoraCorta } from "@/helpers/formatoFecha";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatoDivisa, formatoDivisaCorto } from "@/helpers/formatoDivisa";
import { useMobile } from "@/hooks/useMobile";
import type { MovimientosType } from "@/types";

function TablaMovimientosSencilla() {
  const isMobile = useMobile();
  const [movimientos, setMovimientos] = useState<MovimientosType[] | null>(
    null,
  );

  useEffect(() => {
    const obtenerMovimientos = async () => {
      const resultado = await apiRequest("GET", "movimientos/recientes");
      if (resultado.success) {
        const datos = resultado.data.result;
        const nuevosDatos = datos.map((dato: MovimientosType) => {
          if (dato.tipoMovimiento === "transferencia") {
            if (dato.idCuenta === dato.cuentaOrigen)
              return {
                ...dato,
                tipoMovimiento: "gasto",
                categoriaMovimiento: "Transferencia",
                color: "bg-(--color-transferencia)",
              };
            if (dato.idCuenta === dato.cuentaDestino)
              return {
                ...dato,
                tipoMovimiento: "ingreso",
                categoriaMovimiento: "Transferencia",
                color: "bg-(--color-transferencia)",
              };
            return dato;
          }
          if (dato.tipoMovimiento === "gasto") {
            return { ...dato, color: "bg-(--color-gasto)" };
          }
          if (dato.tipoMovimiento === "ingreso") {
            return { ...dato, color: "bg-(--color-ingreso)" };
          }
          return dato;
        });
        setMovimientos(nuevosDatos);
      }
    };
    obtenerMovimientos();
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-4">
      <Label className="text-md p-8">Ultimos movimientos</Label>
      {!isMobile && (
        <Table>
          {movimientos?.length === 0 && (
            <TableCaption>No hay movimientos recientes</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>Cuenta</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movimientos &&
              movimientos.map((movimiento: MovimientosType, index: number) => (
                <TableRow key={index}>
                  <TableCell className="text-start">
                    {movimiento.cuenta}
                  </TableCell>
                  <TableCell>
                    <Badge className={movimiento.color}>
                      {movimiento.tipoMovimiento}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-start">
                    {movimiento.categoriaMovimiento}
                  </TableCell>
                  <TableCell className="text-start">
                    {movimiento.descripcionMovimiento}
                  </TableCell>
                  <TableCell className="text-end">
                    {formatoDivisa(Number(movimiento.cantidadMovimiento))}
                  </TableCell>
                  <TableCell className="text-end">
                    {fechaHora(movimiento.fechaMovimiento)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {isMobile && (
        <Table>
          {movimientos?.length === 0 && (
            <TableCaption>No hay movimientos recientes</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>Cuenta</TableHead>
              <TableHead>Tipo</TableHead>
              {/* <TableHead>Categoria</TableHead> */}
              {/* <TableHead>Descripcion</TableHead> */}
              <TableHead>Cantidad</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movimientos &&
              movimientos.map((movimiento: MovimientosType, index: number) => (
                <TableRow key={index}>
                  <TableCell className="text-start">
                    {movimiento.cuenta}
                  </TableCell>
                  <TableCell>
                    <Badge className={movimiento.color}>
                      {movimiento.tipoMovimiento}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="text-start">
                      {movimiento.categoriaMovimiento}
                    </TableCell>
                    <TableCell className="text-start">
                      {movimiento.descripcionMovimiento}
                    </TableCell> */}
                  <TableCell className="text-end">
                    {formatoDivisaCorto(Number(movimiento.cantidadMovimiento))}
                  </TableCell>
                  <TableCell className="text-end">
                    {fechaHoraCorta(movimiento.fechaMovimiento)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default TablaMovimientosSencilla;
