import { METODOS_PAGO } from '../(almacen-cafeteria)/entradas-cafeteria/types';

export interface Entrada {
  id: number;
  metodo_pago: METODOS_PAGO;
  proveedor: string;
  comprador: string;
  usuario__username: string;
  producto__info__descripcion: string;
  created_at: string;
  cantidad: number;
}
