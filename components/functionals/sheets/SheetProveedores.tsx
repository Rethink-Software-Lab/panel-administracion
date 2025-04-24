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
import { CircleX, Pen, PlusCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ProveedorSchema } from '@/app/(with-layout)/proveedores/schema';
import { Proveedor } from '@/app/(with-layout)/proveedores/types';
import {
  addProveedor,
  editProveedor,
} from '@/app/(with-layout)/proveedores/actions';

export default function SheetGastos({ data }: { data?: Proveedor }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof ProveedorSchema>>({
    resolver: valibotResolver(ProveedorSchema),
    defaultValues: {
      nombre: data?.nombre || '',
      direccion: data?.direccion || '',
      nit: data?.nit || '',
      noCuentaCup: data?.noCuentaCup || '',
      noCuentaMayorista: data?.noCuentaMayorista || '',
      telefono: data?.telefono || '',
    },
  });

  console.log(form.formState.errors);

  const onSubmit = async (
    dataForm: InferInput<typeof ProveedorSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await (data
      ? editProveedor(data.id, dataForm)
      : addProveedor(dataForm));

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
          <SheetTitle>{data ? 'Editar' : 'Agregar'} Proveedor</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el siguiente formulario.
          </SheetDescription>
          {error && (
            <Alert className="text-left" variant="destructive">
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
                name="nombre"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Nombre</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Dirección social</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>NIT</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noCuentaCup"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>No. Cuenta CUP</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noCuentaMayorista"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>No. Cuenta Mayorista</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Teléfono</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
