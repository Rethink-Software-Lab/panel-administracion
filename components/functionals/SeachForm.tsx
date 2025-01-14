'use client';

import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { SearchSchema } from '@/lib/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { InferInput } from 'valibot';

export default function SearchForm() {
  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(SearchSchema),
    defaultValues: { codigo: '', numero: '' },
  });

  const onSubmit = (dataForm: InferInput<typeof SearchSchema>) => {
    router.push(
      `/search${dataForm?.codigo ? `?codigo=${dataForm.codigo}` : ''}${
        dataForm?.numero
          ? dataForm?.codigo
            ? `&numero=${dataForm?.numero}`
            : `?numero=${dataForm?.numero}`
          : ''
      }`
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex gap-1">
        <Input
          {...form.register('codigo')}
          type="search"
          placeholder="Buscar producto..."
          className={cn(
            'w-full appearance-none bg-background shadow-none md:w-2/3 lg:w-1/3',
            form.formState.errors?.codigo &&
              'border-destructive focus-visible:ring-destructive'
          )}
        />
        <Input
          {...form.register('numero')}
          type="number"
          placeholder="Número"
          className={cn(
            'appearance-none bg-background shadow-none w-14  md:w-24',
            form.formState.errors?.numero &&
              'border-destructive focus-visible:ring-destructive'
          )}
        />
        <Button
          type="submit"
          size="icon"
          variant="outline"
          className="text-muted-foreground"
        >
          <Search className=" w-5" />
        </Button>
      </div>
    </form>
  );
}
