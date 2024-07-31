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
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { onlyNombreSchema } from '@/lib/schemas';

import {
  addCategoria,
  updateCategoria,
} from '@/app/(with-layout)/categorias/actions';
import { toast } from 'sonner';
import { CircleX, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Label } from '../ui/label';

export default function ModalCategoria({ data = null, trigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: valibotResolver(onlyNombreSchema),
    defaultValues: {
      nombre: data?.nombre,
    },
  });

  const onSubmit = async (dataForm) => {
    setIsLoading(true);
    if (!data) {
      const { data, error } = await addCategoria(dataForm);
      setIsLoading(false);
      if (!error) {
        form.reset();
        setIsOpen(false);
        toast.success(data);
      }
      setError(error);
    } else {
      const { data: dataResponse, error } = await updateCategoria({
        ...dataForm,
        id: data?.id,
      });
      setIsLoading(false);
      if (!error) {
        setIsOpen(false);
        toast.success(dataResponse);
      }
      setError(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Editar' : 'Agregar'} Categoría</DialogTitle>
        </DialogHeader>
        <DialogDescription>Todos los campos son requeridos</DialogDescription>
        {error && (
          <Alert variant="destructive">
            <CircleX className="h-5 w-5" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <Label>Nombre</Label>
                  <FormControl>
                    <Input {...field} />
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
