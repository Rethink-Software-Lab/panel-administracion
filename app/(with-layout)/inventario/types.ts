import { Productos } from '../areas-de-venta/[id]/types';
import { Categoria } from '../categorias/types';

export interface Zapatos {
  id: number;
  info__codigo: string;
  info__descripcion: string;
  color: string;
  numero: number;
}

interface Inventario {
  productos: Productos[];
  zapatos: Zapatos[];
}

export interface EndpointInventario {
  inventario: Inventario;
  categorias: Categoria[];
}
