import { boolean, custom, nonEmpty, object, pipe, string } from "valibot";

export const AreaVentaSchema = object({
  nombre: pipe(
    string("Campo requerido."),
    nonEmpty("Campo requerido."),
    custom(
      (value) => value !== "Revoltosa",
      'El nombre no puede ser "Revoltosa"'
    )
  ),
  color: pipe(string("Campo requerido."), nonEmpty("Campo requerido.")),
  isMesa: boolean("Booleano requerido."),
});
