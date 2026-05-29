import { Progress } from "@/components/ui/progress";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { iconos } from "@/lib/iconos";
import { useAppContext } from "@/context/useAppContext";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

function MetasReporte({ setMetaTop }) {
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
  useEffect(() => {
    if (!metas) return;
    if (metas.length > 0) {
      const dato = [...metas];
      dato.sort((a, b) => b.fechaLimite - a.fechaLimite);
      const top = {
        nombre: dato[0].nombre,
        restante: getDias(dato[0].fechaLimite),
        progreso: dato[0].progreso,
      };
      setMetaTop(top);
    }
  }, [metas]);
  return (
    <div className="w-100 flex flex-col items-center p-8 border-2 rounded-2xl">
      <h3 className="text-lg font-medium p-4">Mis metas</h3>

      {metas.length > 0 &&
        metas.map((meta, index) => (
          <div className="flex flex-col gap-4 pb-4 w-full" key={meta.idMeta}>
            {index > 0 && <Separator className="" />}
            <div className="flex gap-2 pb-2">
              {getIcono(meta.icono)}
              <span className="font-medium">{meta.nombre}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{`${meta.progreso}%`}</span>
              <span>Quedan {getDias(meta.fechaLimite)} dias</span>
            </div>

            <Progress value={Number(meta.progreso)} color="bg-primary" />
            <div className="flex justify-between text-sm">
              <span>{formatoDivisa(Number(meta.saldo))}</span>
              <span>{formatoDivisa(Number(meta.objetivo))}</span>
            </div>
          </div>
        ))}
      {metas.length === 0 && (
        <div className="w-full h-full flex justify-center items-center font-normal text-sm">
          No hay metas activas
        </div>
      )}
    </div>
  );
}

export default MetasReporte;
