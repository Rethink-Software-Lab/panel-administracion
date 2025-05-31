interface Ingrediente {
  id: number;
  nombre: string;
}

interface Ingredientes_Cantidad {
  ingrediente: Ingrediente;
  cantidad: number;
}

export interface Elaboraciones {
  id: number;
  nombre: string;
  precio: number;
  mano_obra: number;
  ingredientes_cantidad: Ingredientes_Cantidad[];
}

export interface PrecioElaboracion {
  id: number;
  precio: string;
  usuario: string;
  fecha_inicio: string;
}
