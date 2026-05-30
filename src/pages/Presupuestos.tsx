import PresupuestosCards from "@/components/presupuestos/presupuestosCards";
import { Label } from "@/components/ui/label";
import { useMobile } from "@/hooks/useMobile";

function Presupuestos() {
  const isMobile = useMobile();
  return (
    <div>
      {isMobile && (
        <Label className="text-xl font-semibold p-4 justify-center">
          Presupuestos
        </Label>
      )}
      <PresupuestosCards />
    </div>
  );
}

export default Presupuestos;
