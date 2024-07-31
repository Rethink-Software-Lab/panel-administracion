'use client';

import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { SearchSchema } from '@/lib/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(SearchSchema),
    defaultValues: { codigo: '' },
  });

  const onSubmit = (dataForm) => {
    router.push(`/search/${dataForm?.codigo}`);
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
        ></Input>
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
