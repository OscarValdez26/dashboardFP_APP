import InputCalendario from "@/components/generic/inputCalendario";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/api/api";
import { Label } from "@/components/ui/label";
import type { MovimientosType } from "@/types";

type Props = {
  setMovimientos: React.Dispatch<React.SetStateAction<MovimientosType[]>>;
};

function BarraPeriodo({ setMovimientos }: Props) {
  const [inicio, setInicio] = useState<Date>();
  const [final, setFinal] = useState<Date>();
  const [error, setError] = useState<string>("");
  const buscarMovimientos = async () => {
    setError("");
    if (!inicio || !final) return setError("Selecciona ambas fechas");
    if (inicio > final)
      return setError("La fecha inicial debe ser anterior a la fecha final");
    const fecha = new Date(final.toISOString());
    fecha.setDate(fecha.getDate() + 1);
    const json = {
      inicio: inicio.toISOString(),
      final: fecha.toISOString(),
    };
    const result = await apiRequest("POST", "movimientos/periodo", json);
    if (result.success) {
      const datos = result.data.result;
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
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 justify-evenly p-4 mt-8">
      <div className="flex gap-2 justify-between max-w-1/2">
        <Label>Fecha de inicio:</Label>
        <InputCalendario value={inicio} onChange={setInicio} />
      </div>
      <div className="flex gap-2 justify-between max-w-1/2">
        <Label>Fecha final:</Label>
        <InputCalendario value={final} onChange={setFinal} />
      </div>

      <Button className="w-20" onClick={buscarMovimientos}>
        Buscar
      </Button>
      <Label className="text-red-500">{error}</Label>
    </div>
  );
}

export default BarraPeriodo;
