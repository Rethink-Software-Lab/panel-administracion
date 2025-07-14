import {
  minValue,
  nonEmpty,
  number,
  object,
  pipe,
  string,
  custom,
  array,
  minLength,
  boolean,
  forward,
  partialCheck,
  optional,
} from "valibot";

export const SalidaSchema = pipe(
  object({
    destino: pipe(
      string("El destino es requerido"),
      nonEmpty("El destino es requerido")
    ),
    productos: pipe(
      array(
        object({
          id: pipe(
            string("El producto es requerido"),
            nonEmpty("El producto es requerido")
          ),
          cantidad: optional(
            pipe(
              number("La cantidad es requerida"),
              minValue(1, "La cantidad debe ser mayor que 0")
            )
          ),
          esZapato: boolean("El esZapato es requerido"),
          zapatos_id: optional(string("Los zapatos_id deben ser un string.")),
        })
      ),
      minLength(1, "Debe agregar al menos un producto."),
      custom((productos: unknown) => {
        const arr = productos as {
          id: string;
          cantidad: number;
          esZapato: boolean;
          zapatos_id: string | undefined;
        }[];
        const ids = arr.map((p) => p.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) return false;
        for (const p of arr) {
          if (!p.esZapato && (!p.cantidad || p.cantidad < 1)) return false;
        }
        return true;
      }, "No se pueden seleccionar productos repetidos y si esZapato es false debe venir cantidad > 0.")
    ),
  }),
  forward(
    partialCheck(
      [["productos"]],
      (input) => {
        for (const prod of input.productos) {
          if (prod.esZapato) {
            if (!prod.zapatos_id || prod.zapatos_id.trim() === "") return false;
            const idsZapatos = prod.zapatos_id
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean);
            if (idsZapatos.length === 0) return false;
            if (!idsZapatos.every((id: string) => /^\d+$/.test(id)))
              return false;
          }
        }
        return true;
      },
      "Si esZapato es true, zapatos_id debe ser una lista de ids numéricos separados por coma."
    ),
    ["productos"]
  )
);
