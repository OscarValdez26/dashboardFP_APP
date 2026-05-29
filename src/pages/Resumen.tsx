import { SaldoCard } from "@/components/cuentas/saldoCard";
import TablaMovimientosSencilla from "@/components/movimientos/tablaMovimientosSencilla";
import GastosChart from "@/components/gastos/gastosChart";
import ProgresoMetas from "@/components/metas/progresoMetas";
import { Label } from "@/components/ui/label";
import EstadoPresupuestos from "@/components/presupuestos/estadoPresupuestos";

function Resumen() {
  return (
    <div>
      <Label className="text-xl font-semibold p-4 justify-center">
        Resumen
      </Label>
      <div className="grid-page">
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
