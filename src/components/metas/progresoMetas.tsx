import { Progress } from "@/components/ui/progress";
import { formatoDivisa } from "@/helpers/formatoDivisa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { iconos, type IconosType } from "@/lib/iconos";
import { useAppContext } from "@/context/useAppContext";
import { Separator } from "@/components/ui/separator";

function ProgresoMetas() {
  const { metas } = useAppContext();
  const getIcono = (iconoMeta: IconosType) => {
    const Icon = iconos[iconoMeta];
    return <Icon />;
  };
  const getColor = (progreso: number) => {
    if (progreso < 30) return "bg-red-500";
    if (progreso < 70) return "bg-yellow-500";
    if (progreso >= 70 && progreso < 100) return "bg-emerald-500";
    if (progreso >= 100) return "bg-blue-500";
    return "bg-primary";
  };
  return (
    <Card className="card-principal px-4">
      <CardHeader>
        <CardTitle className="py-4">Mis metas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-4 gap-4 text-sm font-medium">
        {metas.length > 0 &&
          metas.map((meta, index) => (
            <div className="flex flex-col gap-2" key={meta.idMeta}>
              {index > 0 && <Separator />}
              <div className="flex gap-2 pb-2">
                {meta.icono && getIcono(meta.icono)}
                <span>{meta.nombre}</span>
              </div>
              <span>{`${meta.progreso}%`}</span>
              <Progress
                value={Number(meta.progreso)}
                color={getColor(Number(meta.progreso))}
              />
              <div className="flex justify-between">
                <span>{formatoDivisa(Number(meta.saldo))}</span>
                <span>{formatoDivisa(Number(meta.objetivo))}</span>
              </div>
            </div>
          ))}
        {metas.length === 0 && (
          <div className="w-full h-full flex justify-center items-center font-normal">
            No hay metas activas
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProgresoMetas;
