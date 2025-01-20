import { Elaboraciones } from '../(almacen-cafeteria)/elaboraciones/types';
import { ProductoCafeteria, Productos_Elaboraciones } from '../cafeteria/types';
import { Usuario } from '../users/types';

interface Producto_Cantidad_CuentaCasa {
  id: number;
  producto: ProductoCafeteria;
  cantidad: number;
}

interface Elaboracion_Cantidad_CuentaCasa {
  id: number;
  producto: Elaboraciones;
  cantidad: number;
}

export interface CuentaCasa {
  id: number;
  created_at: string;
  productos: Producto_Cantidad_CuentaCasa[];
  elaboraciones: Elaboracion_Cantidad_CuentaCasa[];
  usuario: Usuario;
  is_almacen: boolean;
  cantidad_productos: number;
  cantidad_elaboraciones: number;
}

export interface EndpointCuentaCasa {
  productos_elaboraciones: Productos_Elaboraciones[];
  cuenta_casa: CuentaCasa[];
}
