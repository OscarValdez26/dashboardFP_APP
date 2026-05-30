import { apiRequest } from "@/api/api";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { useEffect, useState } from "react";
import { fechaSinDia } from "@/helpers/formatoFecha";
import { Separator } from "../ui/separator";

type HistorialItem = {
  mes: string;
  tipoCuenta: "cartera" | "ahorro" | "meta";
  ingresos: number;
  gastos: number;
  balance: number;
};

type HistorialType = {
  ultimoMes: HistorialItem[];
  penultimoMes: HistorialItem[];
  antepenultimoMes: HistorialItem[];
};

type Props = {
  setCarteraAnterior: React.Dispatch<React.SetStateAction<CuentaHistorial>>;
};

type CuentaHistorial = {
  mes: string;
  tipoCuenta: string;
  ingresos: string;
  gastos: string;
  balance: string;
};

function Historial({ setCarteraAnterior }: Props) {
  const [historial, setHistorial] = useState<HistorialType>({
    ultimoMes: [],
    penultimoMes: [],
    antepenultimoMes: [],
  });
  useEffect(() => {
    const obtenerHistorial = async () => {
      const resultado = await apiRequest("GET", "cuentas/historial");
      if (resultado.success) {
        const anterior = resultado.data.result.ultimoMes.find(
          (cuenta: HistorialItem) => cuenta.tipoCuenta === "cartera",
        );
        if (anterior) setCarteraAnterior(anterior);
        setHistorial(resultado.data.result);
      }
    };
    obtenerHistorial();
  }, []);
  const ultimo = new Date();
  ultimo.setUTCMonth(ultimo.getUTCMonth() - 1);
  const penultimo = new Date();
  penultimo.setUTCMonth(penultimo.getUTCMonth() - 2);
  const antepenultimo = new Date();
  antepenultimo.setUTCMonth(antepenultimo.getUTCMonth() - 3);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h3 className="flex flex-col text-md font-medium py-8 text-center">
        Balance histórico (Ingresos - Egresos)
        <span className="text-sm font-normal">Incluye transferencias</span>
      </h3>

      <div className="grid grid-cols-4 w-full pb-2">
        <p>Cuenta</p>
        {historial && <p>{fechaSinDia(new Date(ultimo).toISOString())}</p>}
        {historial && <p>{fechaSinDia(new Date(penultimo).toISOString())}</p>}
        {historial && (
          <p>{fechaSinDia(new Date(antepenultimo).toISOString())}</p>
        )}
      </div>
      <Separator />

      {historial && (
        <div className="grid grid-cols-4 w-full pt-2">
          <p>Cartera</p>
          <p>
            {formatoDivisa(
              historial.ultimoMes.find((dato) => dato.tipoCuenta === "cartera")
                ?.balance || 0,
            )}
          </p>
          <p>
            {formatoDivisa(
              historial.penultimoMes.find(
                (dato) => dato.tipoCuenta === "cartera",
              )?.balance || 0,
            )}
          </p>
          <p>
            {formatoDivisa(
              historial.antepenultimoMes.find(
                (dato) => dato.tipoCuenta === "cartera",
              )?.balance || 0,
            )}
          </p>
        </div>
      )}
      {historial && (
        <div className="grid grid-cols-4 w-full pt-2">
          <p>Ahorro</p>
          <p>
            {formatoDivisa(
              historial.ultimoMes.find((dato) => dato.tipoCuenta === "ahorro")
                ?.balance || 0,
            )}
          </p>
          <p>
            {formatoDivisa(
              historial.penultimoMes.find(
                (dato) => dato.tipoCuenta === "ahorro",
              )?.balance || 0,
            )}
          </p>
          <p>
            {formatoDivisa(
              historial.antepenultimoMes.find(
                (dato) => dato.tipoCuenta === "ahorro",
              )?.balance || 0,
            )}
          </p>
        </div>
      )}
      {historial && (
        <div className="grid grid-cols-4 w-full pt-2">
          <p>Metas</p>
          <p>
            {formatoDivisa(
              historial.ultimoMes.find((dato) => dato.tipoCuenta === "meta")
                ?.balance || 0,
            )}
          </p>
          <p>
            {formatoDivisa(
              historial.penultimoMes.find((dato) => dato.tipoCuenta === "meta")
                ?.balance || 0,
            )}
          </p>
          <p>
            {formatoDivisa(
              historial.antepenultimoMes.find(
                (dato) => dato.tipoCuenta === "meta",
              )?.balance || 0,
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default Historial;
