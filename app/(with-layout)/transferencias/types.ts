import { AreaVenta } from '../areas-de-venta/types';

export interface ProductosTransfer {
  descripcion: string;
  total_transfers: number;
}

interface Usuario {
  id: number;
  username: string;
}
export interface Transferencia {
  id: number;
  created_at: string;
  de: AreaVenta;
  para: AreaVenta;
  usuario: Usuario;
  productos: ProductosTransfer[];
}
