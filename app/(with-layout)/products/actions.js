'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addProducto(formData) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/productos/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
    if (res.status === 424)
      return {
        data: null,
        error: {
          message: 'Fallo de una dependencia.',
          description: 'Una de las dependencias falló, contacte con soporte.',
        },
      };
    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/productos');
  return {
    data: 'Producto agregado con éxito.',
    error: null,
  };
}

export async function updateProducto(formData, id) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/productos/' + id + '/',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  if (!res.ok) {
    if (res.status === 401)
      return {
        data: null,
        error: {
          message: 'No autorizado',
          description: 'Usted no está autorizado para esta acción',
        },
      };
    if (res.status === 403)
      return {
        data: null,
        error: {
          message:
            'No es posible editar la categoría de un producto que tiene productos asociados.',
          description:
            'No es posible editar la categoría de un producto que tiene un producto asociado.',
        },
      };
    if (res.status === 404)
      return {
        data: null,
        error: {
          message: 'Producto no encontrado',
          description:
            'No fué posible encontrar el producto que desea eliminar',
        },
      };
    if (res.status === 424)
      return {
        data: null,
        error: {
          message: 'Fallo en una dependencia.',
          description:
            'No fué posible encontrar el producto que desea eliminar',
        },
      };
    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/productos');
  return {
    data: 'Producto editado con éxito.',
    error: null,
  };
}

export async function deleteProducto({ id }) {
  const token = cookies().get('session')?.value || null;
  const res = await fetch(process.env.BACKEND_URL_V2 + '/productos/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
    if (res.status === 404)
      return {
        data: null,
        error: {
          message: 'Producto no encontrado',
          description:
            'No fué posible encontrar el producto que desea eliminar',
        },
      };
    if (res.status === 424)
      return {
        data: null,
        error: {
          message: 'Fallo en una dependencia.',
          description:
            'No fué posible encontrar el producto que desea eliminar',
        },
      };
    return {
      data: null,
      error: {
        message: 'Algo salió mal.',
        description: 'Por favor contacte con soporte',
      },
    };
  }
  revalidatePath('/productos');
  return {
    data: 'Producto eliminada con éxito.',
    error: null,
  };
}
