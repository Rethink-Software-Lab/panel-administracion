"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogClose,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ProductSchema } from "@/lib/schemas";

import {
  addProducto,
  updateProducto,
} from "@/app/(with-layout)/products/actions";

import { toast } from "sonner";
import { CircleX, LoaderCircle, UploadIcon, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { optional, pipe, safeParse, string, url } from "valibot";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function formatBytes(bytes) {
  const decimals = 1;
  const sizeType = "normal";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export default function ModalProduct({ data = null, trigger, categorias }) {
  const [imagen, setImage] = useState(data?.imagen?.url || undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
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
    if (!success) {
      formData.append("imagen", imagen);
    }
    if (!data) {
      formData.append(
        "data",
        JSON.stringify({
          ...dataForm,
        })
      );

      const { data, error } = await addProducto(formData);
      setIsLoading(false);
      if (!error) {
        form.reset();
        setImage(undefined);
        setIsOpen(false);
        toast.success(data);
      }
      setError(error);
    } else {
      formData.append(
        "data",
        JSON.stringify({
          ...dataForm,
          imagen: success ? imagen : null,
        })
      );

      const { data: res, error } = await updateProducto(formData, data?.id);
      setIsLoading(false);
      if (!error) {
        form.reset();
        setImage(undefined);
        setIsOpen(false);
        toast.success(res);
      }
      setError(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{data ? "Editar" : "Agregar"} Producto</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center md:text-left">
          Todos los campos son requeridos
        </DialogDescription>
        {error && (
          <Alert variant="destructive">
            <CircleX className="h-5 w-5" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
            </div>
            <div className="space-y-2 col-span-2 md:col-span-1">
              <div className="relative flex flex-col gap-2 h-[68px] overflow-hidden">
                {output === undefined && (
                  <label
                    htmlFor="imagen"
                    className="w-full cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 transition hover:bg-muted/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full border border-dashed p-3">
                        <UploadIcon
                          className="size-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm font-medium text-muted-foreground">
                          Click para seleccionar imagen.
                        </p>
                      </div>
                    </div>
                  </label>
                )}

                {output !== undefined && (
                  <div className="h-[68px] flex items-center mt-4">
                    <div className="relative flex items-center w-full justify-between space-x-4">
                      <Image
                        priority
                        src={success ? imagen : URL.createObjectURL(imagen)}
                        alt="asd"
                        width={48}
                        height={48}
                        className="aspect-square shrink-0 rounded-md object-cover border"
                      />
                      <div className="flex flex-1 space-x-4">
                        <div className="flex w-full flex-col gap-2">
                          <div className="space-y-px">
                            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                              {!success && imagen.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {!success && formatBytes(imagen.size)}
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
                onChange={(e) => setImage(e.target.files[0])}
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
                      {data ? "Editando..." : "Agregando..."}
                    </>
                  ) : (
                    <>{data ? "Editar" : "Agregar"}</>
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
