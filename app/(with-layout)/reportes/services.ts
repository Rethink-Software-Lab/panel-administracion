import { cookies } from 'next/headers';

export async function getReporteFormData() {
  const token = cookies().get('session')?.value;
  try {
    const res = await fetch(process.env.BACKEND_URL_V3 + '/form-reportes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['form-reportes'],
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
