import { cookies } from 'next/headers';
import {
  ALL_ENTRADAS,
  ALL_SALIDAS,
  ALL_AREAS_VENTAS,
  USER_BY_TOKEN,
  PRODUCTOS_BY_AREA_VENTA,
  VENTAS_HOY,
  VENTAS_SEMANA,
  VENTAS_MES,
  MAS_VENDIDOS,
  GRAFICO,
  ONE_PRODUCTS_INFO,
} from '@/lib/querys';

export async function fecthBase(
  query,
  variables,
  contentType = 'application/json'
) {
  const token = cookies().get('session')?.value || null;
  try {
    const results = await fetch(process.env.BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }).then((res) => res.json());
    return results;
  } catch (e) {
    return {
      errors: [{ message: e.message }],
    };
  }
}

export async function getUsuarios() {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + '/usuarios/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'No se pudo conectar con el servidor.',
    };
  }
}

export async function getProductos() {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + '/productos/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function oneProduct(variables) {
  const result = await fecthBase(ONE_PRODUCTS_INFO, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.oneProductInfo || null,
  };
}

export async function getEntradas(variables) {
  const result = await fecthBase(ALL_ENTRADAS, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.allEntradas || null,
  };
}

export async function getSalidas(variables) {
  const result = await fecthBase(ALL_SALIDAS, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.allSalidas || null,
  };
}

export async function getAreasVentas(variables) {
  const result = await fecthBase(ALL_AREAS_VENTAS, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.allAreaVenta || null,
  };
}

export async function inventarioAlmacen() {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/inventario/almacen/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function inventarioAreaVenta({ id }) {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/inventario/area-venta/' + id + '/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function getVenta(id) {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/ventas/' + id + '/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function getDetallesVenta(id, date) {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/ventas/' + id + '/' + date + '/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function productosByAreaVenta(variables) {
  const result = await fecthBase(PRODUCTOS_BY_AREA_VENTA, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.productosByAreaVenta || null,
  };
}

export async function userByToken(variables) {
  const result = await fecthBase(USER_BY_TOKEN, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.userByToken || null,
  };
}

export async function ventasHoy() {
  const result = await fecthBase(VENTAS_HOY);
  return {
    errors: result?.errors || null,
    data: result?.data?.ventasHoy || null,
  };
}

export async function ventasSemana() {
  const result = await fecthBase(VENTAS_SEMANA);
  return {
    errors: result?.errors || null,
    data: result?.data?.ventasSemana || null,
  };
}

export async function ventasMes() {
  const result = await fecthBase(VENTAS_MES);
  return {
    errors: result?.errors || null,
    data: result?.data?.ventasMes || null,
  };
}

export async function masVendidos() {
  const result = await fecthBase(MAS_VENDIDOS);
  return {
    errors: result?.errors || null,
    data: result?.data?.masVendidos || null,
  };
}

export async function searchProduct(codigo) {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/search/' + codigo + '/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function grafico() {
  const result = await fecthBase(GRAFICO);
  return {
    errors: result?.errors || null,
    data: result?.data?.grafico || null,
  };
}

export async function getCategorias() {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + '/categorias/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}

export async function ventasPorArea() {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(
      process.env.BACKEND_URL_V2 + '/graficas/ventas-por-area',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      if (res.status === 401)
        return { data: null, error: 'Credenciales inválidas' };
      return { data: null, error: 'Algo salió mal.' };
    }
    const data = await res.json();
    return {
      error: null,
      data,
    };
  } catch (e) {
    return {
      data: null,
      error: 'Error al conectar con el servidor.',
    };
  }
}
