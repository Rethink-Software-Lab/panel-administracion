"use server";

import { db } from "@/db/initial";
import { inventarioAreaventa } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { InferInput } from "valibot";
import { AreaVentaSchema } from "./schema";

export async function addArea(data: InferInput<typeof AreaVentaSchema>) {
  try {
    await db.insert(inventarioAreaventa).values(data);
  } catch (e) {
    console.error(e);
    return {
      error: "Error al agregar la área de venta.",
      data: null,
    };
  }

  revalidatePath("/areas-de-venta");
  return {
    error: null,
    data: "Área de ventas creada con éxito",
  };
}

export async function updateArea(
  id: number,
  data: InferInput<typeof AreaVentaSchema>
) {
  try {
    await db
      .update(inventarioAreaventa)
      .set(data)
      .where(eq(inventarioAreaventa.id, id));
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al editar la área de venta.",
    };
  }

  revalidatePath("/areas-de-venta");
  return {
    error: null,
    data: "Área de ventas editada con éxito.",
  };
}

export async function deleteAreaVenta({ id }: { id: number }) {
  try {
    await db.delete(inventarioAreaventa).where(eq(inventarioAreaventa.id, id));
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al eliminar la área de venta.",
    };
  }
  revalidatePath("/areas-de-venta");
  return {
    data: "Área de venta eliminada con éxito.",
    error: null,
  };
}
