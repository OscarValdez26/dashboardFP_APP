import { Label } from "@/components/ui/label";
import { useState } from "react";
import BarraPeriodo from "@/components/movimientos/barraPeriodo";
import TablaMovimientos from "@/components/movimientos/tablaMovimientos";
import { columnas } from "@/lib/columns";
import type { MovimientosType } from "@/types";

function Movimientos() {
  const [movimientos, setMovimientos] = useState<MovimientosType[]>([]);
  return (
    <div className="flex flex-col w-full">
      <Label className="text-xl font-semibold p-4 justify-center">
        Buscar Movimientos
      </Label>
      <BarraPeriodo setMovimientos={setMovimientos} />
      <TablaMovimientos columns={columnas} data={movimientos} />
    </div>
  );
}

export default Movimientos;
