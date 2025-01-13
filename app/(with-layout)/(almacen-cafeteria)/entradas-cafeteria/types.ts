import { ProductoCafeteria } from '../inventario-cafeteria/types';
import { Usuario } from '../../users/types';

export enum METODOS_PAGO {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  MIXTO = 'MIXTO',
}

export interface ProductoEntrada {
  id: number;
  nombre: string;
}

interface ProductosInEntrada {
  id: number;
  producto: ProductoCafeteria;
  cantidad: number;
}
export interface EntradaCafeteria {
  id: number;
  usuario: Usuario;
  created_at: string;
  metodo_pago: METODOS_PAGO;
  proveedor: string;
  comprador: string;
  productos: ProductosInEntrada[];
}
