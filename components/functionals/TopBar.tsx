import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CircleUser, LifeBuoy, LogOut } from 'lucide-react';
// import SearchForm from '@/components/functionals/SeachForm';
import { logout } from '@/lib/actions';
import { AreaVenta } from '@/app/(with-layout)/areas-de-venta/types';
import { Session } from '@/lib/getSession';
import { NoRepresentados } from './NoRepresentados';
import NavbarMobile from './NavbarMobile';

interface Props {
  session: Session;
  areasVenta: AreaVenta[];
}

export default function TopBar({ session, areasVenta }: Props) {
  return (
    <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* TODO : Arreglar navegacion en vista mobile */}

      <NavbarMobile session={session} areasVenta={areasVenta} />

      <div className="w-full flex-1">{/* <SearchForm /> */}</div>

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

      <NoRepresentados />

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
