import { ROLES } from '@/app/(with-layout)/users/types';
import { headers } from 'next/headers';

export interface Session {
  rol: ROLES;
  area_venta: string;
  almacen: string;
  isAdmin: boolean;
  isAlmacenero: boolean;
  isSupervisor: boolean;
  isVendedor: boolean;
  isStaff: boolean;
}

export function getSession() {
  const headersList = headers();
  const rol = headersList.get('x-user-rol');
  const area_venta = headersList.get('x-user-area-venta');
  const almacen = headersList.get('x-user-almacen');
  const isAdmin = rol === 'ADMIN';
  const isAlmacenero = rol === ROLES.ALMACENERO;
  const isSupervisor = rol === ROLES.SUPERVISOR;
  const isStaff = isAdmin || isAlmacenero;
  const isVendedor = rol === 'VENDEDOR';

  return {
    rol,
    area_venta,
    almacen,
    isAdmin,
    isAlmacenero,
    isSupervisor,
    isVendedor,
    isStaff,
  };
}
