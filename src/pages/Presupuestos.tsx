import PresupuestosCards from "@/components/presupuestos/presupuestosCards";
import { Label } from "@/components/ui/label";

function Presupuestos() {
  return (
    <div>
      <Label className="text-xl font-semibold p-4 justify-center">
        Presupuestos
      </Label>
      <PresupuestosCards />
    </div>
  );
}

export default Presupuestos;
