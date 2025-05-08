import { Categoria } from '../../categorias/types';

export interface Zapatos {
  id: number;
  codigo: string;
  descripcion: string;
  color: string | null;
  numero: string | null;
}

export interface Productos {
  id: number;
  codigo: string;
  descripcion: string;
  precio_venta: string;
  cantidad: number;
  categoria_nombre: string | null;
}

export interface Inventario {
  productos: Productos[];
  zapatos: Zapatos[];
  categorias: Categoria[];
}

interface UsuarioVentas {
  id: number;
  username: string;
}
export interface Ventas {
  id: number;
  created_at: string;
  importe: number;
  metodo_pago: string;
  usuario: UsuarioVentas;
  descripcion: string;
  cantidad: number;
}

export interface Tarjetas {
  id: number;
  nombre: string;
  banco: string;
  disponible: boolean;
}

export interface AllProductos {
  id: number;
  codigo: string;
  descripcion: string;
  categoria: string;
}

export interface EndpointOneAreaVenta {
  inventario: Inventario;
  ventas: Ventas[];
  area_venta: string;
  all_productos: AllProductos[];
  tarjetas: Tarjetas[];
}
