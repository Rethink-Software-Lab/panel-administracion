import { Usuario } from '../../users/types';
import { ProductoEntrada } from '../entradas-cafeteria/types';

interface Producto {
  id: number;
  nombre: string;
}

interface ProductoSalida {
  producto: Producto;
  cantidad: number;
}

export interface SalidasCafeteria {
  id: number;
  created_at: string;
  usuario: Usuario;
  productos: ProductoSalida[];
}

export interface ResponseSalidasCafeteria {
  salidas: SalidasCafeteria[];
  productos: ProductoEntrada[];
}
