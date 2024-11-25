'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';

import { AreaVenta } from '@/app/(with-layout)/areas-de-venta/types';

import { useQueryState, parseAsIsoDateTime } from 'nuqs';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import {
  endOfWeek,
  lastDayOfMonth,
  format,
  startOfMonth,
  startOfWeek,
  lastDayOfWeek,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Label } from '../ui/label';

export default function FormReportes({ areas }: { areas: AreaVenta[] }) {
  const [type, setType] = useQueryState('type', { shallow: false });
  const [area, setArea] = useQueryState('area', { shallow: false });
  const [from, setFrom] = useQueryState('desde', parseAsIsoDateTime);
  const [to, setTo] = useQueryState('hasta', parseAsIsoDateTime);

  return (
    <div className="flex items-center gap-2 max-sm:block max-sm:space-y-2">
      <div className="flex flex-col sm:space-y-2">
        <Label className="max-sm:hidden">Tipo de reporte</Label>
        <Select
          value={type || ''}
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
        <Select value={area || ''} onValueChange={setArea}>
          <SelectTrigger className="w-[180px] max-sm:w-full">
            <SelectValue placeholder="General" />
          </SelectTrigger>
          <SelectContent>
            <>
              <SelectItem value="general">General</SelectItem>
              {type === 'inventario' && (
                <>
                  <SelectItem value="almacen-principal">
                    Almacén Principal
                  </SelectItem>
                  <SelectItem value="almacen-revoltosa">
                    Almacén Revoltosa
                  </SelectItem>
                  <SelectItem value="almacen-cafeteria">
                    Almacén Cafetería
                  </SelectItem>
                </>
              )}

              {areas?.map((area) => (
                <SelectItem key={area.id} value={area.id.toString()}>
                  {area.nombre}
                </SelectItem>
              ))}
            </>
          </SelectContent>
        </Select>
      </div>
      {type === 'ventas' && (
        <div className="flex flex-col sm:space-y-2">
          <Label className="max-sm:hidden">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] justify-start text-left font-normal max-sm:w-full',
                  !from && !to && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {from && format(from, 'LLL dd, y', { locale: es })}
                {from && to && ' - '}
                {to && format(to, 'LLL dd, y', { locale: es })}
                {!from && !to && <span>Selecciona un rango</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex w-auto flex-col space-y-2 p-2"
            >
              <Select
                onValueChange={(value) => {
                  if (value === 'thisMonth') {
                    setFrom(startOfMonth(new Date()), { shallow: false });
                    setTo(lastDayOfMonth(new Date()), { shallow: false });
                  } else if (value === 'thisWeek') {
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
                    date > new Date() || date < new Date('2024-09-16')
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
