interface InventarioAlmacenCafeteria {
  id: number;
  cantidad: number;
}

export interface ProductoCafeteria {
  id: number;
  nombre: string;
  precio_costo: number;
  precio_venta: number;
  inventario_almacen: InventarioAlmacenCafeteria;
}
