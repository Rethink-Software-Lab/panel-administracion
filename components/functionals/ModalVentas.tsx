'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogClose,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckIcon, X, PlusCircle, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { VentasSchema } from '@/lib/schemas';
import {
  safeParse,
  pipe,
  integer,
  minValue,
  string,
  transform,
  InferInput,
} from 'valibot';

import { toast } from 'sonner';
import { CircleX, LoaderCircle } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { METODOS_PAGO } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/types';
import { Banco } from '@/app/(with-layout)/tarjetas/types';
import {
  AllProductos,
  Tarjetas,
} from '@/app/(with-layout)/areas-de-venta/[id]/types';
import { addVenta } from '@/app/(with-layout)/areas-de-venta/[id]/actions';

export default function ModalVentas({
  trigger,
  idPunto,
  productosInfo,
  tarjetas,
}: {
  idPunto: number;
  productosInfo: AllProductos[];
  tarjetas: Tarjetas[];
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<InferInput<typeof VentasSchema>>({
    resolver: valibotResolver(VentasSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'zapatos_id',
  });

  const zapatos_id = useWatch({
    control: form.control,
    name: 'zapatos_id',
  });

  const info_producto = useWatch({
    control: form.control,
    name: 'producto_info',
  });

  const metodo = useWatch({
    control: form.control,
    name: 'metodoPago',
  });

  const IdArraySchema = pipe(
    string(),
    transform((input) => parseInt(input)),
    integer(),
    minValue(1)
  );

  const handleNewProducts = () => {
    if (!ref.current) return;
    const { success } = safeParse(IdArraySchema, ref.current.value);
    if (success) {
      append({
        id: Math.random().toString(36).substr(2, 9),
        value: parseInt(ref.current.value),
      });
      ref.current.value = '';
    }
  };

  const onSubmit = async (
    dataForm: InferInput<typeof VentasSchema>
  ): Promise<void> => {
    setIsLoading(true);
    const { data: dataRes, error } = await addVenta({
      ...dataForm,
      zapatos_id: dataForm.zapatos_id?.map((item) => item.value),
      areaVenta: idPunto,
    });
    setIsLoading(false);
    if (!error) {
      form.reset();
      setIsOpen(false);
      toast.success(dataRes);
    }
    setError(error);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Venta</DialogTitle>
        </DialogHeader>
        <DialogDescription>Todos los campos son requeridos</DialogDescription>
        {error && (
          <Alert variant="destructive">
            <CircleX className="h-5 w-5" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="metodoPago"
              render={({ field }) => (
                <FormItem>
                  <Label>Método de pago</Label>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === 'MIXTO') {
                        form.setValue('efectivo', 0);
                        form.setValue('transferencia', 0);
                      } else if (value === METODOS_PAGO.EFECTIVO) {
                        form.setValue('tarjeta', undefined);
                      } else {
                        form.setValue('efectivo', undefined);
                        form.setValue('transferencia', undefined);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          form.formState.errors?.metodoPago &&
                            'border-destructive'
                        )}
                      >
                        <SelectValue placeholder="Selecciona un método de pago" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                      <SelectItem value="TRANSFERENCIA">
                        Transferencia
                      </SelectItem>
                      <SelectItem value="MIXTO">Mixto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {metodo === 'MIXTO' && (
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="efectivo"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Efectivo</Label>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transferencia"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Transferencia</Label>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {metodo === METODOS_PAGO.TRANSFERENCIA ||
            metodo === METODOS_PAGO.MIXTO ? (
              <FormField
                control={form.control}
                name="tarjeta"
                render={({ field }) => (
                  <FormItem>
                    <Label>Tarjeta</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            form.formState.errors?.metodoPago &&
                              'border-destructive'
                          )}
                        >
                          <SelectValue placeholder="Selecciona una tarjeta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tarjetas?.map((tarjeta) => (
                          <SelectItem
                            key={tarjeta.id}
                            value={tarjeta.id.toString()}
                            disabled={!tarjeta.disponible}
                          >
                            <div className="flex gap-2 items-center ">
                              <div
                                className={cn(
                                  'w-6 aspect-square rounded-full bg-gradient-to-br',
                                  tarjeta.banco === Banco.BANDEC &&
                                    'from-[#6c0207] to-[#bc1f26]',
                                  tarjeta.banco === Banco.BPA &&
                                    'from-[#1d6156] to-[#1d6156]'
                                )}
                              ></div>
                              <p>{tarjeta.nombre}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="producto_info"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2">
                  <Label>Producto</Label>
                  <Popover open={open} onOpenChange={setOpen}>
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
                                (producto) =>
                                  producto?.id?.toString() === field.value
                              )?.descripcion
                            : 'Selecciona un producto'}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      containerRef={formRef}
                      className="w-[320px] p-0"
                    >
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Escribe un código..." />
                        <CommandList>
                          <CommandEmpty>
                            Ningún resultado encontrado.
                          </CommandEmpty>
                          <CommandGroup heading="Sugerencias">
                            {productosInfo?.map((producto) => (
                              <CommandItem
                                key={producto.id}
                                value={producto.id?.toString()}
                                keywords={[producto.descripcion]}
                                onSelect={(currentValue) => {
                                  const esZapato =
                                    productosInfo?.find(
                                      (e) => e.id.toString() === currentValue
                                    )?.categoria === 'Zapatos';

                                  if (esZapato) {
                                    form.setValue('cantidad', undefined);
                                    form.setValue('zapatos_id', []);
                                  } else {
                                    form.setValue('zapatos_id', undefined);
                                    form.setValue('cantidad', 0);
                                  }
                                  field.onChange(
                                    currentValue === field.value
                                      ? ''
                                      : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {producto.descripcion}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    producto.id?.toString() === field.value
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

            {info_producto &&
              productosInfo?.find((p) => p.id.toString() === info_producto)
                ?.categoria === 'Zapatos' && (
                <div className="space-y-2">
                  <Label>Productos</Label>

                  {zapatos_id && zapatos_id?.length > 0 && (
                    <ul
                      className={cn(
                        'overflow-y-auto flex gap-2 p-2 max-h-[328px] flex-col items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm bg-accent hover:text-accent-foreground rounded-md px-3 text-xs border-dashed ',
                        form?.formState?.errors?.zapatos_id &&
                          'border-destructive'
                      )}
                    >
                      {fields?.map((p, index) => (
                        <li
                          key={p.id}
                          className="flex w-full p-2 px-4 justify-between items-center bg-background rounded-md"
                        >
                          <span>{p.value}</span>
                          <X
                            className="ml-2 cursor-pointer"
                            onClick={() => remove(index)}
                            size={16}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-2">
                    <Input
                      ref={ref}
                      type="number"
                      placeholder="Introduzca Id"
                    />
                    <Button type="button" onClick={handleNewProducts}>
                      <PlusCircle className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {form.formState.errors?.zapatos_id?.message}
                  </p>
                </div>
              )}

            {info_producto &&
              productosInfo?.find((p) => p.id.toString() === info_producto)
                ?.categoria !== 'Zapatos' && (
                <div className="space-y-2">
                  <Label>Cantidad</Label>
                  <Input
                    {...form.register('cantidad', { valueAsNumber: true })}
                    type="number"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {form.formState.errors?.cantidad?.message}
                  </p>
                </div>
              )}

            <div className="grid gap-4">
              <DialogFooter className="w-full flex gap-2 mt-2">
                <DialogClose asChild>
                  <Button type="button" className="w-full" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Agregando...
                    </>
                  ) : (
                    'Agregar'
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
