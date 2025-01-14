import { Usuario } from '../../users/types';
import { Elaboraciones } from '../elaboraciones/types';
import { Productos_Elaboraciones } from '../ventas-cafeteria/types';

interface Producto {
  id: number;
  nombre: string;
}

interface ProductoSalida {
  producto: Producto;
  cantidad: number;
}

interface ElaboracionSalida {
  id: number;
  producto: Elaboraciones;
  cantidad: number;
}
export interface SalidasCafeteria {
  id: number;
  created_at: string;
  usuario: Usuario;
  productos: ProductoSalida[];
  elaboraciones: ElaboracionSalida[];
}

export interface ResponseSalidasCafeteria {
  salidas: SalidasCafeteria[];
  productos_elaboraciones: Productos_Elaboraciones[];
}
