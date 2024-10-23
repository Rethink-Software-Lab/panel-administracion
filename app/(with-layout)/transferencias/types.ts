import { AreaVenta } from '../areas-de-venta/types';

export interface ProductosTransfer {
  descripcion: string;
  total_transfers: number;
}

export interface Transferencia {
  id: number;
  created_at: string;
  de: AreaVenta;
  para: AreaVenta;
  usuario: { id: number; username: string }; // TODO UsuarioType
  productos: ProductosTransfer[];
}
