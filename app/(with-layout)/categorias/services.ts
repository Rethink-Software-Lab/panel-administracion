import { db } from "@/db/initial";
import { inventarioCategorias } from "@/db/schema";
import { Categoria } from "./types";

export async function getCategorias(): Promise<{
  data: Categoria[] | null;
  error: string | null;
}> {
  try {
    const categorias = await db.select().from(inventarioCategorias);
    return { data: categorias, error: null };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al obtener las categorias.",
    };
  }
}
