"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  CircleUser,
  ClipboardCheck,
  Home,
  LifeBuoy,
  LogOut,
  Menu,
  Package,
  PackageOpen,
  Settings2,
  Store,
  Tags,
  Users,
} from "lucide-react";
import SearchForm from "@/components/functionals/SeachForm";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/actions";

export default function TopBar({ session, areasVenta }) {
  const path = usePathname();
  const router = useRouter();
  if (path === "/login") return;

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {session.isVendedor && (
        <Button
          onClick={() => router.push(`/areas-de-venta/${session?.punto}`)}
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back button</span>
        </Button>
      )}
      {!session.isVendedor && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <ClipboardCheck className="h-6 w-6" />
                  <span className=" text-sm">Panel de administración</span>
                </Link>
              </div>
              {session.isStaff && (
                <>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      path === "/" && "bg-muted text-primary"
                    )}
                  >
                    <Home className="h-4 w-4" />
                    Inicio
                  </Link>

                  <Link
                    href="/products"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      path === "/products" && "bg-muted text-primary"
                    )}
                  >
                    <Package className="h-4 w-4" />
                    Productos
                  </Link>
                  <Link
                    href="/categorias"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      path === "/categorias" && "bg-muted text-primary"
                    )}
                  >
                    <Tags className="h-4 w-4" />
                    Categorías
                  </Link>
                </>
              )}
              {session.isAdmin && (
                <Link
                  href="/users"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    path === "/users" && "bg-muted text-primary"
                  )}
                >
                  <Users className="h-4 w-4" />
                  Usuarios
                </Link>
              )}
              {session.isStaff && (
                <>
                  <span className="p-2">Almacén</span>
                  <Link
                    href="/inventario"
                    className={cn(
                      "flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      path === "/inventario" && "bg-muted text-primary"
                    )}
                  >
                    <PackageOpen className="h-4 w-4" />
                    Inventario
                  </Link>
                  <Link
                    href="/entradas"
                    className={cn(
                      "flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      path === "/entradas" && "bg-muted text-primary"
                    )}
                  >
                    <ArrowDownLeft className="h-4 w-4" />
                    Entradas
                  </Link>
                  <Link
                    href="/salidas"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      path === "/salidas" && "bg-muted text-primary"
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
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    path === "/areas-de-venta" && "bg-muted text-primary"
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
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    path === `/areas-de-venta/${area.id}` &&
                      "bg-muted text-primary"
                  )}
                >
                  <Store className="h-4 w-4" />
                  <span className="line-clamp-1">{area.nombre}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      )}
      <div className="w-full flex-1">
        <SearchForm />
      </div>
      <Link
        target="blank"
        href="https://mail.google.com/mail/?view=cm&fs=1&to=rethinksoftwarelab@gmail.com&su=PETICIÓN%20DE%20SOPORTE"
      >
        <Button
          variant="secondary"
          className="hidden md:flex justify-start rounded-sm w-full gap-2"
        >
          <LifeBuoy className="h-5 w-5" />
          <span>Soporte</span>
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link
            target="blank"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=rethinksoftwarelab@gmail.com&su=PETICIÓN%20DE%20SOPORTE"
          >
            <DropdownMenuItem className="md:hidden gap-1 text-muted-foreground">
              <LifeBuoy size={18} />
              Soporte
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator className="md:hidden" />
          <form action={logout}>
            <DropdownMenuItem asChild className="w-full cursor-pointer">
              <button className="gap-1 text-muted-foreground" type="submit">
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
