import { AreaVenta } from '../areas-de-venta/types';

export enum ROLES {
  ADMIN = 'ADMIN',
  ALMACENERO = 'ALMACENERO',
  VENDEDOR = 'VENDEDOR',
  VENDEDOR_CAFETERIA = 'VENDEDOR CAFETERÍA',
  SUPERVISOR = 'SUPERVISOR',
}

export enum ALMACENES {
  PRINCIPAL = 'PRINCIPAL',
  CAFETERIA = 'CAFETERIA',
  REVOLTOSA = 'REVOLTOSA',
}

export interface Usuario {
  id: number;
  username: string;
  rol: ROLES;
  area_venta: AreaVenta | null;
  almacen: ALMACENES | null;
}
