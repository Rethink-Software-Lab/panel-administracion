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
import { ProductSchema } from '@/lib/schemas';
import { CircleX, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ImagePreview } from '@/components/functionals/ImagePreview';
import { ImageUploadLabel } from '@/components/functionals/ImageUploadLabel';

import { useProductSubmit } from '@/hooks/useProductSubmit';

export default function ModalProduct({ data = null, trigger, categorias }) {
  const [imagen, setImage] = useState(data?.imagen?.url);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: valibotResolver(ProductSchema),
    defaultValues: {
      ...data,
      pago_trabajador: data?.pago_trabajador || 0,
      categoria: data?.categoria?.id?.toString(),
    },
  });

  const watchImagen = form.watch('imagen');

  useEffect(() => {
    if (watchImagen && watchImagen.length > 0) {
      setImage(URL.createObjectURL(watchImagen[0]));
    }
  }, [watchImagen]);

  console.log(form.getValues());

  const { handleSubmit, error, isLoading } = useProductSubmit({
    form,
    setIsOpen,
    setImage,
  });

  const handleImageRemove = () => {
    form.setValue('imagen', undefined);
    setImage(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{data ? 'Editar' : 'Agregar'} Producto</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center md:text-left">
          Todos los campos son requeridos
        </DialogDescription>
        {error && (
          <Alert variant="destructive">
            <CircleX className="h-5 w-5" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="space-y-2 col-span-2 md:col-span-1">
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="Código..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descripción del producto..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categorias?.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.nombre}
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
                name="pago_trabajador"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pago trabajador</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0"
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <div className="relative flex flex-col gap-2 overflow-hidden">
                {imagen ? (
                  <ImagePreview
                    imagen={imagen}
                    fileName={form.getValues('imagen')?.[0]?.name}
                    fileSize={form.getValues('imagen')?.[0]?.size}
                    onRemove={handleImageRemove}
                  />
                ) : (
                  <ImageUploadLabel />
                )}
              </div>
              <input
                id="imagen"
                {...form.register('imagen')}
                type="file"
                accept="image/*"
                hidden
              />
              <FormField
                control={form.control}
                name="precio_costo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de costo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0.1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="precio_venta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de venta</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 col-span-2">
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
