export enum TipoMovimiento {
  ENTRADA = "Entrada",
  SALIDA = "Salida",
  TRANSFERENCIA = "Transferencia",
  AJUSTE = "Ajuste",
  VENTA = "Venta",
}

export interface Movimiento {
  createdAt: string;
  cantidad: number;
  type: TipoMovimiento;
}
