import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { UserType } from "@/types";
import { refreshAccessToken } from "@/api/api";
import { clearAccessToken, setAccessToken } from "@/api/auth";

type ProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: ProviderProps) {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<UserType | null>(() => {
    const usuario = localStorage.getItem("user");
    return usuario ? JSON.parse(usuario) : null;
  });
  useEffect(() => {
    const iniciarSesion = async () => {
      try {
        const token = await refreshAccessToken();
        setAccessToken(token);
      } catch {
        clearAccessToken();
      } finally {
        setLoadingAuth(false);
      }
    };
    iniciarSesion();
  }, []);
  if (loadingAuth)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Cargando
      </div>
    );
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
