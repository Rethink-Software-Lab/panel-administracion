import { Categoria } from '@/app/(with-layout)/categorias/types';

export interface ProductInfo {
  id: number;
  imagen: string | null;
  descripcion: string;
  categoria: Categoria;
  precio_costo: string | null;
  precio_venta: string | null;
  pago_trabajador: number;
}

export interface EndpointProductos {
  productos: ProductInfo[];
  categorias: Categoria[];
}
