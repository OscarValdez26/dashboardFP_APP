import { apiRequest } from "@/api/api";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PresupuestosType } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import GraficoAguja from "@/components/generic/graficoAguja";
import { useAppContext } from "@/context/useAppContext";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import EditarPresupuesto from "./editarPresupuesto";
import NuevoPresupuesto from "./nuevoPresupuesto";
import { randomMensaje } from "@/helpers/randomMensaje";

type Gastos = {
  categoria: string;
  totalGastado: string;
};

function PresupuestosCards() {
  const { cuentas } = useAppContext();
  const [presupuestos, setPresupuestos] = useState<PresupuestosType[]>([]);
  const [gastos, setGastos] = useState<Gastos[]>([]);
  const cartera = useMemo(
    () => cuentas?.find((cuenta) => cuenta.tipo === "cartera"),
    [cuentas],
  );

  const getValue = (
    categoria: string,
    cantidad: string,
    tipo: string,
    g: Gastos[],
  ) => {
    const cantidadPresupuesto =
      tipo === "monto"
        ? Number(cantidad)
        : (Number(cantidad) / 100) * Number(cartera?.ingresos);
    const gasto = g?.find((gasto) => gasto.categoria === categoria);
    if (!gasto) return 0;
    const porcentaje = Math.ceil(
      (Number(gasto.totalGastado) / cantidadPresupuesto) * 100,
    );
    return porcentaje;
  };

  const getGastado = (categoria: string) => {
    const gastado = gastos?.find((gasto) => gasto.categoria === categoria);
    if (!gastado) return "";
    return gastado.totalGastado;
  };
  const obtenerPresupuestos = async () => {
    const resultado = await apiRequest("GET", "presupuestos");
    if (resultado.success) {
      return resultado.data.result;
    }
  };
  const obtenerGastos = async () => {
    const resultado = await apiRequest("GET", "movimientos/gastos");
    if (resultado.success) {
      return resultado.data.result;
    }
  };

  const obtenerDatos = async () => {
    const [p, g] = await Promise.all([obtenerPresupuestos(), obtenerGastos()]);
    const datos = p.map((dato: PresupuestosType) => ({
      ...dato,
      porcentaje: getValue(
        dato.categoria,
        dato.cantidadPresupuesto,
        dato.tipoPresupuesto,
        g,
      ),
    }));
    setGastos(g);
    setPresupuestos(datos);
  };
  useEffect(() => {
    if (!cartera) return;
    const obtener = async () => {
      await obtenerDatos();
    };
    obtener();
  }, [cartera]);
  return (
    <div>
      <div className="flex justify-end p-4 mt-8">
        <NuevoPresupuesto obtenerDatos={obtenerDatos} />
      </div>
      {presupuestos?.length === 0 && (
        <div className="flex justify-center items-center pt-16 font-normal">
          No hay presupuestos asignados
        </div>
      )}
      <div className="grid-page">
        {presupuestos &&
          presupuestos.length > 0 &&
          presupuestos.map((presupuesto) => (
            <Card className="card-principal" key={presupuesto.idPresupuesto}>
              <CardHeader>
                <CardTitle>
                  <Badge
                    className="text-sm p-3"
                    style={{
                      backgroundColor: `var(--color-${presupuesto.categoria})`,
                    }}
                  >
                    {presupuesto.categoria}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Ingresos del periodo:{" "}
                  {formatoDivisa(Number(cartera?.ingresos))}
                </CardDescription>
                <CardAction>
                  <EditarPresupuesto
                    presupuesto={presupuesto}
                    obtenerPresupuestos={obtenerPresupuestos}
                  />
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Separator />
                <div className="flex justify-between text-sm font-medium">
                  {presupuesto.tipoPresupuesto === "monto" && (
                    <span>
                      Presupuesto:{" "}
                      {formatoDivisa(Number(presupuesto.cantidadPresupuesto))}
                    </span>
                  )}
                  {presupuesto.tipoPresupuesto === "porcentaje" && (
                    <p>
                      Presupuesto: {Number(presupuesto.cantidadPresupuesto)}%
                      <span>
                        {" "}
                        &asymp;{" "}
                        {formatoDivisa(
                          (Number(presupuesto.cantidadPresupuesto) / 100) *
                            Number(cartera?.ingresos),
                        )}
                      </span>
                    </p>
                  )}
                </div>
                <p className="text-sm font-medium">
                  Gastado:{" "}
                  {formatoDivisa(Number(getGastado(presupuesto.categoria)))}
                </p>

                <GraficoAguja porcentaje={presupuesto.porcentaje!} />
                <div className="flex justify-center">
                  <p className="text-sm font-medium">
                    {randomMensaje(
                      "presupuesto",
                      presupuesto.porcentaje! <= 100
                        ? presupuesto.porcentaje!
                        : 100,
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default PresupuestosCards;
