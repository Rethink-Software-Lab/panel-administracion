import { ROLES } from '@/app/(with-layout)/users/types';
import { headers } from 'next/headers';

export function getSession() {
  const headersList = headers();
  const rol = headersList.get('x-user-rol');
  const punto = headersList.get('x-user-punto');
  const almacen = headersList.get('x-user-almacen');
  const isAdmin = rol === 'ADMIN';
  const isAlmacenero = rol === ROLES.ALMACENERO;
  const isSupervisor = rol === ROLES.SUPERVISOR;
  const isStaff = isAdmin || isAlmacenero;
  const isVendedor = rol === 'VENDEDOR';
  return {
    rol,
    punto,
    almacen,
    isAdmin,
    isAlmacenero,
    isSupervisor,
    isVendedor,
    isStaff,
  };
}
