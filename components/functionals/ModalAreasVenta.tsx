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

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { InferInput } from "valibot";

import {
  addArea,
  updateArea,
} from "@/app/(with-layout)/areas-de-venta/actions";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { ReactNode, useState } from "react";
import { Switch } from "../ui/switch";
import { AreaVenta } from "@/app/(with-layout)/areas-de-venta/types";
import { AreaVentaSchema } from "@/app/(with-layout)/areas-de-venta/schema";

export default function ModalAreasVenta({
  data,
  trigger,
}: {
  data?: AreaVenta;
  trigger: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<InferInput<typeof AreaVentaSchema>>({
    resolver: valibotResolver(AreaVentaSchema),
    defaultValues: { ...data, isMesa: data?.isMesa || false },
  });

  const onSubmit = async (dataForm: InferInput<typeof AreaVentaSchema>) => {
    setIsLoading(true);
    const { data: dataRes, error } = !data
      ? await addArea(dataForm)
      : await updateArea(data?.id, dataForm);
    setIsLoading(false);

    if (!error) {
      form.reset();
      setIsOpen(false);
      toast.success(dataRes);
    } else {
      toast.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data ? "Editar" : "Agregar"} Área de Venta</DialogTitle>
        </DialogHeader>
        <DialogDescription>Todos los campos son requeridos</DialogDescription>

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
            <FormField
              control={form.control}
              name="isMesa"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3">
                  <FormLabel>Es mesa?</FormLabel>
                  <FormControl>
                    <Switch
                      style={{ marginTop: 0 }}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
