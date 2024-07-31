import { headers } from 'next/headers';

export function getSession() {
  const headersList = headers();
  const rol = headersList.get('x-user-rol');
  const punto = headersList.get('x-user-punto');
  const isAdmin = rol === 'ADMIN';
  const isAlmacenero = rol === 'ALMACENERO';
  const isStaff = isAdmin || isAlmacenero;
  const isVendedor = rol === 'VENDEDOR';
  return {
    rol,
    punto,
    isAdmin,
    isAlmacenero,
    isVendedor,
    isStaff,
  };
}
