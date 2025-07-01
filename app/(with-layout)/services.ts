import { cookies } from "next/headers";
import { ResponseNoRepresentados, ResponseSearchProducts } from "./types";
import { db } from "@/db/initial";
import {
  inventarioProducto,
  inventarioProductoinfo,
  inventarioProductosCafeteria,
} from "@/db/schema";
import { count, eq, gt, isNull, sql } from "drizzle-orm";

export async function getNoRepresentados(): Promise<{
  data: ResponseNoRepresentados[] | null;
  error: string | null;
}> {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + "/no-representados/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const noRepresentados = await res.json();

    return { data: noRepresentados, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al conectar con el servidor." };
  }
}

export async function getProductosToSearch(): Promise<{
  data: ResponseSearchProducts[] | null;
  error: string | null;
}> {
  try {
    const productosSalon = await db
      .select({
        id: inventarioProductoinfo.id,
        nombre: inventarioProductoinfo.descripcion,
        isCafeteria: sql<boolean>`false`,
      })
      .from(inventarioProductoinfo);

    const productosCafeteria = await db
      .select({
        id: inventarioProductosCafeteria.id,
        nombre: inventarioProductosCafeteria.nombre,
        isCafeteria: sql<boolean>`true`,
      })
      .from(inventarioProductosCafeteria);

    const productos = [...productosSalon, ...productosCafeteria];

    return { data: productos, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "Error al conectar con el servidor." };
  }
}
