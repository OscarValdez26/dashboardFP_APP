import { Label } from "@/components/ui/label";
import MetasCards from "@/components/metas/metasCards";
import NuevaMeta from "@/components/metas/nuevaMeta";

function Metas() {
  return (
    <div>
      <Label className="text-xl font-semibold p-4 justify-center">
        Mis Metas
      </Label>
      <div className="flex justify-end p-4">
        <NuevaMeta />
      </div>
      <MetasCards />
    </div>
  );
}

export default Metas;
