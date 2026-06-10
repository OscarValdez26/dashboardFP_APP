import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/auth/logoutButton";
import logo from "@/assets/logo.svg";
import NuevoMovimiento from "@/components/movimientos/nuevoMovimiento";
import NuevaTransferencia from "@/components/movimientos/nuevaTransferencia";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/useAppContext";

function HamburgerMenu() {
  const { user } = useAuthContext();
  const { tutorialActivo } = useAppContext();
  const [open, setOpen] = useState(tutorialActivo);
  useEffect(() => {
    setOpen(tutorialActivo);
  }, [tutorialActivo]);
  return (
    <div className="flex items-center justify-between p-4">
      <Link
        to="/resumen"
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        <img className="w-12" src={logo} />
        <h2 className="text-lg">Bienvenido {user?.nombre}</h2>
      </Link>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="hover:cursor-pointer"
            id="boton-menu"
          >
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto px-2">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="pb-2">Mi cuenta</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to="/resumen" onClick={() => setOpen(false)}>
                Resumen
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/movimientos" onClick={() => setOpen(false)}>
                Movimientos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/metas" onClick={() => setOpen(false)}>
                Metas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/presupuestos" onClick={() => setOpen(false)}>
                Presupuestos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/analisis" onClick={() => setOpen(false)}>
                Analisis
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col gap-1">
            <DropdownMenuItem asChild>
              <NuevoMovimiento />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NuevaTransferencia />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HamburgerMenu;
