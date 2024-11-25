'use client';

import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { InferInput } from 'valibot';
import { EntradaCafeteriaSchema } from '@/lib/schemas';
import { RefObject, useState } from 'react';
import { ProductoCodigoCategoria } from './sheets/SheetEntradasCafeteria';
import { Label } from '../ui/label';

export default function ComboboxEntradasCafeteria({
  form,
  productosInfo,
  formRef,
}: {
  form: UseFormReturn<InferInput<typeof EntradaCafeteriaSchema>>;
  productosInfo: ProductoCodigoCategoria[];
  formRef: RefObject<HTMLElement>;
}) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <FormField
      control={form.control}
      name="producto"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Label>Producto</Label>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? productosInfo?.find(
                        (producto) => producto?.id.toString() === field.value
                      )?.codigo
                    : 'Seleccione un producto'}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent containerRef={formRef} className="w-[320px] p-0">
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Escribe un código..." />
                <CommandList>
                  <CommandEmpty>Ningún resultado encontrado.</CommandEmpty>
                  <CommandGroup heading="Sugerencias">
                    {productosInfo?.map((producto: ProductoCodigoCategoria) => (
                      <CommandItem
                        key={producto.id}
                        value={producto.id.toString()}
                        keywords={[producto.descripcion, producto.codigo]}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? '' : currentValue
                          );
                          setOpenPopover(false);
                        }}
                      >
                        <div>
                          <p className="font-semibold">{producto.codigo}</p>
                          <span>{producto.descripcion}</span>
                        </div>
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            producto.id.toString() === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
