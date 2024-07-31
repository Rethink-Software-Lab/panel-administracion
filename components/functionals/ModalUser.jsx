'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

import { useForm, useWatch } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { UserSchema } from '@/lib/schemas';

import { createUser, editUser } from '@/lib/actions';
import { toast } from 'sonner';
import { CircleX, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function ModalUser({ data = null, trigger, areas }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: valibotResolver(UserSchema),
    defaultValues: {
      username: data?.username || '',
      rol: data?.rol || '',
      password: '',
      areaVenta: data?.areaVenta?.id?.toString(),
    },
  });

  const rol = useWatch({
    control: form.control,
    name: 'rol',
  });

  const onSubmit = async (dataForm) => {
    setIsLoading(true);
    if (!data) {
      const { errors } = await createUser(dataForm);
      setIsLoading(false);
      if (!errors) {
        form.reset();
        setIsOpen(false);
        toast.success('El usuario fué creado.');
      }
      setErrors(errors);
    } else {
      const { errors } = await editUser({ ...dataForm, id: data?.id });
      setIsLoading(false);
      if (!errors) {
        setIsOpen(false);
        toast.success('El usuario fué editado.');
      }
      setErrors(errors);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Editar' : 'Agregar'} Usuario</DialogTitle>
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
              name="username"
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
              name="rol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      form.getValues('rol') !== 'VENDEDOR' &&
                        form.setValue('areaVenta', undefined);
                      form.setValue('rol', value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="ALMACENERO">Almacenero</SelectItem>
                      <SelectItem value="VENDEDOR">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {rol === 'VENDEDOR' && (
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
                          <SelectValue placeholder="Selecciona un área de venta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {areas?.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
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
