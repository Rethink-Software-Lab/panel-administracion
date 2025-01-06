import { Banco, Tarjetas } from '../../tarjetas/types';
import { Usuario } from '../../users/types';
import { METODOS_PAGO, ProductoEntrada } from '../entradas-cafeteria/types';

interface Prod_Elab_Venta {
  producto: ProductoEntrada;
  cantidad: number;
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

export interface Productos_Elaboraciones {
  id: number;
  nombre: string;
  isElaboracion: boolean;
}

export interface TarjetasVentas {
  id: number;
  nombre: string;
  banco: Banco;
  isAvailable: boolean;
}

export interface ResponseVentasCafeteria {
  ventas: VentasCafeteria[];
  productos_elaboraciones: Productos_Elaboraciones[];
  tarjetas: TarjetasVentas[];
}
