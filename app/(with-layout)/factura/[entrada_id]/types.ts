import { Proveedor } from "../../proveedores/types";

export interface ProductoFactura {
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  importe: number;
}

export interface Factura {
  createdAt: string;
  proveedor: Proveedor;
  productos: ProductoFactura[];
}
