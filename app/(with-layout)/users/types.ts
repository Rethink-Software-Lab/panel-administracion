import { AreaVenta } from '../areas-de-venta/types';

export interface Usuario {
  id: number;
  username: string;
  rol: string;
  area_venta_id: AreaVenta | null;
}
