"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { ResponseSearchProducts } from "@/app/(with-layout)/types";
import { useRouter } from "next/navigation";

export function SearchCommand({
  productos,
}: {
  productos: ResponseSearchProducts[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        title="Buscar"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Search size={18} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Escriba para buscar..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            {productos.map((p) => (
              <CommandItem
                key={p.id}
                onSelect={() => {
                  router.push(
                    `/search/?id=${p.id}${
                      p.isCafeteria ? "&isCafeteria=true" : " "
                    }`
                  );
                  setOpen(false);
                }}
                className="gap-2 cursor-pointer"
              >
                <span>{p.nombre}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
