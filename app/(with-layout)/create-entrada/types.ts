interface Numero {
  numero: number;
  ids: string;
}

export interface Variantes {
  color: string;
  numeros: Numero[];
}

export interface DataInResponseAddEntrada {
  zapato: string;
  variantes: Variantes[];
}

export interface ResponseCreateEntrada {
  error: string | null;
  data: DataInResponseAddEntrada[] | null;
}

export interface ProductoInfoCreateEntrada {
  id: number;
  descripcion: string;
  categoria: string | null;
}

export interface CuentasCreateEntrada {
  id: number;
  nombre: string;
  tipo: string;
  banco: string | null;
}

export interface ProveedorCreateEntrada {
  id: number;
  nombre: string;
}
export interface EndpointFormEntrada {
  productos: ProductoInfoCreateEntrada[];
  cuentas: CuentasCreateEntrada[];
  proveedores: ProveedorCreateEntrada[];
}
