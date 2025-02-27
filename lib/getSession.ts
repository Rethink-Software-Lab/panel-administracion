import { ROLES } from '@/app/(with-layout)/users/types';
import { headers } from 'next/headers';

export interface Session {
  rol: string | null;
  area_venta: string | null;
  almacen: string | null;
  isAdmin: boolean;
  isAlmacenero: boolean;
  isSupervisor: boolean;
  isVendedor: boolean;
  isVendedorCafeteria: boolean;
  isStaff: boolean;
}

export function getSession() {
  const headersList = headers();
  const rol = decodeURIComponent(headersList.get('x-user-rol') as string);
  const userId = headersList.get('x-user-id');
  const area_venta = headersList.get('x-user-area-venta');
  const almacen = headersList.get('x-user-almacen');
  const isAdmin = rol === 'ADMIN';
  const isAlmacenero = rol === ROLES.ALMACENERO;
  const isSupervisor = rol === ROLES.SUPERVISOR;
  const isStaff = isAdmin || isAlmacenero;
  const isVendedor = rol === 'VENDEDOR';
  const isVendedorCafeteria = rol === ROLES.VENDEDOR_CAFETERIA;

  return {
    userId,
    rol,
    area_venta,
    almacen,
    isAdmin,
    isAlmacenero,
    isSupervisor,
    isVendedor,
    isVendedorCafeteria,
    isStaff,
  };
}
