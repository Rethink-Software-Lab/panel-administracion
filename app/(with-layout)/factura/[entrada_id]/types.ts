export interface ProductoFactura {
  codigo: string;
  cantidad: number;
  precio_unitario: number;
  importe: number;
}

export interface Factura {
  id: number;
  createdAt: string;
  updatedAt: string;
  usuarioId: number;
  proveedor: string;
  comprador: string;
  productos: ProductoFactura[];
}
