export interface Salida {
  id: number;
  usuario: string;
  createdAt: string;
  destino: string;
  producto: number;
  cantidad: number;
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

export interface ResponseDetalleSalida {
  id: number;
  nombre: string;
  cantidad: number;
}
