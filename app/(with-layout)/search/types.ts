export enum TipoMovimiento {
  ENTRADA = "Entrada",
  SALIDA = "Salida",
  SALIDA_REVOLTOSA = "Salida Revoltosa",
  TRANSFERENCIA = "Transferencia",
  AJUSTE = "Ajuste",
  VENTA = "Venta",
}

export interface Movimiento {
  createdAt: string;
  cantidad: number;
  type: TipoMovimiento;
}
