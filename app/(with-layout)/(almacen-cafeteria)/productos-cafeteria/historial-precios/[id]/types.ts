export interface HistorialPrecios {
  id: number;
  fecha_inicio: string;
  usuario: string | null;
  precio: string | null;
}

export interface EndPointHistorialPrecios {
  precios_costo: HistorialPrecios[];
  precios_venta: HistorialPrecios[];
}

export enum TipoPrecio {
  PRECIO_COSTO = 'precio_costo',
  PRECIO_VENTA = 'precio_venta',
}
