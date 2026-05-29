import { Navigate, Outlet } from "react-router-dom";
import AppProvider from "@/context/appProvider";
import { useAuthContext } from "@/context/useAuthContext";

function ProtectedRoutes() {
  const { user, loadingAuth } = useAuthContext();
  if (loadingAuth)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Cargando
      </div>
    );
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <AppProvider>
        <Outlet />
      </AppProvider>
    );
  }
}

export default ProtectedRoutes;
