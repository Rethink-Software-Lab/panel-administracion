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
import { CircleX, PlusSquare } from 'lucide-react';
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
import { TarjetasSchema } from '@/lib/schemas';

import { Input } from '@/components/ui/input';
import { InferInput } from 'valibot';
import { toast } from 'sonner';
import { useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Banco } from '@/app/(with-layout)/tarjetas/types';
import { addTarjeta } from '@/app/(with-layout)/tarjetas/actions';

export default function SheetTarjetas({ isError }: { isError: boolean }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof TarjetasSchema>>({
    resolver: valibotResolver(TarjetasSchema),
    defaultValues: {
      nombre: '',
      banco: undefined,
      saldo_inicial: '0',
    },
  });

  const onSubmit = async (
    dataForm: InferInput<typeof TarjetasSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await addTarjeta(dataForm);

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
      <SheetTrigger disabled={isError}>
        <Card
          style={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}
          className="aspect-video h-full cursor-pointer min-h-40"
        >
          <CardContent className="text-black/40 h-full p-8 flex flex-col gap-2 justify-center items-center">
            <PlusSquare size={24} />
            <p className="text-xl font-bold">Agregar Tarjeta</p>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Agregar tarjeta</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el formulario para agregar una tarjeta.
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
                name="banco"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Banco</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un banco" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Banco.BPA}>BPA</SelectItem>
                        <SelectItem value={Banco.BANDEC}>BANDEC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="saldo_inicial"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>
                      Saldo inicial <span className="text-xs">(opcional)</span>
                    </Label>
                    <FormControl>
                      <Input {...field} type="number" step={0.01} min={0} />
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
