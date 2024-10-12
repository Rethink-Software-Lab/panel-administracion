'use client';

import { Input } from '@/components/ui/input';
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

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { AreaVentaSchema } from '@/lib/schemas';

import { createAreaVenta, editAreaVenta } from '@/lib/actions';
import {
  addArea,
  updateArea,
} from '@/app/(with-layout)/areas-de-venta/actions';
import { toast } from 'sonner';
import { CircleX, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function ModalAreasVenta({ data, trigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: valibotResolver(AreaVentaSchema),
    defaultValues: { ...data },
  });

  const onSubmit = async (dataForm) => {
    setIsLoading(true);
    if (!data) {
      const { data, error } = await addArea(dataForm);
      setIsLoading(false);
      if (!error) {
        form.reset();
        setIsOpen(false);
        toast.success(data);
      }
      setErrors(error);
    } else {
      const { data: dataRes, error } = await updateArea(data?.id, dataForm);
      setIsLoading(false);
      if (!error) {
        setIsOpen(false);
        toast.success(dataRes);
      }
      setErrors(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Editar' : 'Agregar'} Área de Venta</DialogTitle>
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
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
