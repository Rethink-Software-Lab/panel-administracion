'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  DELETE_USER,
  LOGIN,
  EDIT_USER,
  ADD_USER,
  DELETE_PRODUCT_INFO,
  ADD_PRODUCT_INFO,
  UPDATE_PRODUCT_INFO,
  ADD_ENTRADA,
  DELETE_ENTRADA,
  DELETE_SALIDA,
  DELETE_AREA_VENTA,
  ADD_AREA_VENTA,
  UPDATE_AREA_VENTA,
  ADD_SALIDA,
  UPDATE_SALIDA,
  ADD_VENTA,
  DELETE_VENTA,
  UPDATE_VENTA,
} from '@/lib/mutations';
import { fecthBase } from '@/lib/services';

export async function login(data) {
  const result = await fecthBase(LOGIN, data);

  if (result.errors) return { errors: result.errors };

  cookies().set('session', result.data.login.token, { httpOnly: true });
  redirect('/');
}

export async function createUser(data) {
  const result = await fecthBase(ADD_USER, data);

  if (result?.data) revalidatePath('/users');
  return { errors: result?.errors || null, data: result?.data?.addUser };
}

export async function editUser(data) {
  const result = await fecthBase(EDIT_USER, data);

  if (result.data) revalidatePath('/users');
  return { errors: result?.errors || null, data: result?.data?.updateUser };
}

export async function deleteUser({ id }) {
  const result = await fecthBase(DELETE_USER, { id });

  revalidatePath('/users');
  return {
    errors: result.errors || null,
    data: result.data.deleteUser.message || null,
  };
}

export async function createProduct(formData) {
  const token = cookies().get('session')?.value || null;
  const results = await fetch(process.env.BACKEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
  revalidatePath('/products');
  return { errors: results.errors || null, data: results.data.addProductoInfo };
}

export async function editProduct(formData) {
  const token = cookies().get('session')?.value || null;
  const results = await fetch(process.env.BACKEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: formData,
  }).then((res) => res.json());

  revalidatePath('/products');
  return {
    errors: results?.errors || null,
    data: results?.data?.updateProductoInfo,
  };
}

export async function deleteProductInfo({ id }) {
  const result = await fecthBase(DELETE_PRODUCT_INFO, { id });

  revalidatePath('/products');
  return {
    errors: result.errors || null,
    data: result?.data?.deleteProductoInfo?.message || null,
  };
}

export async function createEntrada(data) {
  const result = await fecthBase(ADD_ENTRADA, data);
  if (result.data) revalidatePath('/entradas');
  return { errors: result.errors || null, data: result?.data?.addEntrada };
}

export async function deleteEntrada({ id }) {
  const result = await fecthBase(DELETE_ENTRADA, { id });

  revalidatePath('/entradas');
  return {
    errors: result.errors || null,
    data: result.data.deleteEntrada.message || null,
  };
}

export async function addSalida(data) {
  const result = await fecthBase(ADD_SALIDA, data);

  if (result.data) revalidatePath('/salidas');
  return { errors: result.errors || null, data: result.data };
}

export async function updateSalida(data) {
  const result = await fecthBase(UPDATE_SALIDA, data);

  if (result.data) revalidatePath('/salidas');
  return { errors: result.errors || null, data: result.data };
}

export async function deleteSalida({ id }) {
  const result = await fecthBase(DELETE_SALIDA, { id });

  revalidatePath('/salidas');
  return {
    errors: result.errors || null,
    data: result.data.deleteSalida.message || null,
  };
}

export async function createAreaVenta(data) {
  const result = await fecthBase(ADD_AREA_VENTA, data);

  if (result.data) revalidatePath('/areas-de-ventas');
  return { errors: result.errors || null, data: result.data };
}

export async function editAreaVenta(data) {
  const result = await fecthBase(UPDATE_AREA_VENTA, data);
  if (result.data) revalidatePath('/areas-de-ventas');
  return {
    errors: result.errors || null,
    data: result.data,
  };
}

export async function deleteAreaVenta({ id }) {
  const result = await fecthBase(DELETE_AREA_VENTA, { id });

  revalidatePath('/areas-de-ventas');
  return {
    errors: result.errors || null,
    data: result.data.deleteAreaVenta.message || null,
  };
}

export async function addVenta(data) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/ventas/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data }),
  });
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: {
          message: 'No autorizado',
          description: 'Usted no está autorizado para esta acción',
        },
      };

      if (res.status === 400) {
        const json = await res.json()
        return {
          data: null,
          error: {
            message: json.detail,
          },
        };
      }
     
    const json = await res.json()  

    console.log(json)

    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/ventas');
  const response = await res.json();
  return {
    error: null,
    data: response,
  };
}


export async function updateVenta(data) {
  const result = await fecthBase(UPDATE_VENTA, data);

  if (result.data) revalidatePath(`/areas-de-ventas/${data?.areaVenta}`);
  return { errors: result.errors || null, data: result.data };
}

export async function deleteVenta({ id, areaVenta }) {
  const result = await fecthBase(DELETE_VENTA, { id });
  console.log(result);
  revalidatePath(`/areas-de-ventas/${areaVenta}`);
  return {
    errors: result.errors || null,
    data: result.data?.deleteVenta?.message || null,
  };
}

export async function logout() {
  cookies().delete('session');
  redirect('/login');
}
