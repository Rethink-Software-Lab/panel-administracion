export interface SalidasRevoltosa {
  id: number;
  created_at: string;
  producto__info__descripcion: string;
  cantidad: number;
  usuario__username: string;
}

export interface CreateSalidaRevoltosa {
  producto_info: string;
  cantidad?: number;
  zapatos_id?: string[];
}
