import { cookies } from "next/headers";
import { ReportesSearchParams } from "./page";
import { inventarioAreaventa, inventarioCategorias } from "@/db/schema";
import { db } from "@/db/initial";
import { ReporteFormData } from "./types";

export async function getReporteFormData(): Promise<{
  data: ReporteFormData | null;
  error: string | null;
}> {
  try {
    const [areas, categorias] = await Promise.all([
      await db
        .select({
          id: inventarioAreaventa.id,
          nombre: inventarioAreaventa.nombre,
        })
        .from(inventarioAreaventa),
      await db.select().from(inventarioCategorias),
    ]);
    return {
      error: null,
      data: {
        areas,
        categorias,
      },
    };
  } catch (e) {
    return {
      data: null,
      error: "Error al conectar con el servidor.",
    };
  }
}

export async function getReporteCafeteria(params: ReportesSearchParams) {
  if (
    !params.type ||
    (params.type === "ventas" && (!params.desde || !params.hasta))
  )
    return {
      data: null,
      error: null,
    };
  const token = cookies().get("session")?.value;
  const baseUrl = process.env.BACKEND_URL_V2 + "/cafeteria/reportes/";
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );
  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: "Credenciales inválidas" };
      return { data: null, error: "Algo salió mal." };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: "Error al conectar con el servidor.",
    };
  }
}
