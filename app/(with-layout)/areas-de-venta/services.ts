import { db } from "@/db/initial";
import { inventarioAreaventa } from "@/db/schema";
import { AreaVenta } from "./types";

export async function getAreasVentas(): Promise<{
  data: AreaVenta[] | null;
  error: string | null;
}> {
  try {
    const areas = await db.select().from(inventarioAreaventa);
    return {
      data: areas,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "Error al obtener las áreas de venta.",
    };
  }
}
