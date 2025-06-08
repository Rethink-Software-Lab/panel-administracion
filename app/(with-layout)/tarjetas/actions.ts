'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { InferInput } from 'valibot';
import { TarjetasSchema, TransferenciasTarjetas } from '@/lib/schemas';
import { TipoCuenta } from './types';

const token = cookies().get('session')?.value;

export async function addTarjeta(
  data: InferInput<typeof TarjetasSchema>
): Promise<{ data: string | null; error: string | null }> {
  const res = await fetch(process.env.BACKEND_URL_V2 + '/tarjetas/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, tipo: TipoCuenta.BANCARIA }),
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
  revalidateTag('tarjetas');
  return {
    error: null,
    data: 'Tarjeta agregada con éxito.',
  };
}

export async function deleteTarjeta(id: number) {
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/tarjetas/' + id + '/',
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
    if (res.status === 400) {
      const json = await res.json();
      return {
        data: null,
        error: json.detail,
      };
    }
    if (res.status === 404)
      return {
        data: null,
        error: 'Tarjeta no encontrada',
      };
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('tarjetas');
  return {
    data: 'Tarjeta eliminada con éxito.',
    error: null,
  };
}

export async function addTransferenciaTarjeta(
  data: InferInput<typeof TransferenciasTarjetas>
): Promise<{ data: string | null; error: string | null }> {
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/tarjetas/add/transferencia/',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
  revalidateTag('tarjetas');
  return {
    error: null,
    data: 'Transferencia agregada con éxito.',
  };
}

export async function deleteTransferenciaTarjeta({ id }: { id: number }) {
  const res = await fetch(
    process.env.BACKEND_URL_V2 + '/tarjetas/transferencia/' + id + '/',
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
    if (res.status === 400) {
      const json = await res.json();
      return {
        data: null,
        error: json.detail,
      };
    }
    if (res.status === 404)
      return {
        data: null,
        error: 'Transferencia no encontrada',
      };
    return {
      data: null,
      error: 'Algo salió mal.',
    };
  }
  revalidateTag('tarjetas');
  return {
    data: 'Transferencia eliminada con éxito.',
    error: null,
  };
}
