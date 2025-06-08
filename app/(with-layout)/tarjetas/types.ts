import { Usuario } from '../users/types';

export enum Banco {
  BPA = 'BPA',
  BANDEC = 'BANDEC',
}

export enum TipoTransferencia {
  INGRESO = 'INGRESO',
  EGRESO = 'EGRESO',
}

export enum TipoCuenta {
  EFECTIVO = 'EFECTIVO',
  BANCARIA = 'BANCARIA',
}

export interface Tarjetas {
  id: number;
  nombre: string;
  tipo: TipoCuenta;
  banco: Banco;
  saldo: number;
  total_transferencias_mes: number;
}

export interface Transferenciastarjetas {
  id: number;
  cantidad: number;
  descripcion: string;
  created_at: string;
  cuenta: Tarjetas;
  tipo: TipoTransferencia;
  usuario: Usuario;
  venta: number | null;
  venta_cafeteria: number | null;
}

export interface ResponseTarjetas {
  tarjetas: Tarjetas[];
  transferencias: Transferenciastarjetas[];
  total_balance: number;
}
