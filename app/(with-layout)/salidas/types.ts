export interface DetalleSalida {
  id: number;
  nombre: string;
  cantidad: number;
  esZapato: boolean;
  zapatos_id: string;
}

interface Destino {
  id: number;
  nombre: string;
}

export interface Salida {
  id: number;
  usuario: string;
  createdAt: string;
  destino: Destino;
  producto: number;
  cantidad: number;
  detalle: DetalleSalida[];
}

export interface ProductoSalida {
  id: number;
  nombre: string;
  esZapato: boolean;
}

export interface AreaVentaSalida {
  id: number;
  nombre: string;
}

export interface ResponseSalidas {
  salidas: Salida[];
  productos: ProductoSalida[];
  areasVenta: AreaVentaSalida[];
}
