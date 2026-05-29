import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.svg";
import LogoutButton from "@/components/auth/logoutButton";
import NuevoMovimiento from "@/components/movimientos/nuevoMovimiento";
import NuevaTransferencia from "@/components/movimientos/nuevaTransferencia";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/useAuthContext";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const { user } = useAuthContext();
  return (
    <div className="flex max-h-20 justify-between w-max-full items-center p-4">
      <Link
        to="/resumen"
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        <img className="w-12" src={logo} />
        <h2 className="text-lg">Bienvenido {user?.nombre}</h2>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-8 lg:gap-12 xl:gap-16">
          <NavigationMenuItem>
            <NavLink
              to="/resumen"
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "border-b-2 border-primary text-primary transition-colors duration-500"
                    : "text-muted-foreground"
                }`
              }
            >
              Resumen
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/movimientos"
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "border-b-2 border-primary text-primary transition-colors duration-500"
                    : "text-muted-foreground"
                }`
              }
            >
              Movimientos
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/metas"
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "border-b-2 border-primary text-primary transition-colors duration-500"
                    : "text-muted-foreground"
                }`
              }
            >
              Metas
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/presupuestos"
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "border-b-2 border-primary text-primary transition-colors duration-500"
                    : "text-muted-foreground"
                }`
              }
            >
              Presupuestos
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/analisis"
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "border-b-2 border-primary text-primary transition-colors duration-500"
                    : "text-muted-foreground"
                }`
              }
            >
              Analisis
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="hover:cursor-pointer">
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto px-2">
          <DropdownMenuLabel className="pb-4">Acciones</DropdownMenuLabel>
          <DropdownMenuGroup className="flex flex-col gap-2">
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

export default Navbar;
