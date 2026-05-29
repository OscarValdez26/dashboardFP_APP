import { useContext } from "react";
import { AppContext } from "./appContext";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext debe usarse dentro del provider");
  }

  return context;
};
