import { formatoDivisa } from "@/helpers/formatoDivisa";
import type { ResumenCuentasType } from "@/types";

type Props = {
  categoriaTop: {
    categoria: string;
    totalGastado: number;
    fill: string;
  };
  presupuestoTop: {
    idPresupuesto: number;
    categoria: string;
    tipoPresupuesto: "monto" | "porcentaje";
    cantidadPresupuesto: string;
    porcentaje: number;
  };
  metaTop: {
    nombre: string;
    restante: number;
    progreso: string;
  };
  cartera: ResumenCuentasType;
  carteraAnterior: {
    mes: string;
    tipoCuenta: string;
    ingresos: string;
    gastos: string;
    balance: string;
  };
};

function Destacados({
  categoriaTop,
  presupuestoTop,
  metaTop,
  cartera,
  carteraAnterior,
}: Props) {
  const getComparacion = (actuales: string, anteriores: string) => {
    const relacion = (Number(actuales) / Number(anteriores)) * 100;
    if (relacion > 100) return `${Math.ceil(relacion - 100)}% mas altos`;
    if (relacion < 100) return `${Math.ceil(100 - relacion)}% mas bajos`;
    if (relacion === 100) return "iguales";
  };
  const getPromedio = (gastos: string) => {
    const promedio = Number(gastos) / new Date().getDate();
    return formatoDivisa(promedio);
  };
  const getTasaAhorro = (ingresos: string, gastos: string) => {
    const tasa = Math.ceil(
      ((Number(ingresos) - Number(gastos)) / Number(ingresos)) * 100,
    );
    if (tasa >= 30) return `${tasa}% lo cual es excelente`;
    if (tasa >= 20) return `${tasa}% lo cual es saludable para tus finanzas`;
    if (tasa < 20)
      return `${tasa}% lo cual es mejorable, intenta llegar al 20%`;
  };
  return (
    <div className="w-full text-md pt-8">
      <div className="flex justify-center pb-4">
        <h3 className="text-md font-medium">Datos de interes</h3>
      </div>

      <ul className="list-disc ps-6">
        {categoriaTop.categoria !== "" && (
          <li className="pb-2">
            La categoría en la que más has gastado este mes es{" "}
            <span className="italic">{categoriaTop.categoria}</span> con{" "}
            <span className="font-semibold">
              {formatoDivisa(categoriaTop.totalGastado)}
            </span>
          </li>
        )}
        {presupuestoTop.porcentaje !== 0 && (
          <li className="pb-2">
            Se ha utilizado un{" "}
            <span className="font-semibold">{presupuestoTop.porcentaje}%</span>{" "}
            del presupuesto para{" "}
            <span className="italic">{presupuestoTop.categoria}</span>
          </li>
        )}
        {metaTop.restante !== 0 && (
          <li className="pb-2">
            Quedan <span className="font-semibold">{metaTop.restante}</span>{" "}
            dias para la fecha limite de la meta{" "}
            <span className="italic">{metaTop.nombre}</span> y tu progreso es
            del{" "}
            <span className="font-semibold">
              {Math.ceil(Number(metaTop.progreso))}%
            </span>
          </li>
        )}
        {cartera &&
          cartera.tipo === "cartera" &&
          carteraAnterior.tipoCuenta === "cartera" && (
            <li className="pb-2">
              Tus ingresos son{" "}
              <span className="font-semibold">
                {getComparacion(cartera.ingresos, carteraAnterior.ingresos)}
              </span>{" "}
              que el mes anterior
            </li>
          )}
        {cartera &&
          cartera.tipo === "cartera" &&
          carteraAnterior.tipoCuenta === "cartera" && (
            <li className="pb-2">
              Tus gastos son{" "}
              <span className="font-semibold">
                {getComparacion(cartera.gastos, carteraAnterior.gastos)}
              </span>{" "}
              que el mes anterior
            </li>
          )}
        {cartera &&
          cartera.tipo === "cartera" &&
          Number(cartera.gastos) !== 0 && (
            <li className="pb-2">
              Tu promedio de gasto diario es de{" "}
              <span className="font-semibold">
                {getPromedio(cartera.gastos)}
              </span>
            </li>
          )}
        {cartera &&
          cartera.tipo === "cartera" &&
          Number(cartera.ingresos) !== 0 && (
            <li className="pb-2">
              Tu tasa de ahorro de este mes es de{" "}
              <span className="font-semibold">
                {getTasaAhorro(cartera.ingresos, cartera.gastos)}
              </span>
            </li>
          )}
      </ul>
    </div>
  );
}

export default Destacados;
