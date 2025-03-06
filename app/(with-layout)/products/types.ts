import { Categoria } from '@/app/(with-layout)/categorias/types';

interface Imagen {
  url: string;
}
export interface ProductInfo {
  id: number;
  codigo: string;
  imagen: Imagen | null;
  descripcion: string;
  categoria: Omit<Categoria, 'color'>;
  precio_costo: string;
  precio_venta: string;
  pago_trabajador: number;
}

export interface EndpointProductos {
  productos: ProductInfo[];
  categorias: Categoria[];
}
