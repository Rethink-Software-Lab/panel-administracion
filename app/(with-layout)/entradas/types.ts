import { METODOS_PAGO } from '../(almacen-cafeteria)/entradas-cafeteria/types';

export interface Entrada {
  id: number;
  metodo_pago: METODOS_PAGO;
  nombre_proveedor: string;
  comprador: string;
  username: string;
  descripcion_producto: string;
  fecha: string;
  cantidad: number;
}
