'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ClipboardCheck,
  Home,
  Package,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  Store,
  PackageOpen,
  Settings2,
  Tags,
  FileText,
  ArrowRightLeft,
} from 'lucide-react';

import { cn } from '@/lib/utils';

export default function SideBar({ areasVenta, session }) {
  const path = usePathname();
  if (path === '/login') return;

  return (
    <div className="hidden w-[20%] border-r bg-muted/40 md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ClipboardCheck className="h-6 w-6" />
            <span className="">Panel de administración</span>
          </Link>
        </div>
        <div className="flex-1 pb-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 max-w-64">
            {session.isStaff && (
              <>
                <Link
                  href="/"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/' && 'bg-muted text-primary'
                  )}
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>

                <Link
                  href="/products"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/products' && 'bg-muted text-primary'
                  )}
                >
                  <Package className="h-4 w-4" />
                  Productos
                </Link>
                <Link
                  href="/reportes"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/reportes' && 'bg-muted text-primary'
                  )}
                >
                  <FileText className="h-4 w-4" />
                  Reportes
                </Link>
                <Link
                  href="/categorias"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/categorias' && 'bg-muted text-primary'
                  )}
                >
                  <Tags className="h-4 w-4" />
                  Categorías
                </Link>
              </>
            )}
            {session.isAdmin && (
              <>
                <Link
                  href="/users"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/users' && 'bg-muted text-primary'
                  )}
                >
                  <Users className="h-4 w-4" />
                  Usuarios
                </Link>
                <Link
                  href="/transferencias"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/transferencias' && 'bg-muted text-primary'
                  )}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Transferencias
                </Link>
              </>
            )}
            <span className="p-2">Almacén Principal</span>
            <Link
              href="/inventario"
              className={cn(
                'flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                path === '/inventario' && 'bg-muted text-primary'
              )}
            >
              <PackageOpen className="h-4 w-4" />
              Inventario
            </Link>
            {session.isStaff && (
              <>
                <Link
                  href="/entradas"
                  className={cn(
                    'flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/entradas' && 'bg-muted text-primary'
                  )}
                >
                  <ArrowDownLeft className="h-4 w-4" />
                  Entradas
                </Link>
                <Link
                  href="/salidas"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/salidas' && 'bg-muted text-primary'
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Salidas
                </Link>
                <span className="p-2">Almacén Revoltosa</span>
                <Link
                  href="/inventario-revoltosa"
                  className={cn(
                    'flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/inventario-revoltosa' && 'bg-muted text-primary'
                  )}
                >
                  <PackageOpen className="h-4 w-4" />
                  Inventario
                </Link>
                <Link
                  href="/salidas-revoltosa"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/salidas-revoltosa' && 'bg-muted text-primary'
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Salidas
                </Link>
              </>
            )}

            <span className="p-2">Áreas de venta</span>
            {session.isStaff && (
              <Link
                href="/areas-de-venta"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  path === '/areas-de-venta' && 'bg-muted text-primary'
                )}
              >
                <Settings2 className="h-4 w-4" />
                Administrar áreas
              </Link>
            )}
            {areasVenta?.map((area) => (
              <Link
                key={area.id}
                href={`/areas-de-venta/${area.id}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  path === `/areas-de-venta/${area.id}` &&
                    'bg-muted text-primary'
                )}
              >
                <Store className="h-4 w-4" />
                <span className="line-clamp-1">{area.nombre}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
