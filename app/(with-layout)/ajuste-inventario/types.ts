interface ProductosAjustes {
  descripcion: string;
  total_transfers: number;
}

export interface AjusteInventario {
  id: number;
  created_at: string;
  usuario: { id: number; username: string };
  productos: ProductosAjustes[];
  motivo: string;
}
