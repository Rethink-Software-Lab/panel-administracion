'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

interface CreateArea {
  nombre: string;
  color: number;
}

export async function addArea(data: CreateArea) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/areas-ventas/', {
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
        error: 'No autorizado',
      };

    if (res.status === 400) {
      const json = await res.json();
      return {
        data: null,
        error: json.detail,
      };
    }

    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('areas-ventas');
  return {
    error: null,
    data: 'Área de ventas creada correctamente.',
  };
}

export async function updateArea(id: number, data: CreateArea) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/areas-ventas/' + id + '/',
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    }
  );
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };

    if (res.status === 400) {
      const json = await res.json();
      return {
        data: null,
        error: json.detail,
      };
    }

    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('areas-ventas');
  return {
    error: null,
    data: 'Área de ventas editada correctamente.',
  };
}

export async function deleteAreaVenta({ id }: { id: number }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/areas-ventas/' + id + '/',
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: 'No autorizado',
      };

    if (res.status === 404)
      return {
        data: null,
        error: 'Area venta no encontrada',
      };
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('areas-ventas');
  return {
    data: 'Área de venta eliminada con éxito.',
    error: null,
  };
}
