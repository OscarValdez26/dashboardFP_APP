import type { UserType } from "@/types";
import { createContext } from "react";

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loadingAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
