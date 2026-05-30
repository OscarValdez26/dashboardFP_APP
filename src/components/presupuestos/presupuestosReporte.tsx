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

type Props = {
  setPresupuestoTop: React.Dispatch<React.SetStateAction<PresupuestoTop>>;
};

type PresupuestoTop = {
  idPresupuesto: number;
  categoria: string;
  tipoPresupuesto: "monto" | "porcentaje";
  cantidadPresupuesto: string;
  porcentaje: number;
};

function PresupuestosReporte({ setPresupuestoTop }: Props) {
  const { cuentas } = useAppContext();
  const [presupuestos, setPresupuestos] = useState<PresupuestosType[]>([]);
  const [gastos, setGastos] = useState<Gastos[] | null>(null);
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
      const top = [...datos];
      top.sort((a, b) => b.porcentaje - a.porcentaje);
      if (top[0]) setPresupuestoTop(top[0]);
      setGastos(g);
      setPresupuestos(datos);
    };

    obtenerDatos();
  }, [cartera]);
  return (
    <div className="w-100 flex flex-col text-center p-8 border-2 rounded-2xl">
      <h3 className="text-lg font-medium p-4">Mis presupuestos</h3>
      {presupuestos.length > 0 &&
        presupuestos.map((presupuesto, index) => (
          <div
            className="flex flex-col gap-4 pb-4"
            key={presupuesto.idPresupuesto}
          >
            {index > 0 && <Separator />}
            <div className="flex justify-between">
              <Badge
                style={{
                  backgroundColor: `var(--color-${presupuesto.categoria})`,
                }}
              >
                {presupuesto.categoria}
              </Badge>
              {presupuesto.tipoPresupuesto === "monto" && (
                <span className="text-sm">
                  Presupuesto:{" "}
                  {formatoDivisa(Number(presupuesto.cantidadPresupuesto))}
                </span>
              )}
              {presupuesto.tipoPresupuesto === "porcentaje" && (
                <p className="text-sm">
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
            <div className="flex justify-between text-sm">
              <span>
                Gastado:{" "}
                {formatoDivisa(Number(getGastado(presupuesto.categoria)))}
              </span>
              <span>{`${presupuesto.porcentaje}%`}</span>
            </div>
            <Progress
              value={calcularValue(presupuesto.porcentaje!)}
              color={getColor(presupuesto.porcentaje!)}
            />
          </div>
        ))}
      {presupuestos.length === 0 && (
        <div className="w-full h-full flex justify-center items-center font-normal text-sm">
          No hay presupuestos asignados
        </div>
      )}
    </div>
  );
}

export default PresupuestosReporte;
