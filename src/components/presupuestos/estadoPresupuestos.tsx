import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/useAppContext";
import { useEffect, useMemo, useState } from "react";
import type { PresupuestosType } from "@/types";
import { apiRequest } from "@/api/api";
import { Progress } from "../ui/progress";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { Badge } from "../ui/badge";

type Gastos = {
  categoria: string;
  totalGastado: string;
};

function EstadoPresupuestos() {
  const { cuentas } = useAppContext();
  const [presupuestos, setPresupuestos] = useState<PresupuestosType[]>([]);
  const [gastos, setGastos] = useState<Gastos[]>([]);
  const cartera = useMemo(
    () => cuentas?.find((cuenta) => cuenta.tipo === "cartera"),
    [cuentas],
  );

  const calcularValue = (valor: number) => {
    return valor <= 100 ? valor : 100;
  };

  const getGastado = (categoria: string) => {
    const gastado = gastos?.find((gasto) => gasto.categoria === categoria);
    if (!gastado) return "";
    return gastado.totalGastado;
  };
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
  const getColor = (valor: number) => {
    if (!valor) return "bg-primary";
    if (valor < 30) return "bg-emerald-500";
    if (valor < 70) return "bg-yellow-500";
    return "bg-red-500";
  };
  useEffect(() => {
    if (!cartera) return;
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
      const [p, g] = await Promise.all([
        obtenerPresupuestos(),
        obtenerGastos(),
      ]);
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

    obtenerDatos();
  }, [cartera]);
  return (
    <Card className="card-principal px-4">
      <CardHeader>
        <CardTitle className="py-4">Mis presupuestos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-4 gap-4 text-sm font-medium">
        {presupuestos.length > 0 &&
          presupuestos.length > 0 &&
          presupuestos.map((presupuesto, index) => (
            <div
              className="flex flex-col gap-2"
              key={presupuesto.idPresupuesto}
            >
              {index > 0 && <Separator />}
              <div className="flex justify-between pb-2">
                <Badge
                  style={{
                    backgroundColor: `var(--color-${presupuesto.categoria})`,
                  }}
                >
                  {presupuesto.categoria}
                </Badge>
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
              <div className="flex justify-between pb-2">
                <p className="text-sm font-medium">
                  Gastado:{" "}
                  {formatoDivisa(Number(getGastado(presupuesto.categoria)))}
                </p>
                <p>{`${presupuesto.porcentaje}%`}</p>
              </div>
              <Progress
                value={calcularValue(presupuesto.porcentaje!)}
                color={getColor(presupuesto.porcentaje!)}
              />
            </div>
          ))}
        {presupuestos.length === 0 && (
          <div className="text-muted-foreground ">
            <p className="pb-4">Aún no tienes presupuestos asignados</p>
            <p>
              Crea un presupuesto nuevo en la pestaña "Presupuestos" para saber
              si tus gastos del mes estan dentro del rango adecuado
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EstadoPresupuestos;
