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
import { CirclePlus, CircleX, MinusCircle, PlusCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFieldArray, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { addEntradaCafeteria } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/actions';

import {
  METODOS_PAGO,
  ProductoEntrada,
} from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SelectProductoEntradaCafeteria from '../SelectProductoEntradaCafeteria';
import { Banco, Tarjetas } from '@/app/(with-layout)/tarjetas/types';
import { cn } from '@/lib/utils';
import ComboboxProveedorCafeteria from '../combobox-proveedor-cafeteria';
import { Proveedor } from '@/app/(with-layout)/proveedores/types';
import { EntradaCafeteriaSchema } from '@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/schema';

export default function SheetEntradasCafeteria({
  productos,
  cuentas,
  proveedores,
}: {
  productos: ProductoEntrada[];
  cuentas: Tarjetas[];
  proveedores: Pick<Proveedor, 'id' | 'nombre'>[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [isManual, setIsManual] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof EntradaCafeteriaSchema>>({
    resolver: valibotResolver(EntradaCafeteriaSchema),
    defaultValues: {
      proveedor: '',
      comprador: '',
      metodo_pago: undefined,
      productos: [
        { producto: '', cantidad: '0', precio_costo: '0', precio_venta: '0' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'productos',
  });

  const onSubmit = async (
    dataForm: InferInput<typeof EntradaCafeteriaSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await addEntradaCafeteria(dataForm);

    if (error) {
      setError(error);
    } else {
      form.reset();
      setError('');
      toast.success(dataRes);
      setOpen(false);
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
          <SheetTitle>Agregar entrada</SheetTitle>
          <SheetDescription className="pb-4">
            Ingrese los detalles de la entrada del producto al almacén de la
            cafetería, incluyendo la cantidad, el proveedor y el comprador.
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
              <ComboboxProveedorCafeteria
                form={form}
                formRef={formRef}
                proveedores={proveedores}
                isManual={isManual}
                setIsManual={setIsManual}
              />
              {isManual && (
                <>
                  <FormField
                    control={form.control}
                    name="proveedor_nombre"
                    render={({ field }) => (
                      <FormItem className="w-full text-left">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nombre del proveedor"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proveedor_nit"
                    render={({ field }) => (
                      <FormItem className="w-full text-left">
                        <FormControl>
                          <Input {...field} placeholder="NIT del proveedor" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proveedor_telefono"
                    render={({ field }) => (
                      <FormItem className="w-full text-left">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Teléfono del proveedor"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proveedor_direccion"
                    render={({ field }) => (
                      <FormItem className="w-full text-left">
                        <FormControl>
                          <Input {...field} placeholder="Domicilio soial" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proveedor_no_cuenta_cup"
                    render={({ field }) => (
                      <FormItem className="w-full text-left">
                        <FormControl>
                          <Input {...field} placeholder="Cuenta en CUP" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proveedor_no_cuenta_mayorista"
                    render={({ field }) => (
                      <FormItem className="w-full text-left">
                        <FormControl>
                          <Input {...field} placeholder="Cuenta Mayorista" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="comprador"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Comprador</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metodo_pago"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Método de pago</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un método de pago" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={METODOS_PAGO.EFECTIVO}>
                          Efectivo
                        </SelectItem>
                        <SelectItem value={METODOS_PAGO.TRANSFERENCIA}>
                          Transferecia
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
                  <FormItem>
                    <Label className="flex justify-start">Cuentas</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            form.formState.errors?.cuenta &&
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
                            disabled={!cuenta}
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
                      <TableCell className="align-top w-1/2 space-y-2">
                        <SelectProductoEntradaCafeteria
                          form={form}
                          index={index}
                          productos={productos || []}
                          formRef={formRef}
                        />
                        <FormField
                          control={form.control}
                          name={`productos.${index}.precio_costo`}
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <Label className="text-sm font-medium text-muted-foreground">
                                Precio Costo
                              </Label>
                              <FormControl>
                                <Input
                                  style={{ marginTop: 0 }}
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

                      <TableCell className="space-y-2">
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
                        <FormField
                          control={form.control}
                          name={`productos.${index}.precio_venta`}
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <Label className="text-sm font-medium text-muted-foreground">
                                Precio Venta
                              </Label>
                              <FormControl>
                                <Input
                                  style={{ marginTop: 0 }}
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
