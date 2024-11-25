import { AreaVenta } from '../areas-de-venta/types';

export interface Usuario {
  id: number;
  username: string;
  rol: string;
  area_venta_id: AreaVenta | null;
}

export enum ALMACENES {
  PRINCIPAL = 'PRINCIPAL',
  CAFETERIA = 'CAFETERIA',
  REVOLTOSA = 'REVOLTOSA',
}

export enum ROLES {
  ADMIN = 'ADMIN',
  ALMACENERO = 'ALMACENERO',
  VENDEDOR = 'VENDEDOR',
}
