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
  Wrench,
  CircleDollarSign,
  CreditCard,
  Pizza,
  ShoppingCart,
  CoffeeIcon,
  Package2,
  TicketX,
  Heart,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ALMACENES } from '@/app/(with-layout)/users/types';
import { AreaVenta } from '@/app/(with-layout)/areas-de-venta/types';
import { Session } from '@/lib/getSession';

interface Props {
  areasVenta: AreaVenta[];
  session: Session;
}

export default function SideBar({ areasVenta, session }: Props) {
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
            {session.isAdmin && (
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
              </>
            )}

            {session.isAdmin ||
            (session.isAlmacenero &&
              session.almacen === ALMACENES.CAFETERIA) ? (
              <>
                <Link
                  href="/productos-cafeteria"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/productos-cafeteria' && 'bg-muted text-primary'
                  )}
                >
                  <Package2 className="h-4 w-4" />
                  Productos Cafetería
                </Link>
                <Link
                  href="/elaboraciones"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/elaboraciones' && 'bg-muted text-primary'
                  )}
                >
                  <Pizza className="h-4 w-4" />
                  Elaboraciones
                </Link>
                <Link
                  href="/merma"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/merma' && 'bg-muted text-primary'
                  )}
                >
                  <TicketX className="h-4 w-4" />
                  Merma
                </Link>
                <Link
                  href="/cuenta-casa"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/cuenta-casa' && 'bg-muted text-primary'
                  )}
                >
                  <Heart className="h-4 w-4" />
                  Cuenta Casa
                </Link>
              </>
            ) : null}

            {(session.isStaff ||
              session.isSupervisor ||
              session.isVendedorCafeteria) && (
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
            )}

            {session.isAdmin && (
              <>
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
                  href="/gastos"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/gastos' && 'bg-muted text-primary'
                  )}
                >
                  <CircleDollarSign className="h-4 w-4" />
                  Gastos
                </Link>
              </>
            )}
            {(session.isAdmin || session.isSupervisor) && (
              <Link
                href="/tarjetas"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  path === '/tarjetas' && 'bg-muted text-primary'
                )}
              >
                <CreditCard className="h-4 w-4" />
                Tarjetas
              </Link>
            )}
            {session.isAdmin && (
              <>
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
                <Link
                  href="/ajuste-inventario"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/ajuste-inventario' && 'bg-muted text-primary'
                  )}
                >
                  <Wrench className="h-4 w-4" />
                  Ajuste Inventario
                </Link>
              </>
            )}
            {session.isAdmin ||
            session.isSupervisor ||
            (session.isAlmacenero &&
              session.almacen !== ALMACENES.CAFETERIA) ? (
              <>
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
                {session.isAdmin ||
                (session.isAlmacenero &&
                  session.almacen === ALMACENES.PRINCIPAL) ? (
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
                  </>
                ) : null}
              </>
            ) : null}
            {session.isAdmin ||
            session.isSupervisor ||
            (session.isAlmacenero &&
              session.almacen !== ALMACENES.CAFETERIA) ? (
              <>
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
                {session.isAdmin ||
                (session.isAlmacenero &&
                  session.almacen === ALMACENES.REVOLTOSA) ? (
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
                ) : null}
              </>
            ) : null}

            {session.isAdmin ||
            (session.isAlmacenero &&
              session.almacen === ALMACENES.CAFETERIA) ? (
              <>
                <span className="p-2">Almacén Cafetería</span>

                <Link
                  href="/inventario-cafeteria"
                  className={cn(
                    'flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/inventario-cafeteria' && 'bg-muted text-primary'
                  )}
                >
                  <PackageOpen className="h-4 w-4" />
                  Inventario
                </Link>
                <Link
                  href="/entradas-cafeteria"
                  className={cn(
                    'flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/entradas-cafeteria' && 'bg-muted text-primary'
                  )}
                >
                  <ArrowDownLeft className="h-4 w-4" />
                  Entradas
                </Link>

                <Link
                  href="/salidas-cafeteria"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    path === '/salidas-cafeteria' && 'bg-muted text-primary'
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Salidas
                </Link>
              </>
            ) : null}

            {session.almacen !== ALMACENES.CAFETERIA ? (
              <>
                {!session.isVendedorCafeteria && (
                  <span className="p-2">Áreas de venta</span>
                )}
                {session.isAdmin && (
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
                {(session.isAdmin || session.isVendedorCafeteria) && (
                  <Link
                    href="/cafeteria"
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      path === '/cafeteria' && 'bg-muted text-primary'
                    )}
                  >
                    <CoffeeIcon className="h-4 w-4" />
                    Cafetería
                  </Link>
                )}
                {!session.isVendedorCafeteria && (
                  <>
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
                  </>
                )}
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
}
