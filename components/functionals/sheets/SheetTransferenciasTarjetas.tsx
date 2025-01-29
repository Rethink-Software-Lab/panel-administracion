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
import { ArrowDownLeft, ArrowUpRight, CircleX, PlusCircle } from 'lucide-react';
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
import { TransferenciasTarjetas } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Banco,
  Tarjetas,
  TipoTransferencia,
} from '@/app/(with-layout)/tarjetas/types';
import { addTransferenciaTarjeta } from '@/app/(with-layout)/tarjetas/actions';
import { cn } from '@/lib/utils';

export default function SheetTransferenciasTarjetas({
  tarjetas,
}: {
  tarjetas: Tarjetas[] | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof TransferenciasTarjetas>>({
    resolver: valibotResolver(TransferenciasTarjetas),
    defaultValues: {
      descripcion: '',
      tipo: undefined,
      cantidad: '0',
      tarjeta: undefined,
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof TransferenciasTarjetas>
  ): Promise<void> => {
    const { data: dataRes, error } = await addTransferenciaTarjeta(dataForm);

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
        <Button disabled={!tarjetas} className="gap-1 items-center">
          <PlusCircle size={18} />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Agregar transferecia</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el formulario para agregar una transferecia.
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
                name="tipo"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Tipo</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TipoTransferencia.INGRESO}>
                          <div className="flex items-center gap-2">
                            <ArrowDownLeft className="text-green-500" />
                            Ingreso
                          </div>
                        </SelectItem>
                        <SelectItem value={TipoTransferencia.EGRESO}>
                          <div className="flex items-center gap-2">
                            <ArrowUpRight className="text-red-500" />
                            Egreso
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tarjeta"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Tarjeta</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una tarjeta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tarjetas?.map((tarjeta) => (
                          <SelectItem
                            key={tarjeta.id}
                            value={tarjeta.id.toString()}
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
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Descripción</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Valor</Label>
                    <FormControl>
                      <Input {...field} type="number" step={0.01} min={1} />
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
