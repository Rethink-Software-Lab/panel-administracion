import { AreaVenta } from '../areas-de-venta/types';
import { Usuario } from '../users/types';

export enum TiposGastos {
  FIJO = 'FIJO',
  VARIABLE = 'VARIABLE',
}

export enum FrecuenciasGastos {
  LUNES_SABADO = 'LUNES_SABADO',
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL',
}

export interface Gasto {
  id: number;
  descripcion: string;
  created_at: string;
  cantidad: number;
  area_venta: AreaVenta;
  tipo: TiposGastos;
  frecuencia: FrecuenciasGastos | null;
  dia_mes: number | null;
  usuario: Usuario | null;
  dia_semana: number | null;
}
