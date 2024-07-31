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

import { createProduct, editProduct } from '@/lib/actions';
import { toast } from 'sonner';
import { CircleX, LoaderCircle, UploadIcon, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { ADD_PRODUCT_INFO, UPDATE_PRODUCT_INFO } from '@/lib/mutations';
import { optional, pipe, safeParse, string, url } from 'valibot';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function formatBytes(bytes) {
  const decimals = 1;
  const sizeType = 'normal';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}

export default function ModalProduct({ data = null, trigger, categorias }) {
  const [imagen, setImage] = useState(data?.imagen?.url || undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: valibotResolver(ProductSchema),
    defaultValues: {
      ...data,
      categoria: data?.categoria?.id?.toString(),
    },
  });

  const { success, output } = safeParse(
    optional(pipe(string(), url())),
    imagen
  );

  const onSubmit = async (dataForm) => {
    setIsLoading(true);
    const formData = new FormData();
    if (!data) {
      formData.append(
        'operations',
        JSON.stringify({
          query: ADD_PRODUCT_INFO,
          variables: { ...dataForm, imagen: null },
        })
      );
      if (imagen) {
        const map = JSON.stringify({
          0: ['variables.imagen'],
        });
        formData.append('map', map);
        formData.append('0', imagen[0]);
      }

      const { errors } = await createProduct(formData);
      setIsLoading(false);
      if (!errors) {
        form.reset();
        setImage(undefined);
        setIsOpen(false);
        toast.success('El producto fué creado con éxito.');
      }
      setErrors(errors);
    } else {
      formData.append(
        'operations',
        JSON.stringify({
          query: UPDATE_PRODUCT_INFO,
          variables: {
            ...dataForm,
            id: data?.id,
            imagen: success ? imagen : null,
          },
        })
      );
      if (output !== undefined && !success) {
        const map = JSON.stringify({
          0: ['variables.imagen'],
        });
        formData.append('map', map);
        formData.append('0', imagen?.[0]);
      }
      const { errors } = await editProduct(formData);
      setIsLoading(false);
      if (!errors) {
        form.reset();
        setImage(undefined);
        setIsOpen(false);
        toast.success('El producto fué editado con éxito.');
      }
      setErrors(errors);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? 'Editar' : 'Agregar'} Producto</DialogTitle>
        </DialogHeader>
        <DialogDescription>Todos los campos son requeridos</DialogDescription>
        {errors &&
          errors.map((error, index) => (
            <Alert variant="destructive" key={index}>
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                {error.message.startsWith('UNIQUE constraint failed')
                  ? 'Ya existe un producto con ese código'
                  : error.message}
              </AlertDescription>
            </Alert>
          ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      {categorias.map((c) => (
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
            <div className="relative flex flex-col gap-6 overflow-hidden">
              {output === undefined && (
                <label
                  htmlFor="imagen"
                  className="group relative grid h-40 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                    <div className="rounded-full border border-dashed p-3">
                      <UploadIcon
                        className="size-7 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="space-y-px">
                      <p className="font-medium text-muted-foreground">
                        Click para seleccionar imagen.
                      </p>
                    </div>
                  </div>
                </label>
              )}

              {output !== undefined && (
                <div className="max-h-48 space-y-4">
                  <div className="relative flex items-center space-x-4">
                    <Image
                      priority
                      src={success ? imagen : URL.createObjectURL(imagen?.[0])}
                      alt="asd"
                      width={48}
                      height={48}
                      className="aspect-square shrink-0 rounded-md object-cover"
                    />
                    <div className="flex flex-1 space-x-4">
                      <div className="flex w-full flex-col gap-2">
                        <div className="space-y-px">
                          <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                            {!success && imagen[0].name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {!success && formatBytes(imagen[0].size)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() => setImage(undefined)}
                      >
                        <X className="size-4 " aria-hidden="true" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <input
              id="imagen"
              onChange={(e) => setImage(e.target.files)}
              type="file"
              accept="image/*"
              hidden
            />
            <FormField
              control={form.control}
              name="precioCosto"
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
              name="precioVenta"
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
