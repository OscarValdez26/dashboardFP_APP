import { fechaCorta } from "@/helpers/formatoFecha";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import type { ResumenCuentasType } from "@/types";

type Props = {
  cartera: ResumenCuentasType;
};

function SaldoReporte({ cartera }: Props) {
  return (
    <div className="w-full pb-8">
      {cartera.tipo === "cartera" && (
        <div className="flex-flex-col p-4">
          <h3 className="text-md font-medium pb-4">
            Balance de cuenta principal
          </h3>{" "}
          <div className="text-sm">
            <p>
              Periodo: {fechaCorta(cartera!.fechaInicio)} -{" "}
              {fechaCorta(cartera!.fechaFinal)}
            </p>
            <p>Saldo: {formatoDivisa(Number(cartera?.saldo))}</p>
            <p>
              Ingresos del periodo: {formatoDivisa(Number(cartera?.ingresos))}
            </p>
            <p>Gastos del periodo: {formatoDivisa(Number(cartera?.gastos))}</p>
            <p>
              Balance:{" "}
              {formatoDivisa(
                Number(cartera?.ingresos) - Number(cartera?.gastos),
              )}
            </p>
            <p>
              Transferencias recibidas:{" "}
              {formatoDivisa(Number(cartera?.ingresosT))}
            </p>
            <p>
              Transferencias enviadas: {formatoDivisa(Number(cartera?.gastosT))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaldoReporte;
