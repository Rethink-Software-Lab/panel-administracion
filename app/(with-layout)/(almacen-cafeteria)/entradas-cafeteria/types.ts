import { Usuario } from '../../users/types';
import { Tarjetas } from '../../tarjetas/types';
import { Proveedor } from '../../proveedores/types';

export enum METODOS_PAGO {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  MIXTO = 'MIXTO',
}

export interface ProductoEntrada {
  id: number;
  nombre: string;
  precio_costo: number;
  precio_venta: number;
}

interface ProductosInEntrada {
  id: number;
  producto: ProductoEntrada;
  cantidad: number;
}

export interface EntradaCafeteria {
  id: number;
  usuario: Usuario;
  created_at: string;
  metodo_pago: METODOS_PAGO;
  proveedor: Proveedor;
  proveedor_nombre: string | null;
  proveedor_nit: string | null;
  proveedor_telefono: string | null;
  proveedor_direccion: string | null;
  proveedor_no_cuenta_cup: string | null;
  proveedor_no_cuenta_mayorista: string | null;
  comprador: string;
  productos: ProductosInEntrada[];
}

export interface EndpointEntradasCafeteria {
  productos: ProductoEntrada[];
  entradas: EntradaCafeteria[];
  cuentas: Tarjetas[];
  proveedores: Pick<Proveedor, 'id' | 'nombre'>[];
}
