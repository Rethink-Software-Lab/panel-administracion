import { ProductInfo } from '../products/types';
import { Tarjetas } from '../tarjetas/types';

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

export interface EndpointFormEntrada {
  productos: ProductInfo[];
  cuentas: Tarjetas[];
}
