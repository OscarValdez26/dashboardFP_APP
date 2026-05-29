export type MovimientosType = {
  idCuenta: number;
  cuenta: string;
  tipoMovimiento: string;
  categoriaMovimiento: string;
  descripcionMovimiento: string;
  cantidadMovimiento: string;
  fechaMovimiento: string;
  cuentaOrigen?: number;
  cuentaDestino?: number;
  color?: string;
};
