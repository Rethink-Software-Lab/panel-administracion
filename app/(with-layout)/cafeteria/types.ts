import {
  METODOS_PAGO,
  ProductoEntrada,
} from '../(almacen-cafeteria)/entradas-cafeteria/types';
import { TarjetasVentas } from '../(almacen-cafeteria)/ventas-cafeteria/types';
import { Tarjetas } from '../tarjetas/types';
import { Usuario } from '../users/types';

interface InventarioCafeteria {
  id: number;
  cantidad: number;
}

export interface ProductoCafeteria {
  id: number;
  nombre: string;
  precio_venta: number;
  inventario_cafeteria: InventarioCafeteria;
}

interface Prod_Elab_Venta {
  producto: ProductoEntrada;
  cantidad: number;
}

export interface Productos_Elaboraciones {
  id: number;
  nombre: string;
  isElaboracion: boolean;
}
export interface VentasCafeteria {
  id: number;
  created_at: string;
  usuario: Usuario;
  metodo_pago: METODOS_PAGO;
  productos: Prod_Elab_Venta[];
  elaboraciones: Prod_Elab_Venta[];
  tarjeta: string | null;
}

export interface ResponseCafeteria {
  inventario: ProductoCafeteria[];
  ventas: VentasCafeteria[];
  tarjetas: TarjetasVentas[];
  productos_elaboraciones: Productos_Elaboraciones[];
}
