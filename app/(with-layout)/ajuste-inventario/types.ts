import { AreaVenta } from '../areas-de-venta/types';
import { ProductInfo } from '../products/types';

interface ProductosAjustes {
  descripcion: string;
  total_transfers: number;
}

export interface AjusteInventario {
  id: number;
  created_at: string;
  usuario: { id: number; username: string };
  productos: ProductosAjustes[];
  motivo: string;
}

export interface ResponseAjusteInventario {
  ajustes: AjusteInventario[];
  areas_ventas: AreaVenta[];
  productos_info: ProductInfo[];
}
