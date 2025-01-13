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
