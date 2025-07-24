"use client";
import {
  CheckIcon,
  ChevronDown,
  LoaderCircle,
  MinusCircle,
  PlusCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EntradaSchema } from "@/lib/schemas";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { createEntrada } from "@/app/(with-layout)/create-entrada/actions";
import { Fragment, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Banco } from "@/app/(with-layout)/tarjetas/types";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { METODOS_PAGO } from "@/app/(with-layout)/(almacen-cafeteria)/entradas-cafeteria/types";

function NestedArray({
  nestedIndex,
  nestedIndexRow,
  productosIndex,
  appendVariant,
  removeVariant,
  removeProducto,
  register,
  control,
  errors,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `productos.${productosIndex}.variantes.${nestedIndex}.numeros`,
  });

  return (
    <>
      {fields.map((numero, index, row) => (
        <>
          {index > 0 && (
            <>
              <div />
              <div />
            </>
          )}
          <div>
            <Input
              className="mb-1"
              {...register(
                `productos.${productosIndex}.variantes.${nestedIndex}.numeros.${index}.numero`,
                {
                  valueAsNumber: true,
                }
              )}
              type="number"
              min={0}
            />
            <Label className="text-[0.8rem] font-medium text-destructive">
              {
                errors.productos?.[productosIndex]?.variantes?.[nestedIndex]
                  ?.numeros?.[index]?.numero?.message
              }
            </Label>
          </div>
          <div>
            <div className="flex gap-2">
              <div className="w-full">
                <Input
                  className="mb-1"
                  {...register(
                    `productos.${productosIndex}.variantes.${nestedIndex}.numeros.${index}.cantidad`,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  type="number"
                />
                <Label className="text-[0.8rem] font-medium text-destructive">
                  {
                    errors.productos?.[productosIndex]?.variantes?.[nestedIndex]
                      ?.numeros?.[index]?.cantidad?.message
                  }
                </Label>
              </div>
              {index > 0 && (
                <Button
                  onClick={() => remove(index)}
                  size="icon"
                  variant="ghost"
                  className="gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
          {index + 1 === row.length && (
            <>
              <div className="col-span-1 text-center">
                {productosIndex > 0 && (
                  <Button
                    onClick={() => removeProducto(productosIndex)}
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                  >
                    <MinusCircle className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Eliminar </span>
                    <span>producto</span>
                  </Button>
                )}
              </div>
              <div className="col-span-1 text-center">
                {nestedIndex === nestedIndexRow.length - 1 && (
                  <Button
                    onClick={() =>
                      appendVariant({
                        color: "",
                        numeros: [{ numero: 0, cantidad: 0 }],
                      })
                    }
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Añadir </span>
                    <span>variante</span>
                  </Button>
                )}
                {nestedIndexRow.length > 1 && (
                  <Button
                    onClick={() => removeVariant(nestedIndex)}
                    size="sm"
                    variant="ghost"
                    className="gap-1"
                  >
                    <MinusCircle className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Eliminar </span>
                    <span>variante</span>
                  </Button>
                )}
              </div>
              <div className="col-span-2 text-center">
                <Button
                  onClick={() =>
                    append({
                      numero: 0,
                      cantidad: 0,
                    })
                  }
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Añadir </span>
                  <span>número</span>
                </Button>
              </div>
            </>
          )}
        </>
      ))}
    </>
  );
}

function VariantesFieldArray({ productosIndex, form, removeProducto }) {
  const {
    fields: fieldsVariant,
    append: appendVariant,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `productos.${productosIndex}.variantes`,
  });

  return (
    <>
      {fieldsVariant.map((variant, index, row) => (
        <Fragment key={variant.id}>
          {index > 0 && <div />}
          <div className="font-semibold align-top">
            <Input
              className="mb-1"
              {...form.register(
                `productos.${productosIndex}.variantes.${index}.color`
              )}
            />
            <Label className="text-[0.8rem] font-medium text-destructive">
              {
                form.formState.errors.productos?.[productosIndex]?.variantes?.[
                  index
                ]?.color?.message
              }
            </Label>
          </div>
          <NestedArray
            nestedIndex={index}
            nestedIndexRow={row}
            productosIndex={productosIndex}
            appendVariant={appendVariant}
            removeVariant={remove}
            removeProducto={removeProducto}
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />
        </Fragment>
      ))}
    </>
  );
}

export default function FormEntradas({ productos, cuentas, proveedores }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [dataModal, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  const form = useForm({
    resolver: valibotResolver(EntradaSchema),
    defaultValues: {
      proveedor: "",
      comprador: "",
      metodoPago: "",
      productos: [
        { producto: "", isZapato: false, cantidad: 0, variantes: undefined },
      ],
      /* cuentas: [{ cuenta: "", cantidad: undefined }], */
    },
  });

  const {
    fields: fieldsProducto,
    append: appendProducto,
    remove: removeProducto,
  } = useFieldArray({
    control: form.control,
    name: "productos",
  });

  /*  const {
    fields: fieldsCuentas,
    append: appendCuenta,
    remove: removeCuenta,
  } = useFieldArray({
    control: form.control,
    name: "cuentas",
  }); */

  const productosWatch = useWatch({ control: form.control, name: "productos" });
  const metodoWatch = useWatch({ control: form.control, name: "metodoPago" });

  const onSubmit = async (dataForm) => {
    setLoading(true);
    const { data, error } = await createEntrada(dataForm);
    setLoading(false);
    if (!error && !data) {
      toast.success("Entrada creada con éxito.");
      router.push("/entradas");
    } else if (!error) {
      setData(data);
      setOpenDialog(true);
    } else {
      toast.error(error);
    }
  };

  return (
    <>
      <AlertDialog open={openDialog} setOpen={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Entrada creada con éxito!</AlertDialogTitle>
            <AlertDialogDescription className="pb-2">
              Estos datos se quedan almacenados en la tabla de Entradas.
            </AlertDialogDescription>

            {dataModal?.map((z) => (
              <Fragment key={z.zapato}>
                <h2 className="font-semibold pt-2 mb-0">{z.zapato}</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Color</TableHead>
                      <TableHead className="grid grid-cols-2 items-center">
                        <p>Número</p>
                        <p>IDs</p>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {z.variantes?.map((res, index) => (
                      <TableRow key={`${res?.color}-${index}`}>
                        <TableCell className="align-top">
                          {res?.color}
                        </TableCell>
                        <TableCell>
                          {res?.numeros?.map((n, index) => (
                            <div
                              key={`${n}-${index}`}
                              className="grid grid-cols-2"
                            >
                              <p>{n?.numero}</p>
                              <p>{n?.ids}</p>
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Fragment>
            ))}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                router.push("/entradas");
              }}
            >
              Cerrar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la entrada</CardTitle>
              <CardDescription>
                Todos los campos son requeridos.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proveedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proveedor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proveedores?.map((proveedor) => (
                          <SelectItem
                            key={proveedor.id}
                            value={proveedor.id.toString()}
                          >
                            {proveedor.nombre}
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
                name="comprador"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comprador</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metodoPago"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de pago</FormLabel>
                    <Select
                      onValueChange={(currentValue) => {
                        if (currentValue === METODOS_PAGO.MIXTO) {
                          form.setValue("efectivo", 0),
                            form.setValue("transferencia", 0);
                        } else {
                          form.setValue("efectivo", undefined),
                            form.setValue("transferencia", undefined);
                        }

                        if (currentValue === METODOS_PAGO.EFECTIVO) {
                          form.setValue("cuenta", undefined);
                        } else {
                          if (form.getValues("cuenta") === undefined) {
                            form.setValue("cuenta", "");
                          }
                        }

                        field.onChange(currentValue);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un método de pago" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                        <SelectItem value="TRANSFERENCIA">
                          Transferencia
                        </SelectItem>
                        <SelectItem value={METODOS_PAGO.MIXTO}>
                          Mixto
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  <div className="grid grid-cols-2 col-span-2 gap-4">
                {fieldsCuentas.map((cuenta, index) => (
                  <Fragment key={cuenta.id}>
                    <FormField
                      control={form.control}
                      name={`cuentas.${index}.cuenta`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
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
                                      )?.descripcion
                                    : "Selecciona un producto"}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[320px] p-0">
                              <Command className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Escribe un código..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Ningún resultado encontrado.
                                  </CommandEmpty>
                                  <CommandGroup heading="Sugerencias">
                                    {cuentas?.map((cuenta) => (
                                      <CommandItem
                                        key={cuenta.id}
                                        value={cuenta.id.toString()}
                                        keywords={[cuenta.nombre]}
                                        onSelect={(currentValue) => {
                                          productos?.find(
                                            (e) =>
                                              e.id.toString() === currentValue
                                          )?.categoria !== "Zapatos"
                                            ? (() => {
                                                form.setValue(
                                                  `productos.${index}.isZapato`,
                                                  false
                                                );
                                                form.setValue(
                                                  `productos.${index}.variantes`,
                                                  undefined
                                                );
                                                form.setValue(
                                                  `productos.${index}.cantidad`,
                                                  0
                                                );
                                              })()
                                            : (() => {
                                                form.setValue(
                                                  `productos.${index}.isZapato`,
                                                  true
                                                );
                                                form.setValue(
                                                  `productos.${index}.cantidad`,
                                                  undefined
                                                );
                                                form.setValue(
                                                  `productos.${index}.variantes`,
                                                  [
                                                    {
                                                      color: "",
                                                      numeros: [
                                                        {
                                                          numero: 0,
                                                          cantidad: 0,
                                                        },
                                                      ],
                                                    },
                                                  ]
                                                );
                                              })();
                                          field.onChange(
                                            currentValue === field.value
                                              ? ""
                                              : currentValue
                                          );
                                        }}
                                      >
                                        {cuenta.nombre}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            cuenta.id.toString() === field.value
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

                    <FormField
                      control={form.control}
                      name={`cuentas.${index}.cantidad`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Fragment>
                ))}
              </div> */}

              {metodoWatch !== METODOS_PAGO.EFECTIVO && (
                <FormField
                  control={form.control}
                  name="cuenta"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel className="flex justify-start">
                        Cuenta a transferir
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              form.formState.errors?.tarjeta &&
                                "border-destructive"
                            )}
                          >
                            <SelectValue placeholder="Selecciona una cuenta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cuentas?.map((cuenta) => (
                            <SelectItem
                              key={cuenta.id}
                              value={cuenta.id.toString()}
                            >
                              <div className="flex gap-2 items-center ">
                                <div
                                  className={cn(
                                    "w-6 aspect-square rounded-full bg-gradient-to-br",
                                    cuenta.banco === Banco.BANDEC &&
                                      "from-[#6c0207] to-[#bc1f26]",
                                    cuenta.banco === Banco.BPA &&
                                      "from-[#1d6156] to-[#1d6156]"
                                  )}
                                ></div>
                                <p>{cuenta.nombre}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {metodoWatch === METODOS_PAGO.MIXTO && (
                <>
                  <FormField
                    control={form.control}
                    name="efectivo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Efectivo</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transferencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transferencia</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </CardContent>
          </Card>

          <Card ref={cardRef}>
            <CardHeader>
              <CardTitle>Mercancía</CardTitle>
              <CardDescription>
                Detalla la mercancía entrante por color, número y cantidad.
              </CardDescription>
              {form.formState.errors.productos?.root && (
                <Alert variant="destructive">
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>
                    No pueden haber productos repetidos.
                  </AlertDescription>
                </Alert>
              )}
            </CardHeader>
            <CardContent>
              <div>
                <div
                  className={cn(
                    "grid [&>span]:pl-2 [&>span]:text-muted-foreground border-b border-muted",
                    productosWatch?.some((p) => p.isZapato)
                      ? "grid-cols-4"
                      : "grid-cols-2"
                  )}
                >
                  <span>Producto</span>
                  {productosWatch?.find((p) => p.isZapato) && (
                    <>
                      <span>Color</span>
                      <span>Número</span>
                    </>
                  )}
                  <span>Cantidad</span>
                </div>
                {fieldsProducto.map((producto, index) => (
                  <div
                    className={cn(
                      "grid [&>*]:p-2",
                      productosWatch?.some((p) => p.isZapato)
                        ? "grid-cols-4"
                        : "grid-cols-2"
                    )}
                    key={producto.id}
                  >
                    <FormField
                      control={form.control}
                      name={`productos.${index}.producto`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
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
                                      )?.descripcion
                                    : "Selecciona un producto"}
                                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[320px] p-0">
                              <Command className="rounded-lg border shadow-md">
                                <CommandInput placeholder="Escribe un código..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Ningún resultado encontrado.
                                  </CommandEmpty>
                                  <CommandGroup heading="Sugerencias">
                                    {productos?.map((producto) => (
                                      <CommandItem
                                        key={producto.id}
                                        value={producto.id.toString()}
                                        keywords={[producto.descripcion]}
                                        onSelect={(currentValue) => {
                                          productos?.find(
                                            (e) =>
                                              e.id.toString() === currentValue
                                          )?.categoria !== "Zapatos"
                                            ? (() => {
                                                form.setValue(
                                                  `productos.${index}.isZapato`,
                                                  false
                                                );
                                                form.setValue(
                                                  `productos.${index}.variantes`,
                                                  undefined
                                                );
                                                form.setValue(
                                                  `productos.${index}.cantidad`,
                                                  0
                                                );
                                              })()
                                            : (() => {
                                                form.setValue(
                                                  `productos.${index}.isZapato`,
                                                  true
                                                );
                                                form.setValue(
                                                  `productos.${index}.cantidad`,
                                                  undefined
                                                );
                                                form.setValue(
                                                  `productos.${index}.variantes`,
                                                  [
                                                    {
                                                      color: "",
                                                      numeros: [
                                                        {
                                                          numero: 0,
                                                          cantidad: 0,
                                                        },
                                                      ],
                                                    },
                                                  ]
                                                );
                                              })();
                                          field.onChange(
                                            currentValue === field.value
                                              ? ""
                                              : currentValue
                                          );
                                        }}
                                      >
                                        {producto.descripcion}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            producto.id.toString() ===
                                              field.value
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
                    {productosWatch?.[index]?.isZapato && (
                      <VariantesFieldArray
                        productosIndex={index}
                        form={form}
                        removeProducto={removeProducto}
                      />
                    )}

                    {!productosWatch?.[index]?.isZapato && (
                      <>
                        {productosWatch?.some((p) => p.isZapato) && (
                          <div className="col-span-2" />
                        )}
                        <FormField
                          control={form.control}
                          name={`productos.${index}.cantidad`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    field.onChange(isNaN(value) ? 0 : value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {!productosWatch?.[index]?.isZapato && (
                      <div className="text-center">
                        <Button
                          onClick={() => removeProducto(index)}
                          size="sm"
                          variant="ghost"
                          className="gap-1"
                        >
                          <MinusCircle className="h-3.5 w-3.5" />
                          <span className="hidden md:inline">Eliminar </span>
                          <span>producto</span>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="justify-center border-t p-4">
              <Button
                onClick={() =>
                  appendProducto({
                    producto: "",
                    cantidad: 0,
                    isZapato: false,
                    variantes: undefined,
                  })
                }
                size="sm"
                variant="ghost"
                className="gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Añadir producto
              </Button>
            </CardFooter>
          </Card>
          {/* )} */}
          <div className="grid grid-cols-1 gap-2 md:flex md:items-center md:justify-end">
            <Link href="/entradas">
              <Button
                className="order-2 md:order-none w-full"
                variant="outline"
              >
                Cancelar
              </Button>
            </Link>
            <Button
              className="gap-2 order-1 md:order-none"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Agregando...
                </>
              ) : (
                <>
                  <PlusCircle size={18} />
                  Agregar entrada
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
