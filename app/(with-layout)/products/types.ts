import { Categoria } from '@/app/(with-layout)/categorias/types';

export interface ProductInfo {
  id: number;
  codigo: string;
  descripcion: string;
  categoria: Omit<Categoria, 'color'>;
  precio_costo: string;
  precio_venta: string;
  pago_trabajador: number;
}
