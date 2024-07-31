'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogClose,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckIcon, X, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useFieldArray, useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { SalidaSchema } from '@/lib/schemas';

import { updateSalida, addSalida } from '@/lib/actions';
import { toast } from 'sonner';
import { CircleX, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { Label } from '../ui/label';

export default function ModalSalida({
  data = null,
  trigger,
  areasVenta,
  productos,
}) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: valibotResolver(SalidaSchema),
    defaultValues: {
      areaVenta: data?.areaVenta?.id,
      productos: data?.productos?.map((p) => p.id),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'productos',
  });

  const onSubmit = async (dataForm) => {
    setIsLoading(true);
    if (!data) {
      const { errors } = await addSalida(dataForm);
      setIsLoading(false);
      if (!errors) {
        form.reset();
        setIsOpen(false);
        toast.success('La salida fué creada con éxito.');
      }
      setErrors(errors);
    } else {
      const { errors } = await updateSalida({ ...dataForm, id: data?.id });
      setIsLoading(false);
      if (!errors) {
        setIsOpen(false);
        toast.success('La salida fué editada con éxito.');
      }
      setErrors(errors);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Editar' : 'Agregar'} Salida</DialogTitle>
        </DialogHeader>
        <DialogDescription>Todos los campos son requeridos</DialogDescription>
        {errors &&
          errors.map((error, index) => (
            <Alert variant="destructive" key={index}>
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                {error.message.startsWith('UNIQUE constraint failed')
                  ? 'Ya existe un usuario con ese nombre'
                  : error.message}
              </AlertDescription>
            </Alert>
          ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="areaVenta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de venta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione área de venta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areasVenta?.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <Label>Productos</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <div
                  className={cn(
                    'flex gap-2 p-1 h-fit flex-wrap items-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs border-dashed ',
                    form?.formState?.errors?.productos && 'border-destructive'
                  )}
                >
                  {form.getValues('productos')?.map((p, index) => (
                    <Button
                      key={p}
                      size="sm"
                      variant="outline"
                      className="flex p-1.5 justify-between items-center"
                    >
                      {p}{' '}
                      <X
                        className="ml-2"
                        onClick={() => remove(index)}
                        size={16}
                      />
                    </Button>
                  ))}
                  <PopoverTrigger asChild>
                    <Button size="sm" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Añadir
                    </Button>
                  </PopoverTrigger>
                </div>
                <p className="text-[0.8rem] font-medium text-destructive">
                  {form?.formState?.errors?.productos?.message}
                </p>
                <PopoverContent className="w-[320px] p-0">
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Escribe un id..." />
                    <CommandList>
                      <CommandEmpty>Ningún resultado encontrado.</CommandEmpty>
                      <CommandGroup heading="Sugerencias">
                        {productos?.map((producto) => (
                          <CommandItem
                            key={producto.id}
                            value={producto.id}
                            onSelect={(currentValue) => {
                              const index = form
                                .getValues('productos')
                                ?.indexOf(currentValue);
                              index >= 0 ? remove(index) : append(currentValue);
                              setOpen(false);
                            }}
                          >
                            {producto.id}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                form
                                  .getValues('productos')
                                  ?.includes(producto.id)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-4">
              <DialogFooter className="w-full flex gap-2 mt-2">
                <DialogClose asChild>
                  <Button type="button" className="w-full" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      {data ? 'Editando...' : 'Agregando...'}
                    </>
                  ) : (
                    <>{data ? 'Editar' : 'Agregar'}</>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
