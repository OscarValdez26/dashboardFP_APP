import { Progress } from "@/components/ui/progress";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { fechaCorta } from "@/helpers/formatoFecha";
import { iconos } from "@/lib/iconos";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { randomMensaje } from "@/helpers/randomMensaje";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/useAppContext";
import { useMemo } from "react";
import EditarMeta from "@/components/metas/editarMeta";

function MetasCards() {
  const { metas } = useAppContext();
  const getIcono = (iconoMeta: string) => {
    if (iconoMeta === "") return;
    const Icon = iconos[iconoMeta];
    return <Icon />;
  };
  const getDias = (fecha: string) => {
    const mS = Number(new Date(fecha)) - Number(new Date());
    const factor = 1000 * 60 * 60 * 24;
    return Math.ceil(mS / factor);
  };
  const metasConMensaje = useMemo(() => {
    return metas?.map((meta) => ({
      id: meta.idMeta,
      mensaje: randomMensaje("meta", Number(meta.progreso)),
    }));
  }, [metas]);
  return (
    //
    <div>
      <div className="grid-page">
        {metas.length > 0 &&
          metas.map((meta) => (
            <Card className="card-principal" key={meta.idMeta}>
              <CardHeader>
                <CardTitle className="flex gap-4">
                  {getIcono(meta.icono)}
                  <span>{meta.nombre}</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {meta.descripcion}
                </CardDescription>
                <CardAction>
                  <EditarMeta meta={meta} />
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm font-medium">
                <div className="flex justify-between">
                  <span>{`${meta.progreso}%`}</span>
                </div>
                <Progress value={Number(meta.progreso)} />
                <div className="flex justify-between">
                  <span>{formatoDivisa(Number(meta.saldo))}</span>
                  <span>{formatoDivisa(Number(meta.objetivo))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex flex-nowrap text-xs">
                    Fecha limite: {fechaCorta(meta.fechaLimite)}
                  </span>
                  <span className="text-xs">
                    Quedan {getDias(meta.fechaLimite)} dias
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Label>
                  {metasConMensaje?.find((m) => m.id === meta.idMeta)?.mensaje}
                </Label>
              </CardFooter>
            </Card>
          ))}
      </div>
      {metas.length === 0 && (
        <div className="flex justify-center items-center font-normal pt-16">
          No hay metas activas
        </div>
      )}
    </div>
  );
}

export default MetasCards;
