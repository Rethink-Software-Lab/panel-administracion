'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  CirclePlus,
  CircleX,
  MinusCircle,
  Pen,
  PlusCircle,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { VentasCafeteriaSchema } from '@/lib/schemas';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { METODOS_PAGO } from '@/app/(with-layout)/(cafeteria)/entradas-cafeteria/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Banco } from '@/app/(with-layout)/tarjetas/types';
import SelectProductoVentaCafeteria from '../SelectProductoVentasCafeteria';
import {
  Productos_Elaboraciones,
  TarjetasVentas,
} from '@/app/(with-layout)/(cafeteria)/ventas-cafeteria/types';
import { addVentaCafeteria } from '@/app/(with-layout)/(cafeteria)/ventas-cafeteria/actions';

export default function SheetVentasCafeteria({
  productos,
  tarjetas,
}: {
  productos?: Productos_Elaboraciones[];
  tarjetas?: TarjetasVentas[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof VentasCafeteriaSchema>>({
    resolver: valibotResolver(VentasCafeteriaSchema),
    defaultValues: {
      metodo_pago: undefined,
      efectivo: undefined,
      transferencia: undefined,
      tarjeta: '',
      productos: [{ producto: '', cantidad: '0', isElaboracion: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'productos',
  });

  const metodo = useWatch({
    control: form.control,
    name: 'metodo_pago',
  });

  const onSubmit = async (
    dataForm: InferInput<typeof VentasCafeteriaSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await addVentaCafeteria(dataForm);
    if (error) {
      setError(error);
    } else {
      form.reset();
      toast.success(dataRes);
      setOpen(false);
      setError('');
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger asChild>
        <Button className="gap-1 items-center">
          <PlusCircle size={18} />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Agregar venta</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el formulario para agregar una venta.
          </SheetDescription>
          {error && (
            <Alert className="text-left" variant="destructive">
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {form.formState.errors.productos?.root && (
            <Alert className="text-left" variant="destructive">
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                {form.formState.errors.productos.root?.message}
              </AlertDescription>
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
                name="metodo_pago"
                render={({ field }) => (
                  <FormItem>
                    <Label>Método de pago</Label>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === 'MIXTO') {
                          form.setValue('efectivo', '0');
                          form.setValue('transferencia', '0');
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
                            form.formState.errors?.metodo_pago &&
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
                            onChange={(value) => field.onChange(value)}
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
                            onChange={field.onChange}
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
                              form.formState.errors?.tarjeta &&
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
                              disabled={!tarjeta.isAvailable}
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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((producto, index) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-semibold align-top w-1/2">
                        <SelectProductoVentaCafeteria
                          form={form}
                          index={index}
                          productos={productos || []}
                          formRef={formRef}
                        />
                      </TableCell>

                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`productos.${index}.cantidad`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0.01}
                                  step="0.01"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
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
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  <Button
                    className="gap-1"
                    onClick={() =>
                      append({
                        producto: '',
                        cantidad: '0',
                        isElaboracion: false,
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    <CirclePlus size={14} />
                    Agregar
                  </Button>
                </TableCaption>
              </Table>
              <div className="flex justify-end">
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
