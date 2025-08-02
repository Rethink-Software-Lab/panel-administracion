"use server";

import { db } from "@/db/initial";
import { inventarioCategorias } from "@/db/schema";
import { onlyNombreSchema } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { InferInput } from "valibot";

export async function addCategoria(
  data: InferInput<typeof onlyNombreSchema>
): Promise<{ data: string | null; error: string | null }> {
  try {
    await db.insert(inventarioCategorias).values(data);
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al crear la categoria" };
  }
  revalidatePath("/categorias");
  return { data: "Categoria creada exitosamente", error: null };
}

export async function updateCategoria(
  data: InferInput<typeof onlyNombreSchema>,
  id: number
): Promise<{ data: string | null; error: string | null }> {
  try {
    await db
      .update(inventarioCategorias)
      .set(data)
      .where(eq(inventarioCategorias.id, id));
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al actualizar la categoria" };
  }

  revalidatePath("/categorias");
  return {
    error: null,
    data: "Categoría editada con éxito.",
  };
}

export async function deleteCategoria({
  id,
}: {
  id: number;
}): Promise<{ data: string | null; error: string | null }> {
  try {
    await db
      .delete(inventarioCategorias)
      .where(eq(inventarioCategorias.id, id));
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al eliminar la categoria" };
  }

  revalidatePath("/categorias");
  return {
    data: "Categoría eliminada con éxito.",
    error: null,
  };
}
