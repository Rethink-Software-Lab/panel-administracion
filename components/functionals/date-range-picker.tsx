"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@tanstack/react-table";

export function DatePickerWithRange<TData, TValue>({
  column,
}: {
  column: Column<TData, TValue> | undefined;
}) {
  const selectedValues = column?.getFilterValue() as DateRange | undefined;

  if (!column) {
    return null;
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal space-x-1 gap-1",
              !selectedValues && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4" />
            {selectedValues?.from ? (
              selectedValues.to ? (
                <>
                  {format(selectedValues.from, "LLL dd, y")} -{" "}
                  {format(selectedValues.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedValues.from, "LLL dd, y")
              )
            ) : (
              <span>Seleccione un rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            locale={es}
            mode="range"
            defaultMonth={new Date()}
            selected={column.getFilterValue() as DateRange}
            onSelect={(value) => column?.setFilterValue(value)}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("2024-12-18")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
