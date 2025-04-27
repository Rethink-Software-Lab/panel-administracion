'use client';
import {
  CheckIcon,
  ChevronDown,
  LoaderCircle,
  MinusCircle,
  PlusCircle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EntradaSchema } from '@/lib/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { createEntrada } from '@/app/(with-layout)/create-entrada/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Banco } from '@/app/(with-layout)/tarjetas/types';

function NestedArray({ nestedIndex, register, control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variantes.${nestedIndex}.numeros`,
  });

  return (
    <>
      {fields.map((numero, index, row) => (
        <div key={numero.id} className="grid grid-cols-5">
          <div className="col-span-2 p-2 align-middle">
            <Input
              className="mb-1"
              {...register(`variantes.${nestedIndex}.numeros.${index}.numero`, {
                valueAsNumber: true,
              })}
              type="number"
              min={0}
            />
            <Label className="text-[0.8rem] font-medium text-destructive">
              {
                errors.variantes?.[nestedIndex]?.numeros?.[index]?.numero
                  ?.message
              }
            </Label>
          </div>
          <div className="col-span-2 p-2 align-middle">
            <Input
              className="mb-1"
              {...register(
                `variantes.${nestedIndex}.numeros.${index}.cantidad`,
                {
                  valueAsNumber: true,
                }
              )}
              min={1}
              type="number"
            />
            <Label className="text-[0.8rem] font-medium text-destructive">
              {
                errors.variantes?.[nestedIndex]?.numeros?.[index]?.cantidad
                  ?.message
              }
            </Label>
          </div>
          <div className="p-2 align-middle">
            {index > 0 && (
              <Button
                onClick={() => remove(index)}
                size="icon"
                variant="ghost"
                className="gap-1"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          {index + 1 === row.length && (
            <div className="p-2 align-middle col-span-4 text-center">
              <Button
                onClick={() =>
                  append({
                    numero: 0,
                    cantidad: 0,
                  })
                }
                size="sm"
                variant="ghost"
                className="gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Añadir número
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default function FormEntradas({ productos, cuentas, proveedores }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dataModal, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: valibotResolver(EntradaSchema),
    defaultValues: {
      proveedor: '',
      comprador: '',
      metodoPago: '',
      productInfo: '',
      cantidad: 0,
    },
  });
  const {
    fields: fieldsVariant,
    append: appendVariant,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'variantes',
  });

  const producto = useWatch({ control: form.control, name: 'productInfo' });

  const onSubmit = async (dataForm) => {
    setLoading(true);
    const { data, errors } = await createEntrada(dataForm);
    setLoading(false);
    if (!errors && !data) {
      toast.success('Entrada creada con éxito.');
      router.push('/entradas');
    } else if (!errors) {
      setData(data);
      setOpenDialog(true);
    } else {
      toast.error(errors?.map((e) => e.message));
    }
  };

  return (
    <>
      <AlertDialog open={openDialog} setOpen={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Entrada creada con éxito!</AlertDialogTitle>
            <AlertDialogDescription className="pb-2">
              Estos datos se quedan almacenados en la tabla de Entradas.
            </AlertDialogDescription>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead className="grid grid-cols-2 items-center">
                    <p>Número</p>
                    <p>IDs</p>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataModal?.map((res, index) => (
                  <TableRow key={`${res?.color}-${index}`}>
                    <TableCell className="align-top">{res?.color}</TableCell>
                    <TableCell>
                      {res?.numeros?.map((n, index) => (
                        <div key={`${n}-${index}`} className="grid grid-cols-2">
                          <p>{n?.numero}</p>
                          <p>{n?.ids}</p>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                router.push('/entradas');
              }}
            >
              Cerrar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la entrada</CardTitle>
              <CardDescription>
                Todos los campos son requeridos.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proveedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proveedor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proveedores?.map((proveedor) => (
                          <SelectItem
                            key={proveedor.id}
                            value={proveedor.id.toString()}
                          >
                            {proveedor.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comprador"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprador</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metodoPago"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de pago</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un método de pago" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                        <SelectItem value="TRANSFERENCIA">
                          Transferencia
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuenta"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel className="flex justify-start">Cuenta</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            form.formState.errors?.tarjeta &&
                              'border-destructive'
                          )}
                        >
                          <SelectValue placeholder="Selecciona una tarjeta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cuentas?.map((cuenta) => (
                          <SelectItem
                            key={cuenta.id}
                            value={cuenta.id.toString()}
                          >
                            <div className="flex gap-2 items-center ">
                              <div
                                className={cn(
                                  'w-6 aspect-square rounded-full bg-gradient-to-br',
                                  cuenta.banco === Banco.BANDEC &&
                                    'from-[#6c0207] to-[#bc1f26]',
                                  cuenta.banco === Banco.BPA &&
                                    'from-[#1d6156] to-[#1d6156]'
                                )}
                              ></div>
                              <p>{cuenta.nombre}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productInfo"
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
                              ? productos?.find(
                                  (producto) => producto?.codigo === field.value
                                )?.codigo
                              : 'Selecciona un producto'}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[320px] p-0">
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Escribe un código..." />
                          <CommandList>
                            <CommandEmpty>
                              Ningún resultado encontrado.
                            </CommandEmpty>
                            <CommandGroup heading="Sugerencias">
                              {productos?.map((producto) => (
                                <CommandItem
                                  key={producto.id}
                                  value={producto.codigo}
                                  onSelect={(currentValue) => {
                                    productos?.find(
                                      (e) => e.codigo === currentValue
                                    )?.categoria !== 'Zapatos'
                                      ? (() => {
                                          form.setValue('variantes', undefined);
                                          form.setValue('cantidad', 0);
                                        })()
                                      : (() => {
                                          form.setValue('cantidad', undefined);
                                          form.setValue('variantes', [
                                            {
                                              color: '',
                                              numeros: [
                                                {
                                                  numero: 0,
                                                  cantidad: 0,
                                                },
                                              ],
                                            },
                                          ]);
                                        })();
                                    field.onChange(
                                      currentValue === field.value
                                        ? ''
                                        : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  {producto.codigo}
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      producto.codigo === field.value
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
              {productos?.find((e) => e.codigo === producto)?.categoria !==
                'Zapatos' && (
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
            </CardContent>
          </Card>
          {productos?.find((p) => p.codigo === producto)?.categoria ===
            'Zapatos' && (
            <Card>
              <CardHeader>
                <CardTitle>Mercancía</CardTitle>
                <CardDescription>
                  Detalla la mercancía entrante por color, número y cantidad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Color</TableHead>
                      <TableHead className="grid grid-cols-5 items-center">
                        <p className="col-span-2">Numero</p>
                        <p className="col-span-2"> Cantidad</p>
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fieldsVariant.map((variant, index) => (
                      <TableRow key={variant.id}>
                        <TableCell className="font-semibold align-top">
                          <Input
                            className="mb-1"
                            {...form.register(`variantes.${index}.color`)}
                          />
                          <Label className="text-[0.8rem] font-medium text-destructive">
                            {
                              form.formState.errors.variantes?.[index]?.color
                                ?.message
                            }
                          </Label>
                        </TableCell>
                        <TableCell className="p-0">
                          <NestedArray
                            nestedIndex={index}
                            register={form.register}
                            control={form.control}
                            errors={form.formState.errors}
                          />
                        </TableCell>
                        <TableCell className="align-top text-center">
                          {index > 0 && (
                            <Button
                              onClick={() => remove(index)}
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <MinusCircle className="h-3.5 w-3.5" />
                              <span className="sr-only md:not-sr-only md:whitespace-nowrap">
                                Eliminar Variante
                              </span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              <CardFooter className="justify-center border-t p-4">
                <Button
                  onClick={() =>
                    appendVariant({
                      color: '',
                      numeros: [{ numero: 0, cantidad: 0 }],
                    })
                  }
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Añadir variante
                </Button>
              </CardFooter>
            </Card>
          )}
          <div className="grid grid-cols-1 gap-2 md:flex md:items-center md:justify-end">
            <Link href="/entradas">
              <Button className="order-2 md:order-none" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button
              className="gap-2 order-1 md:order-none"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Agregando...
                </>
              ) : (
                <>
                  <PlusCircle size={18} />
                  Agregar entrada
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
