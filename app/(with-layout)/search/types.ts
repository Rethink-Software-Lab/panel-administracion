import { METODOS_PAGO } from "../(almacen-cafeteria)/entradas-cafeteria/types";

export enum TipoMovimiento {
  ENTRADA = "Entrada",
  SALIDA = "Salida",
  SALIDA_REVOLTOSA = "Salida Revoltosa",
  TRANSFERENCIA = "Transferencia",
  AJUSTE = "Ajuste",
  VENTA = "Venta",
  MERMA = "Merma",
  CUENTA_CASA = "Cuenta Casa",
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
  proveedor?: string | null;
  motivo?: string;
}

export interface ResponseMovimientos {
  movimientos: Movimiento[];
  users: { username: string }[];
}

export interface SearchCafeteriaProductos {
  cafeteria: string;
  almacen: string;
}
