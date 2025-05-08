import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number) {
  if (bytes === undefined || isNaN(bytes)) return undefined;
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export const MAX_TRANF_MES = 120000;
export const MAX_TRANF_DIA = 80000;

export function canDeleteVenta(
  userId: number,
  userInVentaId: number,
  isStaff: boolean
) {
  return userId === userInVentaId || isStaff;
}
