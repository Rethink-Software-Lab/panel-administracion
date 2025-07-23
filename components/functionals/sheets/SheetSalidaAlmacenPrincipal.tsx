"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronDown,
  CirclePlus,
  CircleX,
  MinusCircle,
  Pencil,
  PlusCircle,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { InferInput } from "valibot";
import { toast } from "sonner";
import { useRef, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AreaVentaSalida,
  ProductoSalida,
  Salida,
} from "@/app/(with-layout)/salidas/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { SalidaSchema } from "@/app/(with-layout)/salidas/schema";
import { addSalida, updateSalida } from "@/app/(with-layout)/salidas/actions";

export function SheetSalidaAlmacenPrincipal({
  productos,
  areas,
  salida,
}: {
  productos: ProductoSalida[];
  areas: AreaVentaSalida[];
  salida?: Salida;
}) {
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopoverProducto, setOpenPopoverProducto] = useState<{
    [key: number]: boolean;
  }>({});
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InferInput<typeof SalidaSchema>>({
    resolver: valibotResolver(SalidaSchema),
    defaultValues: {
      destino: salida?.destino?.id?.toString() ?? "",
      productos: salida?.detalle
        ? salida?.detalle?.map((producto) => ({
            id: producto.id.toString(),
            cantidad: producto.cantidad,
            zapatos_id: producto.zapatos_id || undefined,
            esZapato: producto.esZapato,
          }))
        : [
            {
              id: "",
              cantidad: 0,
              zapatos_id: undefined,
              esZapato: false,
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productos",
  });

  const onSubmit = async (
    dataForm: InferInput<typeof SalidaSchema>
  ): Promise<void> => {
    const { data: dataRes, error } = await (salida
      ? updateSalida(dataForm, salida.id)
      : addSalida(dataForm));

    if (error) {
      setError(error);
    } else {
      form.reset();
      toast.success(dataRes);
      setOpen(false);
    }
  };

  const handleOpenPopoverProducto = (index: number, value: boolean) => {
    setOpenPopoverProducto((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={true}>
      <SheetTrigger asChild>
        {salida ? (
          <Button variant="outline" size="icon">
            <Pencil size={18} />
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
          <SheetTitle>Agregar salida</SheetTitle>
          <SheetDescription className="pb-4">
            Rellene el formulario para agregar una salida.
          </SheetDescription>
          {error && (
            <Alert className="text-left" variant="destructive">
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {form.formState.errors.productos?.root && (
            <Alert className="text-left" variant="destructive">
              <CircleX className="h-5 w-5" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                {form.formState.errors.productos.root?.message}
              </AlertDescription>
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
                name="destino"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover open={openPopover} onOpenChange={setOpenPopover}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value === "almacen-revoltosa"
                              ? "Almacen revoltosa"
                              : field.value
                              ? areas?.find(
                                  (area) => area?.id.toString() === field.value
                                )?.nombre
                              : "Seleccione un area"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        containerRef={formRef}
                        className="w-[320px] p-0"
                      >
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Escribe un nombre..." />
                          <CommandList>
                            <CommandEmpty>
                              Ningún resultado encontrado.
                            </CommandEmpty>
                            <CommandGroup heading="Sugerencias">
                              <CommandItem
                                value="almacen-revoltosa"
                                keywords={["almacen-revoltosa"]}
                                onSelect={(currentValue: string) => {
                                  if (
                                    form.getValues("destino") === currentValue
                                  ) {
                                    form.setValue("destino", "");
                                  } else {
                                    form.setValue("destino", currentValue);
                                  }
                                  setOpenPopover(false);
                                }}
                              >
                                Almacen revoltosa
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    "almacen-revoltosa" === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                              {areas?.map((area: AreaVentaSalida) => (
                                <CommandItem
                                  key={area.id}
                                  value={area.id.toString()}
                                  keywords={[area.nombre]}
                                  onSelect={(currentValue: string) => {
                                    if (
                                      form.getValues("destino") === currentValue
                                    ) {
                                      form.setValue("destino", "");
                                    } else {
                                      form.setValue("destino", currentValue);
                                    }
                                    setOpenPopover(false);
                                  }}
                                >
                                  {area.nombre}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      area.id.toString() === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Producto</TableHead>
                    <TableHead>Cantidad/Ids</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((producto, index) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-semibold align-top w-1/2">
                        <FormField
                          control={form.control}
                          name={`productos.${index}.id`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <Popover
                                open={!!openPopoverProducto[index]}
                                onOpenChange={(value) =>
                                  handleOpenPopoverProducto(index, value)
                                }
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? productos?.find(
                                            (producto) =>
                                              producto?.id.toString() ===
                                              field.value
                                          )?.nombre
                                        : "Seleccione un producto"}
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  containerRef={formRef}
                                  className="w-[320px] p-0"
                                >
                                  <Command className="rounded-lg border shadow-md">
                                    <CommandInput placeholder="Escribe un nombre..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        Ningún resultado encontrado.
                                      </CommandEmpty>
                                      <CommandGroup heading="Sugerencias">
                                        {productos?.map(
                                          (producto: ProductoSalida) => {
                                            const productosSeleccionados = form
                                              .watch("productos")
                                              .map((p, idx) =>
                                                idx !== index ? p.id : null
                                              )
                                              .filter(Boolean);
                                            if (
                                              productosSeleccionados.includes(
                                                producto.id.toString()
                                              )
                                            ) {
                                              return null;
                                            }
                                            return (
                                              <CommandItem
                                                key={producto.id}
                                                value={producto.id.toString()}
                                                keywords={[producto.nombre]}
                                                onSelect={(
                                                  currentValue: string
                                                ) => {
                                                  if (
                                                    field.value === currentValue
                                                  ) {
                                                    form.setValue(
                                                      `productos.${index}.id`,
                                                      ""
                                                    );
                                                  } else {
                                                    form.setValue(
                                                      `productos.${index}.id`,
                                                      currentValue
                                                    );
                                                    productos.find(
                                                      (p) =>
                                                        p.id.toString() ===
                                                        currentValue
                                                    )?.esZapato
                                                      ? (form.setValue(
                                                          `productos.${index}.esZapato`,
                                                          true
                                                        ),
                                                        form.setValue(
                                                          `productos.${index}.zapatos_id`,
                                                          ""
                                                        ),
                                                        form.setValue(
                                                          `productos.${index}.cantidad`,
                                                          undefined
                                                        ))
                                                      : (form.setValue(
                                                          `productos.${index}.esZapato`,
                                                          false
                                                        ),
                                                        form.setValue(
                                                          `productos.${index}.zapatos_id`,
                                                          undefined
                                                        ),
                                                        form.setValue(
                                                          `productos.${index}.cantidad`,
                                                          0
                                                        ));
                                                  }
                                                  handleOpenPopoverProducto(
                                                    index,
                                                    false
                                                  );
                                                }}
                                              >
                                                {producto.nombre}
                                                <CheckIcon
                                                  className={cn(
                                                    "ml-auto h-4 w-4",
                                                    producto.id.toString() ===
                                                      field.value?.toString()
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            );
                                          }
                                        )}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>

                      <TableCell className="align-top">
                        {form.watch(`productos.${index}.esZapato`) ? (
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
                        ) : (
                          <FormField
                            control={form.control}
                            name={`productos.${index}.cantidad`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      field.onChange(
                                        value === "" ? 0 : Number(value)
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </TableCell>

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
                        id: "",
                        cantidad: 0,
                        esZapato: false,
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
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
