'use client';

import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, Keyboard } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { InferInput } from 'valibot';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { Label } from '../ui/label';
import { Proveedor } from '@/app/(with-layout)/proveedores/types';
import { EntradaCafeteriaSchema } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/schema';

export default function ComboboxProveedorCafeteria({
  form,
  proveedores,
  formRef,
  isManual,
  setIsManual,
}: {
  form: UseFormReturn<InferInput<typeof EntradaCafeteriaSchema>>;
  proveedores: Pick<Proveedor, 'id' | 'nombre'>[];
  formRef: RefObject<HTMLElement>;
  isManual: boolean;
  setIsManual: Dispatch<SetStateAction<boolean>>;
}) {
  const [openPopover, setOpenPopover] = useState(false);

  const manualFields: Array<keyof InferInput<typeof EntradaCafeteriaSchema>> = [
    'proveedor_nombre',
    'proveedor_nit',
    'proveedor_telefono',
    'proveedor_direccion',
    'proveedor_no_cuenta_cup',
    'proveedor_no_cuenta_mayorista',
  ];

  const setMultipleValuesUndefined = (
    values: Array<keyof InferInput<typeof EntradaCafeteriaSchema>>
  ) => {
    values.forEach((value) => {
      form.setValue(value, undefined);
    });
  };

  const setMultipleValuesEmptyString = (
    values: Array<keyof InferInput<typeof EntradaCafeteriaSchema>>
  ) => {
    values.forEach((value) => {
      form.setValue(value, '');
    });
  };

  return (
    <FormField
      control={form.control}
      name="proveedor"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <Label>Proveedor</Label>
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
                  {isManual ? (
                    <div className="flex gap-2">
                      <Keyboard className="w-5 h-5" />
                      Ingresar manualmente
                    </div>
                  ) : field.value ? (
                    proveedores?.find(
                      (proveedor) => proveedor?.id.toString() === field.value
                    )?.nombre
                  ) : (
                    'Seleccione un proveedor'
                  )}
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
                    {proveedores?.map((proveedor) => (
                      <CommandItem
                        key={proveedor.id}
                        value={proveedor.id.toString()}
                        keywords={[proveedor.nombre]}
                        onSelect={(currentValue) => {
                          setMultipleValuesUndefined(manualFields);
                          field.onChange(
                            currentValue === field.value ? '' : currentValue
                          );
                          setIsManual(false);
                          setOpenPopover(false);
                        }}
                      >
                        {proveedor.nombre}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            proveedor.id.toString() === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                <Button
                  onClick={() => {
                    form.setValue('proveedor', undefined);
                    setMultipleValuesEmptyString(manualFields);
                    setIsManual(true);
                    setOpenPopover(false);
                  }}
                  className="m-2 gap-2"
                  variant="outline"
                  type="button"
                >
                  <Keyboard className="w-5 h-5" />
                  Agregar manualmente
                </Button>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
