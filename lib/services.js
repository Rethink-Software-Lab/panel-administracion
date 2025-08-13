import { cookies } from "next/headers";

export async function getUsuarios() {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + "/usuarios/", {
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
      error: "No se pudo conectar con el servidor.",
    };
  }
}

export async function getSalidasRevoltosa() {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + "/salidas-revoltosa/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["salidas-revoltosa"],
        },
      }
    );
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

export async function inventarioAreaVenta({ id }) {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + "/inventario/area-venta/" + id + "/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function inventarioAlmacenRevoltosa() {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + "/inventario/almacen-revoltosa/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function getVenta(id) {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + "/ventas/" + id + "/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function searchProduct(params) {
  const token = cookies().get("session")?.value;
  const baseUrl = process.env.BACKEND_URL_V2 + "/search/";
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + `/search/?id=${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function graficas() {
  const token = cookies().get("session")?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + "/graficas/", {
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

export async function getReporte(params) {
  if (
    !params.type ||
    (params.type === "ventas" && (!params.desde || !params.hasta))
  )
    return {
      data: null,
      error: null,
    };
  const token = cookies().get("session")?.value;
  const baseUrl = process.env.BACKEND_URL_V2 + "/reportes/";
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
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

export async function getGastos() {
  const token = cookies().get("session")?.value;

  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + "/gastos/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["gastos"] },
    });
    if (!res.ok) {
      if (res.status === 401) return { data: null, error: "No autorizado" };
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
