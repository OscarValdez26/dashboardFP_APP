import type { IconosType } from "@/lib/iconos";

export type MetasType = {
  idMeta: number;
  idCuenta: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaLimite: string;
  saldo: string;
  objetivo: string;
  icono?: IconosType;
  progreso: string;
};
