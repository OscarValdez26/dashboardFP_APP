import { apiRequest } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/useAppContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";
import { clearAccessToken } from "@/api/auth";

function LogoutButton() {
  const { setUser } = useAuthContext();
  const { setCategorias, setCuentas, setMetas } = useAppContext();
  const navigate = useNavigate();
  const logout = async () => {
    await apiRequest("POST", "usuarios/logout", {});
    setUser(null);
    setCategorias([]);
    setCuentas([]);
    setMetas([]);
    localStorage.clear();
    clearAccessToken();
    navigate("/login");
  };
  return (
    <Button
      className="w-40 hover:cursor-pointer"
      variant="destructive"
      onClick={logout}
    >
      Cerrar Sesion
    </Button>
  );
}

export default LogoutButton;
