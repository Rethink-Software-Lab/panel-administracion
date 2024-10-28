import { Usuario } from '../users/types';

export enum TiposGastos {
  FIJO = 'FIJO',
  VARIABLE = 'VARIABLE',
}

export enum FrecuenciasGastos {
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL',
}

export interface Gasto {
  id: number;
  descripcion: string;
  created_at: string;
  cantidad: number;
  tipo: TiposGastos;
  frecuencia: FrecuenciasGastos | null;
  dia_mes: number | null;
  usuario: Usuario | null;
  dia_semana: number | null;
}
