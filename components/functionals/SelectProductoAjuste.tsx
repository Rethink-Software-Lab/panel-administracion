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
import { AjusteSchema } from '@/lib/schemas';
import { ProductInfo } from '@/app/(with-layout)/products/types';
import { RefObject, useState } from 'react';

export default function SelectProductoAjuste({
  form,
  index,
  productosInfo,
  formRef,
}: {
  form: UseFormReturn<InferInput<typeof AjusteSchema>>;
  index: number;
  productosInfo: ProductInfo[];
  formRef: RefObject<HTMLElement>;
}) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <FormField
      control={form.control}
      name={`productos.${index}.producto`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
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
                      )?.descripcion
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
                    {productosInfo?.map((producto: ProductInfo) => (
                      <CommandItem
                        key={producto.id}
                        value={producto.id.toString()}
                        keywords={[producto.descripcion]}
                        onSelect={(currentValue) => {
                          const esZapato =
                            productosInfo?.find(
                              (e) => e.id.toString() === currentValue
                            )?.categoria.nombre === 'Zapatos';

                          if (esZapato) {
                            form.setValue(
                              `productos.${index}.cantidad`,
                              undefined
                            );
                            form.setValue(
                              `productos.${index}.area_venta`,
                              undefined
                            );
                            form.setValue(`productos.${index}.zapatos_id`, '');
                          } else {
                            form.setValue(
                              `productos.${index}.zapatos_id`,
                              undefined
                            );
                            form.setValue(`productos.${index}.cantidad`, '0');
                            form.setValue(`productos.${index}.area_venta`, '');
                          }
                          field.onChange(
                            currentValue === field.value ? '' : currentValue
                          );
                          setOpenPopover(false);
                        }}
                      >
                        {producto.descripcion}
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
