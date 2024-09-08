'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function ButtonPrint({ disabled, className }) {
  return (
    <Button
      variant="outline"
      className={className}
      disabled={disabled}
      onClick={() => window.print()}
    >
      <Printer size={18} />
    </Button>
  );
}
