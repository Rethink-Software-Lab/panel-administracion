export enum TipoMovimiento {
  ENTRADA = "Entrada",
  SALIDA = "Salida",
}

export interface Movimiento {
  createdAt: string;
  cantidad: number;
  type: TipoMovimiento;
}
