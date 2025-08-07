import { AreaVenta } from "../areas-de-venta/types";

interface ProductosAjustes {
  id: number;
  descripcion: string;
  total_transfers: number;
}

export interface AjusteInventario {
  id: number;
  created_at: string;
  usuario: string;
  productos: ProductosAjustes[];
  motivo: string;
}

export interface ProductoInfoParaAjuste {
  id: number;
  descripcion: string;
  isZapato: boolean;
}

export interface ResponseAjusteInventario {
  ajustes: AjusteInventario[];
  areas_ventas: AreaVenta[];
  productos_info: ProductoInfoParaAjuste[];
}
