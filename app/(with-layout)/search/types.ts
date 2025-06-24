import { METODOS_PAGO } from "../(almacen-cafeteria)/entradas-cafeteria/types";

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
  user: string | null;
  areaVenta?: string;
  metodoPago?: METODOS_PAGO;
  desde?: string;
  hacia?: string;
  proveedor?: string;
  motivo?: string;
}
