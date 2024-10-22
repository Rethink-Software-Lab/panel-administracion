'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import {
  ArrowRight,
  CirclePlus,
  CircleX,
  MinusCircle,
  PlusCircle,
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFieldArray, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { AreaVenta } from '@/app/(with-layout)/areas-de-venta/types';
import { TransferenciaSchema } from '@/lib/schemas';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { ProductInfo } from '@/app/(with-layout)/products/types';
import { Input } from '../ui/input';
import { InferInput } from 'valibot';
import addTransferencia from '@/app/(with-layout)/transferencias/actions';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import SelectProductoTransferencias from '../SelectProductoTransferencias';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function SheetTransferencias({
  areas,
  productosInfo,
}: {
  areas: AreaVenta[];
  productosInfo: ProductInfo[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof TransferenciaSchema>>({
    resolver: valibotResolver(TransferenciaSchema),
    defaultValues: {
      de: '',
      para: '',
      productos: [{ producto: '', cantidad: '0', zapatos_id: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'productos',
  });

  const onSubmit = async (
    dataForm: InferInput<typeof TransferenciaSchema>
  ): Promise<void> => {
    const { data, error } = await addTransferencia(dataForm);
    if (error) {
      setError(error);
    } else {
      form.reset();
      toast.success(data);
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
          <SheetTitle>Agregar transferencia</SheetTitle>
          <SheetDescription className="pb-4">
            Las transferencias permiten trasladar productos de un área de venta
            a otra. En el caso de las transferencias de zapatos deben colocarse
            los IDs separados por comas ( , ) o punto y coma ( ; ).
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
              <div className="max-sm:text-left max-sm:space-y-4  md:flex md:items-start md:justify-between md:gap-2">
                <FormField
                  control={form.control}
                  name="de"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>Área de origen</Label>
                      <Select
                        disabled={!areas || areas.length < 1}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un área de venta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {areas?.map((area) => (
                            <SelectItem
                              key={area.id}
                              value={area.id?.toString()}
                            >
                              {area.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="hidden md:flex w-16 h-full mt-10 items-center justify-center">
                  <ArrowRight size={18} />
                </div>
                <FormField
                  control={form.control}
                  name="para"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>Área de destino</Label>
                      <Select
                        disabled={!areas || areas.length < 1}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              className="line-clamp-1"
                              placeholder="Selecciona un área de venta"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {areas?.map((area) => (
                            <SelectItem
                              key={area.id}
                              value={area.id?.toString()}
                            >
                              {area.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Producto</TableHead>
                    <TableHead className="text-right">Cantidad / Ids</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((producto, index) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-semibold align-top w-1/2">
                        <SelectProductoTransferencias
                          form={form}
                          index={index}
                          productosInfo={productosInfo}
                          formRef={formRef}
                        />
                      </TableCell>
                      {productosInfo.find(
                        (p) =>
                          p.id.toString() ===
                          form.getValues(`productos.${index}.producto`)
                      )?.categoria.nombre === 'Zapatos' ? (
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`productos.${index}.zapatos_id`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`productos.${index}.cantidad`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    step="1"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      )}

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
                        zapatos_id: undefined,
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
                <Button type="submit">Transferir</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
