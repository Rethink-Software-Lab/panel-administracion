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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, useWatch } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { EntradaCafeteriaSchema } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  FrecuenciasGastos,
  Gasto,
  TiposGastos,
} from '@/app/(with-layout)/gastos/types';
import { addEntradaCafeteria } from '@/app/(with-layout)/entradas-cafeteria/actions';
import { AreaVenta } from '@/app/(with-layout)/areas-de-venta/types';
import { Categoria } from '@/app/(with-layout)/categorias/types';
import ComboboxEntradasCafeteria from '../ComboboxEntradasCafeteria';
import { METODOS_PAGO } from '@/app/(with-layout)/entradas-cafeteria/types';

export interface ProductoCodigoCategoria {
  id: number;
  codigo: string;
  descripcion: string;
}

export default function SheetGastos({
  productos,
}: {
  productos: ProductoCodigoCategoria[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof EntradaCafeteriaSchema>>({
    resolver: valibotResolver(EntradaCafeteriaSchema),
    defaultValues: {
      proveedor: '',
      comprador: '',
      metodoPago: undefined,
      producto: '',
      cantidad: 0,
    },
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

          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="proveedor"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Proveedor</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="metodoPago"
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
              <ComboboxEntradasCafeteria
                form={form}
                productosInfo={productos}
                formRef={formRef}
              />

              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Cantidad</Label>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
