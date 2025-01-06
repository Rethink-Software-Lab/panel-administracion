interface InventarioCafeteria {
  id: number;
  cantidad: number;
}

export interface ProductoCafeteria {
  id: number;
  nombre: string;
  precio_venta: number;
  inventario: InventarioCafeteria;
}
