export type PresupuestosType = {
  idPresupuesto: number;
  categoria: string;
  tipoPresupuesto: "monto" | "porcentaje";
  cantidadPresupuesto: string;
  porcentaje?: number;
};
