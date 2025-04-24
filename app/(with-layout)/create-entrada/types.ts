import { Proveedor } from '../proveedores/types';
import { Banco } from '../tarjetas/types';

interface Numero {
  numero: number;
  ids: string;
}

interface Data {
  color: string;
  numeros: Numero[];
}

export interface ResponseCreateEntrada {
  error: string | null;
  data: Data | null;
}

export interface ProductoInfoCreateEntrada {
  id: number;
  codigo: string;
  categoria: string | null;
}

interface CuentasCreateEntrada {
  id: number;
  nombre: string;
  banco: string | null;
}

interface ProveedorCreateEntrada {
  id: number;
  nombre: string;
}
export interface EndpointFormEntrada {
  productos: ProductoInfoCreateEntrada[];
  cuentas: CuentasCreateEntrada[];
  proveedores: ProveedorCreateEntrada[];
}
