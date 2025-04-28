import {
  array,
  enum_,
  forward,
  maxLength,
  nonEmpty,
  object,
  optional,
  partialCheck,
  pipe,
  string,
} from 'valibot';
import { METODOS_PAGO } from './types';

export const EntradaCafeteriaSchema = pipe(
  object({
    proveedor: optional(
      pipe(
        string('El proveedor es requerido'),
        nonEmpty('El proveedor es requerido')
      )
    ),
    proveedor_nombre: optional(
      pipe(
        string('El nombre del proveedor es requerido'),
        nonEmpty('El nombre del proveedor es requerido'),
        maxLength(100, 'Máximo de 100 caracteres.')
      )
    ),
    proveedor_nit: optional(
      pipe(
        string('El NIT es requerido'),
        nonEmpty('El NIT es requerido'),
        maxLength(30, 'Máximo de 30 caracteres.')
      )
    ),
    proveedor_telefono: optional(
      pipe(
        string('El telefono del proveedor es requerido'),
        nonEmpty('El telefono del proveedor es requerido'),
        maxLength(10, 'Máximo de 10 caracteres.')
      )
    ),
    proveedor_direccion: optional(
      pipe(
        string('El domicilio social es requerido'),
        nonEmpty('El domicilio social es requerido'),
        maxLength(100, 'Máximo de 100 caracteres.')
      )
    ),
    proveedor_no_cuenta_cup: optional(
      pipe(
        string('El número de cuenta en CUP debe ser una cadena de texto'),
        maxLength(30, 'Máximo de 30 caracteres.')
      )
    ),
    proveedor_no_cuenta_mayorista: optional(
      pipe(
        string('El número de cuenta mayorista debe ser una cadena de texto'),
        maxLength(30, 'Máximo de 30 caracteres.')
      )
    ),
    comprador: pipe(
      string('El comprador es requerido.'),
      nonEmpty('El comprador es requerido.')
    ),
    cuenta: pipe(
      string('El comprador es requerido.'),
      nonEmpty('El comprador es requerido.')
    ),
    metodo_pago: enum_(METODOS_PAGO, 'Método de pago requerido.'),
    productos: array(
      object({
        producto: pipe(
          string('El producto es requerido'),
          nonEmpty('El producto es requerido')
        ),
        cantidad: pipe(
          string('La cantidad es requerida'),
          nonEmpty('La cantidad es requerida')
        ),
      })
    ),
  }),
  forward(
    partialCheck(
      ['productos'] as any[],
      (input) => {
        const productosIds = input.productos.map(
          (producto) => producto.producto
        );
        const uniqueProductos = new Set(productosIds);
        if (productosIds.length !== uniqueProductos.size) {
          return false;
        }
        return true;
      },
      'No se deben tener productos repetidos.'
    ),
    ['productos']
  )
);
