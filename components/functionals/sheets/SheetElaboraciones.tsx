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

import { useFieldArray, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { ElaboracionesSchema } from '@/lib/schemas';
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
import SelectProductoElaboraciones from '../SelectProductoElaboraciones';
import {
  addElaboracion,
  editElaboracion,
} from '@/app/(with-layout)/(cafeteria)/elaboraciones/actions';
import { ProductoEntrada } from '@/app/(with-layout)/(cafeteria)/entradas-cafeteria/types';
import { Elaboraciones } from '@/app/(with-layout)/(cafeteria)/elaboraciones/types';

export default function SheetElaboraciones({
  data,
  productos,
}: {
  data?: Elaboraciones;
  productos?: ProductoEntrada[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof ElaboracionesSchema>>({
    resolver: valibotResolver(ElaboracionesSchema),
    defaultValues: {
      nombre: data?.nombre || '',
      precio: data?.precio.toLocaleString() || '',
      mano_obra: data?.mano_obra.toLocaleString() || '',
      ingredientes: data?.ingredientes_cantidad.map((ing) => ({
        producto: ing.ingrediente.id.toLocaleString(),
        cantidad: ing.cantidad.toLocaleString(),
      })) || [{ producto: '', cantidad: '0' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredientes',
  });

  const onSubmit = async (
    dataForm: InferInput<typeof ElaboracionesSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = data
      ? await editElaboracion(dataForm, data.id)
      : await addElaboracion(dataForm);
    if (error) {
      setError(error);
    } else {
      form.reset();
      toast.success(dataRes);
      setOpen(false);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger asChild>
        {data ? (
          <Button variant="outline" size="icon">
            <span className="sr-only">Editar</span>
            <Pen size={18} />
          </Button>
        ) : (
          <Button className="gap-1 items-center">
            <PlusCircle size={18} />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{data ? 'Editar' : 'Agregar'} elaboración</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el formulario para agregar un producto.
          </SheetDescription>
          {error && (
            <Alert className="text-left" variant="destructive">
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {form.formState.errors.ingredientes?.root && (
            <Alert className="text-left" variant="destructive">
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                {form.formState.errors.ingredientes.root?.message}
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
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex justify-start">Nombre</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="precio"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex justify-start">Precio</Label>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mano_obra"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex justify-start">Mano de obra</Label>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
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
                      <TableCell className="font-semibold align-top w-1/2">
                        <SelectProductoElaboraciones
                          form={form}
                          index={index}
                          productos={productos || []}
                          formRef={formRef}
                        />
                      </TableCell>

                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`ingredientes.${index}.cantidad`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0.001}
                                  step="0.001"
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
                <Button type="submit">{data ? 'Editar' : 'Agregar'}</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
