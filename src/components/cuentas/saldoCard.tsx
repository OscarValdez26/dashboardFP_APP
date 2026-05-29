import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { randomMensaje } from "@/helpers/randomMensaje";
import { fechaCorta } from "@/helpers/formatoFecha";
import { useAppContext } from "@/context/useAppContext";
import { formatoDivisa } from "@/helpers/formatoDivisa";

export function SaldoCard() {
  const { cuentas } = useAppContext();
  const [indice, setIndice] = useState(0);
  const vacio = {
    idCuenta: 0,
    nombre: "Sin datos",
    saldo: "0",
    tipo: "cartera",
    fechaInicio: new Date().toISOString(),
    fechaFinal: new Date().toISOString(),
    ingresos: "0",
    gastos: "0",
    porcentaje: "0",
    ingresosT: "0",
    gastosT: "0",
  };
  const datos = cuentas?.[indice] || vacio;
  const getTipo = () => {
    if (datos.tipo === "meta") return "ahorro";
    else return datos.tipo;
  };
  const mensaje = useMemo(() => {
    return randomMensaje(getTipo(), Number(datos.porcentaje));
  }, [datos.porcentaje, datos.tipo]);
  const changeData = () => {
    setIndice((prev) => {
      if (prev === cuentas?.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  useEffect(() => {
    const intervalo = setInterval(() => {
      changeData();
    }, 15000);
    return () => clearInterval(intervalo);
  }, [cuentas]);

  return (
    <Card className="card-principal">
      <CardHeader className="pt-4">
        <CardTitle>Resumen de cuenta</CardTitle>
        <CardDescription>{datos.nombre}</CardDescription>
        <CardAction>
          <Badge
            variant="secondary"
            className="hover:cursor-pointer"
            onClick={changeData}
          >
            {datos.tipo}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Label className="flex flex-col items-end col-start-3 mb-8">
          <span>Saldo</span>
          <span className="text-2xl font-heading">
            {formatoDivisa(Number(datos.saldo))}
          </span>
        </Label>
        <div className="grid grid-cols-3 gap-6">
          <Label className="">Periodo</Label>
          <Label className="">{fechaCorta(datos.fechaInicio)}</Label>
          <Label className="">{fechaCorta(datos.fechaFinal)}</Label>
          <Label className="flex flex-col items-start col-start-1">
            <span>Ingresos</span>
            <span>{formatoDivisa(Number(datos.ingresos) || 0)}</span>
          </Label>
          <Label className="flex flex-col items-start col-start-2">
            <span>Gastos</span>
            <span>{formatoDivisa(Number(datos.gastos) || 0)}</span>
          </Label>
          <Label className="flex flex-col items-start col-start-3">
            <span>Diferencia</span>
            <span>
              {formatoDivisa(
                Number(datos.ingresos || 0) - Number(datos.gastos || 0),
              )}
            </span>
          </Label>
          <Label className="flex flex-col items-start col-start-1">
            <span>Transferencias</span>
          </Label>
          <Label className="flex flex-col items-start col-start-2">
            <span>Recibidas</span>
            <span>{formatoDivisa(Number(datos.ingresosT) || 0)}</span>
          </Label>
          <Label className="flex flex-col items-start col-start-3">
            <span>Enviadas</span>
            <span>{formatoDivisa(Number(datos.gastosT) || 0)}</span>
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex-col justify-center h-full">
        <Label>{mensaje}</Label>
      </CardFooter>
    </Card>
  );
}
