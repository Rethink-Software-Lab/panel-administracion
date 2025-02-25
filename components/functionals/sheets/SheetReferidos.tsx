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

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { ReferidoSchema } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

import { Referido } from '@/app/(with-layout)/referidos/types';
import {
  addReferido,
  updateReferido,
} from '@/app/(with-layout)/referidos/actions';

export default function SheetReferidos({ referido }: { referido?: Referido }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof ReferidoSchema>>({
    resolver: valibotResolver(ReferidoSchema),
    defaultValues: {
      nombre: referido?.nombre || '',
      telefono: referido?.telefono || '',
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof ReferidoSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = referido
      ? await updateReferido(dataForm, referido?.id)
      : await addReferido(dataForm);

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
        {!referido ? (
          <Button className="gap-1 items-center">
            <PlusCircle size={18} />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar
            </span>
          </Button>
        ) : (
          <Button variant="outline" size="icon">
            <span className="sr-only">Editar</span>
            <Pen size={18} />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{referido ? 'Editar' : 'Agregar'} referido</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el formulario para {referido ? 'editar' : 'agregar'} un
            referido.
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
                <Button type="submit">{referido ? 'Editar' : 'Agregar'}</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
