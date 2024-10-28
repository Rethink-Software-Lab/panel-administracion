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
import { GastosSchema } from '@/lib/schemas';

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
import { addGasto, editGasto } from '@/app/(with-layout)/gastos/actions';

export default function SheetGastos({ data }: { data?: Gasto }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof GastosSchema>>({
    resolver: valibotResolver(GastosSchema),
    defaultValues: {
      descripcion: data?.descripcion || '',
      tipo: data?.tipo || undefined,
      frecuencia: data?.frecuencia || undefined,
      cantidad: data?.cantidad || 0,
      dia_mes: data?.dia_mes || undefined,
      dia_semana: data?.dia_semana?.toLocaleString() || undefined,
    },
  });

  console.log(form.getValues());

  const tipo = useWatch({ control: form.control, name: 'tipo' });
  const frecuencia = useWatch({ control: form.control, name: 'frecuencia' });

  const onSubmit = async (
    dataForm: InferInput<typeof GastosSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await (data
      ? editGasto(data.id, dataForm)
      : addGasto(dataForm));

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
          <SheetTitle>{data ? 'Editar' : 'Agregar'} gasto</SheetTitle>
          <SheetDescription className="pb-4">
            El salario requiere un usuario registrado en la aplicación y la
            cantidad que será descontada diariamente de las ventas.
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
                name="tipo"
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <Label>Tipo de gasto</Label>
                    <Select
                      onValueChange={(value) => {
                        console.log(value);
                        if (value === TiposGastos.VARIABLE) {
                          form.setValue('frecuencia', undefined);
                          form.setValue('dia_semana', undefined),
                            form.setValue('dia_mes', undefined);
                        }
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo de gasto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TiposGastos.FIJO}>Fijo</SelectItem>
                        <SelectItem value={TiposGastos.VARIABLE}>
                          Variable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {tipo === TiposGastos.FIJO && (
                <FormField
                  control={form.control}
                  name="frecuencia"
                  render={({ field }) => (
                    <FormItem className="w-full text-left">
                      <Label>Frecuencia</Label>
                      <Select
                        onValueChange={(value) => {
                          if (value === FrecuenciasGastos.MENSUAL) {
                            form.setValue('dia_semana', undefined);
                          }
                          if (value === FrecuenciasGastos.SEMANAL) {
                            form.setValue('dia_mes', undefined);
                          }
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una frecuencia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={FrecuenciasGastos.MENSUAL}>
                            Mensual
                          </SelectItem>
                          <SelectItem value={FrecuenciasGastos.SEMANAL}>
                            Semanal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {frecuencia === FrecuenciasGastos.SEMANAL && (
                <FormField
                  control={form.control}
                  name="dia_semana"
                  render={({ field }) => (
                    <FormItem className="w-full text-left">
                      <Label>Día de la semana</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un día" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Lunes</SelectItem>
                          <SelectItem value="1">Martes</SelectItem>
                          <SelectItem value="2">Miércoles</SelectItem>
                          <SelectItem value="3">Jueves</SelectItem>
                          <SelectItem value="4">Viernes</SelectItem>
                          <SelectItem value="5">Sábado</SelectItem>
                          <SelectItem value="6">Domingo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {frecuencia === FrecuenciasGastos.MENSUAL && (
                <FormField
                  control={form.control}
                  name="dia_mes"
                  render={({ field }) => (
                    <FormItem className="w-full text-left">
                      <Label>Día del mes</Label>
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
              )}
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
                <Button type="submit">{data ? 'Editar' : 'Agregar'}</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
