'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Printer } from 'lucide-react';

export default function ButtonPrint({
  disabled,
  className,
}: {
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      className={cn('sm:space-x-2', className)}
      disabled={disabled}
      onClick={() => window.print()}
    >
      <Printer size={18} />
      <span className="max-sm:sr-only">Imprimir</span>
    </Button>
  );
}
