import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

type Props = {
  titulo: string;
  mensaje: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Alerta({ titulo, mensaje, setOpen }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>{titulo}</AlertTitle>
        <AlertDescription>{mensaje}</AlertDescription>
      </Alert>
    </div>
  );
}

export default Alerta;
