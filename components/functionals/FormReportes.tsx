"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import { AreaVenta } from "@/app/(with-layout)/areas-de-venta/types";

import { useQueryState, parseAsIsoDateTime } from "nuqs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import {
  lastDayOfMonth,
  format,
  startOfMonth,
  startOfWeek,
  lastDayOfWeek,
} from "date-fns";
import { es } from "date-fns/locale";
import { Label } from "../ui/label";
import { Categoria } from "@/app/(with-layout)/categorias/types";
import { Session } from "@/lib/getSession";
import { ALMACENES } from "@/app/(with-layout)/users/types";
import { AreaVentaInReporteFormData } from "@/app/(with-layout)/reportes/types";

interface Props {
  areas: AreaVentaInReporteFormData[];
  categorias: Categoria[];
}

export default function FormReportes({
  data,
  session,
}: {
  data: Props;
  session: Session;
}) {
  const [type, setType] = useQueryState("type", { shallow: false });
  const [area, setArea] = useQueryState("area", { shallow: false });
  const [from, setFrom] = useQueryState("desde", parseAsIsoDateTime);
  const [to, setTo] = useQueryState("hasta", parseAsIsoDateTime);
  const [categoria, setCategoria] = useQueryState("categoria", {
    shallow: false,
  });

  return (
    <div className="flex items-center gap-2 max-sm:block max-sm:space-y-2">
      <div className="flex flex-col sm:space-y-2">
        <Label className="max-sm:hidden">Tipo de reporte</Label>
        <Select
          value={type || ""}
          onValueChange={(value) => {
            setType(value);
            setArea(null);
            setFrom(null);
            setTo(null);
          }}
        >
          <SelectTrigger className="w-[180px] max-sm:w-full">
            <SelectValue placeholder="Tipo de reporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ventas">Ventas</SelectItem>
            <SelectItem value="inventario">Inventario</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col sm:space-y-2">
        <Label className="max-sm:hidden">Localización</Label>
        <Select value={area || ""} onValueChange={setArea}>
          <SelectTrigger className="w-[180px] max-sm:w-full">
            <SelectValue placeholder="Todas las áreas" />
          </SelectTrigger>
          <SelectContent>
            <>
              <SelectItem
                disabled={
                  !session.isAdmin &&
                  (!session.isAlmacenero ||
                    session.almacen !== ALMACENES.CAFETERIA) &&
                  !session.isVendedorCafeteria
                }
                value="cafeteria"
              >
                Cafetería
              </SelectItem>
              {type === "inventario" && (
                <>
                  <SelectItem
                    disabled={
                      !session.isAdmin &&
                      (!session.isAlmacenero ||
                        session.almacen !== ALMACENES.CAFETERIA) &&
                      !session.isVendedorCafeteria
                    }
                    value="almacen-cafeteria"
                  >
                    Almacén Cafetería
                  </SelectItem>
                  <SelectItem
                    disabled={
                      !session.isAdmin &&
                      (!session.isAlmacenero ||
                        session.almacen === ALMACENES.CAFETERIA) &&
                      !session.isVendedor
                    }
                    value="almacen-principal"
                  >
                    Almacén Principal
                  </SelectItem>
                  <SelectItem
                    disabled={
                      !session.isAdmin &&
                      (!session.isAlmacenero ||
                        session.almacen === ALMACENES.CAFETERIA) &&
                      !session.isVendedor
                    }
                    value="almacen-revoltosa"
                  >
                    Almacén Revoltosa
                  </SelectItem>
                </>
              )}
              <SelectItem disabled={!session.isAdmin} value="general">
                Todas las áreas
              </SelectItem>

              {data?.areas?.map((area) => (
                <SelectItem
                  disabled={
                    type === "ventas" &&
                    !session.isAdmin &&
                    !session.isAlmacenero &&
                    Number(session.area_venta) !== area.id
                  }
                  key={area.id}
                  value={area.id.toString()}
                >
                  {area.nombre}
                </SelectItem>
              ))}
            </>
          </SelectContent>
        </Select>
      </div>
      {type === "ventas" && (
        <div className="flex flex-col sm:space-y-2">
          <Label className="max-sm:hidden">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal max-sm:w-full",
                  !from && !to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {from && format(from, "LLL dd, y", { locale: es })}
                {from && to && " - "}
                {to && format(to, "LLL dd, y", { locale: es })}
                {!from && !to && <span>Selecciona un rango</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex w-auto flex-col space-y-2 p-2"
            >
              <Select
                onValueChange={(value) => {
                  if (value === "thisMonth") {
                    setFrom(startOfMonth(new Date()), { shallow: false });
                    setTo(lastDayOfMonth(new Date()), { shallow: false });
                  } else if (value === "thisWeek") {
                    setFrom(startOfWeek(new Date()), { shallow: false });
                    setTo(lastDayOfWeek(new Date()), { shallow: false });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Opciones" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="thisMonth">Este mes</SelectItem>
                  <SelectItem value="thisWeek">Esta semana</SelectItem>
                </SelectContent>
              </Select>
              <div className="rounded-md border">
                <Calendar
                  mode="range"
                  locale={es}
                  weekStartsOn={0}
                  selected={{ from: from ?? undefined, to: to ?? undefined }}
                  onSelect={(selectedDate) => {
                    setFrom(selectedDate?.from || null, { shallow: false });
                    setTo(selectedDate?.to || null, { shallow: false });
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("2024-09-16")
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      {type === "inventario" && area !== "cafeteria" && (
        <div className="flex flex-col sm:space-y-2">
          <Label className="max-sm:hidden">Categoría</Label>
          <Select value={categoria || ""} onValueChange={setCategoria}>
            <SelectTrigger className="w-[180px] max-sm:w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              {data?.categorias?.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id.toString()}>
                  {categoria.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
