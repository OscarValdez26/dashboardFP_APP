import { SaldoCard } from "@/components/cuentas/saldoCard";
import TablaMovimientosSencilla from "@/components/movimientos/tablaMovimientosSencilla";
import GastosChart from "@/components/gastos/gastosChart";
import ProgresoMetas from "@/components/metas/progresoMetas";
import { Label } from "@/components/ui/label";
import EstadoPresupuestos from "@/components/presupuestos/estadoPresupuestos";
import { useMobile } from "@/hooks/useMobile";

function Resumen() {
  const isMobile = useMobile();
  return (
    <div>
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
