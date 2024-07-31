import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Paginator({ page, totalPages = null }) {
  const hasPrev = Number(page) <= 1;
  const hasNext = totalPages - Number(page) <= 0;
  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-xs text-muted-foreground">
        {totalPages && (
          <>
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link
          legacyBehavior
          scroll={false}
          href={{
            query: { p: Number(page) - 1 },
          }}
        >
          <Button variant={hasPrev ? 'outline' : 'default'} disabled={hasPrev}>
            <ChevronLeftIcon className="h-4 w-4" />
            Anterior
          </Button>
        </Link>
        <Link
          legacyBehavior
          scroll={false}
          href={{
            query: { p: Number(page) + 1 },
          }}
        >
          <Button variant={hasNext ? 'outline' : 'default'} disabled={hasNext}>
            Siguiente
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
