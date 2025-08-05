import {
  array,
  boolean,
  enum_,
  forward,
  maxValue,
  minLength,
  minValue,
  nonEmpty,
  number,
  object,
  optional,
  partialCheck,
  pipe,
  string,
} from "valibot";
import { METODOS_PAGO } from "../(almacen-cafeteria)/entradas-cafeteria/types";
import { TipoCuenta } from "../tarjetas/types";

export const EntradaSchema = pipe(
  object({
    proveedor: pipe(
      string("El proveedor es requerido"),
      nonEmpty("El proveedor es requerido")
    ),
    comprador: pipe(
      string("El comprador es requerido."),
      nonEmpty("El comprador es requerido.")
    ),
    metodoPago: enum_(METODOS_PAGO, "Método de pago requerido."),
    cuentas: pipe(
      array(
        object({
          cuenta: pipe(
            string("La cuenta es requerida."),
            nonEmpty("La cuenta es requerida.")
          ),
          cantidad: optional(
            pipe(
              number(),
              minValue(1, "Valor mínimo 1"),
              maxValue(100000, "Valor máximo 100.000")
            )
          ),
          tipo: pipe(string(), nonEmpty("Tipo de cuenta requerido.")),
        })
      ),
      minLength(1, "Se requiere al menos una cuenta.")
    ),
    productos: pipe(
      array(
        object({
          producto: pipe(
            string("El producto es requerido."),
            nonEmpty("El producto es requerido.")
          ),
          cantidad: optional(
            pipe(
              number(),
              minValue(1, "Valor mínimo 1"),
              maxValue(2000, "Valor máximo 2000")
            )
          ),
          isZapato: boolean(),
          variantes: optional(
            pipe(
              array(
                object({
                  color: pipe(
                    string("El color es requerido."),
                    nonEmpty("El color es requerido.")
                  ),
                  numeros: pipe(
                    array(
                      object({
                        numero: pipe(
                          number("Debe ser un número"),
                          minValue(1, "El número debe ser > 0")
                        ),
                        cantidad: pipe(
                          number("Debe ser un número"),
                          minValue(1, "La cantidad debe ser > 0")
                        ),
                      })
                    ),
                    minLength(1, "numeros no puede estar vacio")
                  ),
                })
              ),
              minLength(1, "variantes no puede estar vacio")
            )
          ),
        })
      ),
      minLength(1, "productos es requerido.")
    ),
  }),
  forward(
    partialCheck(
      ["productos"] as any[],
      (input) => {
        const productos = input.productos.map((p) => p.producto);
        const productosUnicos = new Set(productos);
        if (productos.length !== productosUnicos.size) {
          return false;
        }

        return true;
      },
      "Debe asignarle un proveedor o cuenta y los productos deben ser únicos"
    ),
    ["productos"]
  ),
  forward(
    partialCheck(
      ["cuentas"] as any[],
      (input) => {
        const cuentas = input.cuentas.map((p) => p.cuenta);
        const cuentasUnicas = new Set(cuentas);
        if (cuentas.length !== cuentasUnicas.size) {
          return false;
        }

        return true;
      },
      "No pueden haber cuentas duplicadas"
    ),
    ["cuentas"]
  ),
  forward(
    partialCheck(
      ["metodoPago", "cuentas"] as any[],
      (input) => {
        if (input.metodoPago !== METODOS_PAGO.MIXTO) return true;
        if (input.metodoPago === METODOS_PAGO.MIXTO && input.cuentas.length < 2)
          return false;

        const tipos = input.cuentas.map((c) => c.tipo);
        const tieneEfectivo = tipos.includes(TipoCuenta.EFECTIVO);
        const tieneBancaria = tipos.includes(TipoCuenta.BANCARIA);

        return tieneEfectivo && tieneBancaria;
      },
      "En pagos mixtos debe existir al menos 2 cuentas, de tipo efectivo y bancaria"
    ),
    ["cuentas"]
  )
);
