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
import { Button } from "@/components/ui/button";

type Props = {
  mensajeBoton: string;
  variant:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive";
  titulo: string;
  mensaje: string;
  mensajeAceptar: string;
  onClick: () => void;
};

export function DialogoAlerta({
  mensajeBoton,
  variant,
  titulo,
  mensaje,
  mensajeAceptar,
  onClick,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} className="hover:cursor-pointer">
          {mensajeBoton}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>{mensaje}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onClick} className="hover:cursor-pointer">
              {mensajeAceptar}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DialogoAlerta;
