import { AreaVenta } from "../areas-de-venta/types";

export interface ProductosTransfer {
  id: number;
  descripcion: string;
  total_transfers: number;
}

export interface Transferencia {
  id: number;
  created_at: string;
  de: string | null;
  para: string | null;
  usuario: string | null;
  productos: ProductosTransfer[];
}

export interface ProductoInfoInTransferencia {
  id: number;
  descripcion: string;
  isZapato: boolean;
}

export interface ResponseTransferencias {
  transferencias: Transferencia[];
  areas_ventas: AreaVenta[];
  productos_info: ProductoInfoInTransferencia[];
}
