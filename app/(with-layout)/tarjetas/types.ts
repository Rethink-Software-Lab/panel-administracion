import { Usuario } from '../users/types';

interface BalanceTarjetas {
  id: number;
  valor: number;
}

export enum Banco {
  BPA = 'BPA',
  BANDEC = 'BANDEC',
}

export enum TipoTransferencia {
  INGRESO = 'INGRESO',
  EGRESO = 'EGRESO',
}

export interface Tarjetas {
  id: number;
  nombre: string;
  banco: Banco;
  balance: BalanceTarjetas;
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
