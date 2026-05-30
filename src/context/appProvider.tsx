import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AppContext } from "./appContext";
import type { CategoriasType, ResumenCuentasType, MetasType } from "@/types";
import { apiRequest } from "@/api/api";
// import { useNavigate } from "react-router-dom";

type ProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: ProviderProps) {
  // const navigate = useNavigate();
  const [categorias, setCategorias] = useState<CategoriasType[]>(() => {
    const listaCategorias = localStorage.getItem("categorias");
    return listaCategorias ? JSON.parse(listaCategorias) : [];
  });
  const [metas, setMetas] = useState<MetasType[]>([]);
  const [cuentas, setCuentas] = useState<ResumenCuentasType[]>([]);

  const obtenerCuentas = async () => {
    const resultado = await apiRequest("GET", "cuentas");
    if (resultado.success) {
      setCuentas(resultado.data.result);
    } else {
      console.log("Error al obtener cuentas:");
      console.error(resultado.data);
      // if (
      //   resultado.data.message === "Sesion no iniciada" ||
      //   resultado.data.message === "Sesion expirada"
      // )
      //   navigate("/login");
    }
  };
  const obtenerCategorias = async () => {
    if (categorias.length === 0) {
      const resultado = await apiRequest("GET", "categorias");
      if (resultado.success) {
        setCategorias(resultado.data.result);
        localStorage.setItem(
          "categorias",
          JSON.stringify(resultado.data.result),
        );
      } else {
        console.log("Error al obtener categorias:");
        console.error(resultado.data.result);
        // if (
        //   resultado.data.message === "Sesion no iniciada" ||
        //   resultado.data.message === "Sesion expirada"
        // )
        //   navigate("/login");
      }
    }
  };
  const obtenerMetas = async () => {
    const resultado = await apiRequest("GET", "metas");
    if (resultado.success) {
      setMetas(resultado.data.result);
    } else {
      console.log("Error al obtener metas:");
      console.error(resultado.data);
      // if (
      //   resultado.data.message === "Sesion no iniciada" ||
      //   resultado.data.message === "Sesion expirada"
      // )
      //   navigate("/login");
    }
  };
  useEffect(() => {
    const getDatos = async () => {
      await Promise.all([
        obtenerCuentas(),
        obtenerCategorias(),
        obtenerMetas(),
      ]);
    };
    getDatos();
  }, []);
  return (
    <AppContext.Provider
      value={{
        categorias,
        setCategorias,
        cuentas,
        setCuentas,
        obtenerCuentas,
        // obtenerCategorias,
        metas,
        setMetas,
        obtenerMetas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
