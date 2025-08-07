"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  ArrowRight,
  CirclePlus,
  CircleX,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFieldArray, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { AreaVenta } from "@/app/(with-layout)/areas-de-venta/types";
import { AjusteSchema } from "@/lib/schemas";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { InferInput } from "valibot";
import { addAjuste } from "@/app/(with-layout)/ajuste-inventario/actions";
import { toast } from "sonner";
import { useRef, useState } from "react";

import SelectProductoAjuste from "@/components/functionals/SelectProductoAjuste";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ProductoInfoParaAjuste } from "@/app/(with-layout)/ajuste-inventario/types";

export default function SheetTransferencias({
  areas,
  productosInfo,
}: {
  areas: AreaVenta[];
  productosInfo: ProductoInfoParaAjuste[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof AjusteSchema>>({
    resolver: valibotResolver(AjusteSchema),
    defaultValues: {
      motivo: "",
      productos: [
        { producto: "", cantidad: "0", zapatos_id: undefined, area_venta: "" },
      ],
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productos",
  });

  const onSubmit = async (
    dataForm: InferInput<typeof AjusteSchema>
  ): Promise<void> => {
    const { data, error } = await addAjuste(dataForm);
    if (error) {
      setError(error);
    } else {
      form.reset();
      toast.success(data);
      setOpen(false);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger asChild>
        <Button className="gap-1 items-center">
          <PlusCircle size={18} />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Nuevo ajuste de inventario</SheetTitle>
          <SheetDescription className="pb-4">
            El ajuste de inventario permite corregir las discrepancias entre el
            inventario físico y los registros del sistema. Es útil en
            situaciones como errores de conteo, pérdidas, robos, daños o
            devoluciones
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
                name="motivo"
                render={({ field }) => (
                  <FormItem>
                    <Label>Motivo</Label>
                    <FormControl>
                      <Input
                        placeholder="Escriba el motivo del ajuste."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Producto</TableHead>
                    <TableHead className="text-right">Cantidad / Ids</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((producto, index) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-semibold align-top w-1/2">
                        <SelectProductoAjuste
                          form={form}
                          index={index}
                          productosInfo={productosInfo}
                          formRef={formRef}
                        />
                      </TableCell>
                      {productosInfo.find(
                        (p) =>
                          p.id.toString() ===
                          form.getValues(`productos.${index}.producto`)
                      )?.isZapato ? (
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`productos.${index}.zapatos_id`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      ) : (
                        <>
                          <TableCell className="space-y-2">
                            <FormField
                              control={form.control}
                              name={`productos.${index}.area_venta`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Seleccione localización" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="almacen-principal">
                                        Almacén Principal
                                      </SelectItem>
                                      <SelectItem value="almacen-revoltosa">
                                        Almacén Revoltosa
                                      </SelectItem>
                                      {areas?.map((a) => (
                                        <SelectItem
                                          key={a.id}
                                          value={a.id?.toString()}
                                        >
                                          {a.nombre}
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
                              name={`productos.${index}.cantidad`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={0}
                                      step="1"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </>
                      )}

                      <TableCell className="align-top text-center">
                        {index > 0 && (
                          <Button
                            onClick={() => remove(index)}
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <MinusCircle className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  <Button
                    className="gap-1"
                    onClick={() =>
                      append({
                        producto: "",
                        cantidad: "0",
                        area_venta: "",
                        zapatos_id: undefined,
                      })
                    }
                    variant="outline"
                    size="sm"
                  >
                    <CirclePlus size={14} />
                    Agregar
                  </Button>
                </TableCaption>
              </Table>
              <div className="flex justify-end">
                <Button type="submit">Completar</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
