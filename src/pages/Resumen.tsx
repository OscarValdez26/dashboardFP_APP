import { SaldoCard } from "@/components/cuentas/saldoCard";
import TablaMovimientosSencilla from "@/components/movimientos/tablaMovimientosSencilla";
import GastosChart from "@/components/gastos/gastosChart";
import ProgresoMetas from "@/components/metas/progresoMetas";
import { Label } from "@/components/ui/label";
import EstadoPresupuestos from "@/components/presupuestos/estadoPresupuestos";
import { useMobile } from "@/hooks/useMobile";
import { useEffect } from "react";
import { useAuthContext } from "@/context/useAuthContext";
import { useTutorial } from "@/hooks/useTutorial";
import { MessageCircleQuestionMark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Resumen() {
  const isMobile = useMobile();
  const { user } = useAuthContext();
  const { iniciarTutorial } = useTutorial();
  useEffect(() => {
    if (!user?.verificado) {
      iniciarTutorial();
    }
  }, []);
  return (
    <div>
      <div className="flex justify-end px-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              size="icon-lg"
            >
              <MessageCircleQuestionMark />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tutorial</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Desea ver el tutorial?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:cursor-pointer">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={iniciarTutorial}
                  className="hover:cursor-pointer"
                >
                  Ver
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
