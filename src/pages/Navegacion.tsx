import HamburgerMenu from "@/components/generic/hamburger";
import Navbar from "@/components/generic/navbar";
import { useAuthContext } from "@/context/useAuthContext";
import { useMobile } from "@/hooks/useMobile";
import { Outlet } from "react-router-dom";

function Navegacion() {
  const isMobile = useMobile();
  const { user } = useAuthContext();
  return (
    <div>
      {!isMobile && <Navbar />}
      {isMobile && <HamburgerMenu />}
      {!user?.verificado && (
        <div className="w-full flex justify-center items-center py-8 font-medium text-md text-red-500 border-2 shadow-lg">
          Usuario no verificado, por favor revise su email o pongase en contacto
          con soporte técnico
        </div>
      )}
      <Outlet />
    </div>
  );
}
export default Navegacion;
