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
import { CircleX, PlusCircle } from 'lucide-react';
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
import { SalidaCafeteriaSchema } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { addSalidaCafeteria } from '@/app/(with-layout)/salidas-cafeteria/actions';
import ComboboxSalidasCafeteria from '../ComboboxSalidasCafeteria';

export interface ProductoCodigoCategoria {
  id: number;
  codigo: string;
  descripcion: string;
}

export default function SheetGastos({
  productos,
}: {
  productos?: ProductoCodigoCategoria[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof SalidaCafeteriaSchema>>({
    resolver: valibotResolver(SalidaCafeteriaSchema),
    defaultValues: {
      producto: '',
      cantidad: 0,
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof SalidaCafeteriaSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await addSalidaCafeteria(dataForm);

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
        <Button disabled={!productos} className="gap-1 items-center">
          <PlusCircle size={18} />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Agregar salida</SheetTitle>
          <SheetDescription className="pb-4">
            Seleccione el producto y especifique la cantidad que desea enviar a
            la cafetería.
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
              <ComboboxSalidasCafeteria
                form={form}
                productosInfo={productos || []}
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
