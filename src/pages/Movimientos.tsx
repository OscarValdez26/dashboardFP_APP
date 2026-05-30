import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import BarraPeriodo from "@/components/movimientos/barraPeriodo";
import TablaMovimientos from "@/components/movimientos/tablaMovimientos";
import { columnas } from "@/lib/columns";
import type { MovimientosType } from "@/types";
import { useMobile } from "@/hooks/useMobile";

type DatosTablaType = {
  cuenta: string;
  tipoMovimiento: string;
  categoriaMovimiento: string;
  descripcionMovimiento: string;
  cantidadMovimiento: string;
  fechaMovimiento: string;
  color?: string;
};

function Movimientos() {
  const isMobile = useMobile();
  const [movimientos, setMovimientos] = useState<MovimientosType[]>([]);
  const [data, setData] = useState<DatosTablaType[]>([]);
  useEffect(() => {
    if (!movimientos) return;
    const nuevosDatos = movimientos.map((movimiento: MovimientosType) => ({
      cuenta: movimiento.cuenta,
      tipoMovimiento: movimiento.tipoMovimiento,
      categoriaMovimiento: movimiento.categoriaMovimiento,
      descripcionMovimiento: movimiento.descripcionMovimiento,
      cantidadMovimiento: movimiento.cantidadMovimiento,
      fechaMovimiento: movimiento.fechaMovimiento,
    }));
    setData(nuevosDatos);
  }, [movimientos]);
  return (
    <div className="flex flex-col w-full">
      {isMobile && (
        <Label className="text-xl font-semibold p-4 justify-center">
          Buscar Movimientos
        </Label>
      )}
      <BarraPeriodo setMovimientos={setMovimientos} />
      <TablaMovimientos columns={columnas} data={data} />
    </div>
  );
}

export default Movimientos;
