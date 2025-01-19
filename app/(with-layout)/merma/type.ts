import { Elaboraciones } from '../(almacen-cafeteria)/elaboraciones/types';
import { ProductoCafeteria, Productos_Elaboraciones } from '../cafeteria/types';
import { Usuario } from '../users/types';

interface Producto_Cantidad_Merma {
  id: number;
  producto: ProductoCafeteria;
  cantidad: number;
}

interface Elaboracion_Cantidad_Merma {
  id: number;
  producto: Elaboraciones;
  cantidad: number;
}

export interface Merma {
  id: number;
  created_at: string;
  productos: Producto_Cantidad_Merma[];
  elaboraciones: Elaboracion_Cantidad_Merma[];
  usuario: Usuario;
  is_almacen: boolean;
  cantidad_productos: number;
  cantidad_elaboraciones: number;
}

export interface EndpointMerma {
  merma: Merma[];
  productos_elaboraciones: Productos_Elaboraciones[];
}

export enum LOCALACIONES {
  CAFETERIA = 'cafeteria',
  ALMACEN_CAFETERIA = 'almacen-cafeteria',
}
