import { cookies } from 'next/headers';
import {
  ALL_USERS,
  ALL_PRODUCTS_INFO,
  ALL_ENTRADAS,
  ALL_SALIDAS,
  ALL_AREAS_VENTAS,
  INVENTARIO_ALMACEN,
  ONE_VENTAS,
  USER_BY_TOKEN,
  PRODUCTOS_BY_AREA_VENTA,
  VENTAS_HOY,
  VENTAS_SEMANA,
  VENTAS_MES,
  MAS_VENDIDOS,
  ONE_USERS,
  SEARCH_PRODUCT,
  GRAFICO,
  ONE_PRODUCTS_INFO,
  INVENTARIO_AREA_VENTA,
  ONE_PRODUCTO,
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

export async function getUsers(variables) {
  const result = await fecthBase(ALL_USERS, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.allUsers || null,
  };
}

export async function oneUser(variables) {
  const result = await fecthBase(ONE_USERS, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.oneUser || null,
  };
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
    const res = await fetch(process.env.BACKEND_URL_V2 + '/inventario/almacen/', {
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

export async function inventarioAreaVenta({id}) {
  const token = cookies().get('session')?.value || null;
  try {
    const res = await fetch(process.env.BACKEND_URL_V2 + '/inventario/area-venta/' + id + '/', {
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

export async function getOneVentas(variables) {
  const result = await fecthBase(ONE_VENTAS, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.oneVentas || null,
  };
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

export async function searchProduct(variables) {
  const result = await fecthBase(SEARCH_PRODUCT, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.searchProduct || null,
  };
}

export async function grafico() {
  const result = await fecthBase(GRAFICO);
  return {
    errors: result?.errors || null,
    data: result?.data?.grafico || null,
  };
}

// export async function inventarioAreaVenta(variables) {
//   const result = await fecthBase(INVENTARIO_AREA_VENTA, variables);
//   return {
//     errors: result?.errors || null,
//     data: result?.data?.inventarioAreaVenta || null,
//   };
// }

export async function oneProducto(variables) {
  const result = await fecthBase(ONE_PRODUCTO, variables);
  return {
    errors: result?.errors || null,
    data: result?.data?.oneProducto || null,
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
