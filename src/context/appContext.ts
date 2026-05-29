import { createContext } from "react";
import type { CategoriasType, ResumenCuentasType } from "@/types";
import type { MetasType } from "@/types/metas";

type AppContextType = {
  categorias: CategoriasType[] | null;
  setCategorias: React.Dispatch<React.SetStateAction<CategoriasType[] | null>>;
  cuentas: ResumenCuentasType[] | null;
  setCuentas: React.Dispatch<React.SetStateAction<ResumenCuentasType[] | null>>;
  metas: MetasType[];
  setMetas: React.Dispatch<React.SetStateAction<MetasType[]>>;
  obtenerCuentas: () => Promise<void>;
  obtenerCategorias: () => Promise<void>;
  obtenerMetas: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
