import { createContext } from "react";
import type { CategoriasType, ResumenCuentasType } from "@/types";
import type { MetasType } from "@/types/metas";

type AppContextType = {
  categorias: CategoriasType[];
  setCategorias: React.Dispatch<React.SetStateAction<CategoriasType[]>>;
  cuentas: ResumenCuentasType[];
  setCuentas: React.Dispatch<React.SetStateAction<ResumenCuentasType[]>>;
  metas: MetasType[];
  setMetas: React.Dispatch<React.SetStateAction<MetasType[]>>;
  obtenerCuentas: () => Promise<void>;
  obtenerCategorias: () => Promise<void>;
  obtenerMetas: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
