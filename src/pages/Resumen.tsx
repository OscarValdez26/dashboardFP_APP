import { SaldoCard } from "@/components/cuentas/saldoCard";
import TablaMovimientosSencilla from "@/components/movimientos/tablaMovimientosSencilla";
import GastosChart from "@/components/gastos/gastosChart";
import ProgresoMetas from "@/components/metas/progresoMetas";
import { Label } from "@/components/ui/label";
import EstadoPresupuestos from "@/components/presupuestos/estadoPresupuestos";
import { useMobile } from "@/hooks/useMobile";
import { useAppContext } from "@/context/useAppContext";
import { useEffect } from "react";
import { iniciarTutorial } from "@/lib/tutorial";
import DialogoAlerta from "@/components/generic/dialogoAlerta";
import { useAuthContext } from "@/context/useAuthContext";

function Resumen() {
  const isMobile = useMobile();
  const { setTutorialActivo } = useAppContext();
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user?.verificado) {
      setTutorialActivo(true);
      iniciarTutorial();
      setTimeout(() => {
        setTutorialActivo(false);
      }, 60000);
    }
  }, []);
  const verTutorial = () => {
    setTutorialActivo(true);
    iniciarTutorial();
    setTimeout(() => {
      setTutorialActivo(false);
    }, 60000);
  };
  return (
    <div>
      <div className="flex justify-end px-4">
        <DialogoAlerta
          mensajeBoton="?"
          variant="secondary"
          titulo="Tutorial"
          mensaje="¿Desea ver el tutorial?"
          mensajeAceptar="Ver"
          onClick={verTutorial}
        />
      </div>
      {isMobile && (
        <Label className="text-xl font-semibold p-4 justify-center">
          Resumen
        </Label>
      )}
      <div className="grid-page mt-8">
        <SaldoCard />
        <GastosChart />
        <ProgresoMetas />
        <EstadoPresupuestos />
      </div>
      <TablaMovimientosSencilla />
    </div>
  );
}

export default Resumen;
