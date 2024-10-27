import {
  enum_,
  pipe,
  minLength,
  object,
  literal,
  string,
  number,
  minValue,
  array,
  optional,
  nonEmpty,
  forward,
  partialCheck,
  maxValue,
  integer,
  boolean,
  custom,
  maxLength,
} from 'valibot';

enum ROLES {
  ADMIN = 'ADMIN',
  ALMACENERO = 'ALMACENERO',
  VENDEDOR = 'VENDEDOR',
}

export const UserSchema = pipe(
  object({
    username: pipe(
      string('El nombre de ususario es requerido'),
      minLength(1, 'El nombre de ususario es requerido')
    ),
    rol: enum_(ROLES, 'Rol invalido'),
    area_venta: optional(pipe(string(), nonEmpty())),
    password: pipe(
      string('La contraseña es requerida'),
      minLength(1, 'La contraseña es requerida')
    ),
  }),
  forward(
    partialCheck(
      [['rol'], ['area_venta']],
      (input) => {
        if (input.rol === 'VENDEDOR' && !input.area_venta) {
          return false;
        }
        return true;
      },
      'Debe asignarle un área de venta al vendedor.'
    ),
    ['area_venta']
  )
);

export const LoginSchema = object({
  username: pipe(
    string('El nombre de ususario es requerido'),
    nonEmpty('El nombre de ususario es requerido')
  ),
  password: pipe(
    string('La contraseña es requerida'),
    nonEmpty('La contraseña es requerida')
  ),
});

export const ProductSchema = object({
  codigo: pipe(
    string('El código del producto debe ser una cadena de texto'),
    minLength(1, 'El usuario debe tener un nombre')
  ),
  descripcion: pipe(
    string('La descripción debe ser una cadena de texto'),
    minLength(1, 'La descripción es requerida')
  ),
  categoria: pipe(
    string('La categoría es requeriada'),
    nonEmpty('La categoría es requeriada')
  ),
  precio_costo: string('El precio de costo es un número'),
  precio_venta: string('El precio de venta es un número'),
  pago_trabajador: pipe(
    number('El pago del trabajador es un número'),
    minValue(0, 'Debe ser un número positivo')
  ),
  deletePhoto: boolean('debe ser un booleano'),
});

enum METODOS_PAGO {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  MIXTO = 'MIXTO',
}

export const EntradaSchema = object({
  proveedor: pipe(
    string('El proveedor es requerido'),
    nonEmpty('El proveedor es requerido')
  ),
  comprador: pipe(
    string('El comprador es requerido.'),
    nonEmpty('El comprador es requerido.')
  ),
  metodoPago: enum_(METODOS_PAGO, 'Método de pago requerido.'),
  productInfo: pipe(
    string('El producto es requerido.'),
    nonEmpty('El producto es requerido.')
  ),
  cantidad: optional(
    pipe(
      number(),
      minValue(1, 'Valor mínimo 1'),
      maxValue(2000, 'Valor máximo 2000')
    )
  ),
  variantes: optional(
    pipe(
      array(
        object({
          color: pipe(
            string('El color es requerido.'),
            nonEmpty('El color es requerido.')
          ),
          numeros: pipe(
            array(
              object({
                numero: pipe(
                  number('Debe ser un número'),
                  minValue(1, 'El número debe ser positivo')
                ),
                cantidad: pipe(
                  number('Debe ser un número'),
                  minValue(1, 'La cantidad debe ser > 0')
                ),
              })
            ),
            minLength(1, 'numeros no puede estar vacio')
          ),
        })
      ),
      minLength(1, 'variantes no puede estar vacio')
    )
  ),
});

export const SalidaSchema = object({
  area_venta: pipe(
    string('El área de venta es requerida.'),
    nonEmpty('El área de venta es requerida.')
  ),
  zapatos_id: optional(
    pipe(
      array(string(), 'Productos no puede estar vacio'),
      minLength(1, 'Productos no puede estar vacio')
    )
  ),
  cantidad: optional(pipe(number(), integer(), minValue(1))),
  producto_info: pipe(
    string('El producto es requerido.'),
    nonEmpty('El producto es requerido.')
  ),
});

export const SalidaRevoltosaSchema = object({
  zapatos_id: optional(
    pipe(
      array(string(), 'Productos no puede estar vacio'),
      minLength(1, 'Productos no puede estar vacio')
    )
  ),
  cantidad: optional(
    pipe(
      number('Debe introducir un número'),
      integer('Debe introducir un número entero'),
      minValue(1, 'La cantidad debe ser mayor que 0')
    )
  ),
  producto_info: pipe(
    string('El producto es requerido.'),
    nonEmpty('El producto es requerido.')
  ),
});

export const VentasSchema = object({
  metodoPago: enum_(METODOS_PAGO, 'Método requerido: Efectivo o transferencia'),
  efectivo: optional(
    pipe(
      number('El efectivo debe ser un número'),
      integer('El efectivo debe ser un número entero'),
      minValue(1, 'El efectivo debe ser mayor que 0')
    )
  ),

  transferencia: optional(
    pipe(
      number('La transferencia debe ser un número'),
      integer('La transferencia debe ser un número entero'),
      minValue(1, 'La transferencia debe ser mayor que 0')
    )
  ),

  zapatos_id: optional(
    pipe(
      array(string(), 'Productos no puede estar vacio'),
      minLength(1, 'Productos no puede estar vacio')
    )
  ),
  cantidad: optional(pipe(number(), integer(), minValue(1))),
  producto_info: pipe(
    string('El producto es requerido.'),
    nonEmpty('El producto es requerido.')
  ),
});

export const SearchSchema = object({
  codigo: pipe(string('Ingresa un código'), minLength(1, 'Ingresa un código')),
});

export const FiltersSchema = object({
  modelo: pipe(
    string('Seleccione un modelo'),
    minLength(1, 'Seleccione un modelo')
  ),
});

export const onlyNombreSchema = object({
  nombre: pipe(string('Campo requerido.'), nonEmpty('Campo requerido.')),
});

export const AreaVentaSchema = object({
  nombre: pipe(
    string('Campo requerido.'),
    nonEmpty('Campo requerido.'),
    custom(
      (value) => value !== 'Revoltosa',
      'El nombre no puede ser "Revoltosa"'
    )
  ),
  color: pipe(string('Campo requerido.'), nonEmpty('Campo requerido.')),
});

export const EspecialWarningSchema = object({
  test: literal('BORRAR', 'El campo debe ser igual a BORRAR'),
});

export const TransferenciaSchema = pipe(
  object({
    de: pipe(
      string('El área de origen es requerida.'),
      nonEmpty('El área de origen es requerida.')
    ),
    para: pipe(
      string('El área de destino es requerida.'),
      nonEmpty('El área de destino es requerida.')
    ),
    productos: array(
      object({
        producto: pipe(
          string('El producto es requerido.'),
          nonEmpty('El producto es requerido.')
        ),
        cantidad: optional(
          pipe(
            string(),
            nonEmpty(),
            custom<string>((value) => {
              const parsedValue = parseInt(value as string, 10);
              return !isNaN(parsedValue) && parsedValue >= 1;
            }, 'La cantidad debe ser > 0')
          )
        ),
        zapatos_id: optional(
          pipe(
            string('El ID de zapatos es requerido.'),
            nonEmpty('El ID de zapatos es requerido.'),
            custom((input: any) => {
              const ids = input.replace(/\s+/g, '').split(/[;,]/);
              const uniqueIds = new Set(ids);
              return (
                ids.every(
                  (id: string) => /^\d+$/.test(id) && parseInt(id) > 0
                ) && ids.length === uniqueIds.size
              );
            }, 'Los IDs deben ser números enteros > 0, separados por coma (,) o punto y coma (;) y deben ser únicos.')
          )
        ),
      })
    ),
  }),
  forward(
    partialCheck(
      [['de'], ['para']],
      (input) => {
        if (input.de === input.para) {
          return false;
        }
        return true;
      },
      'Las áreas de origen y destino no pueden ser iguales.'
    ),
    ['de']
  ),
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

export const AjusteSchema = object({
  motivo: pipe(
    string('El área de origen es requerida.'),
    nonEmpty('El área de origen es requerida.'),
    maxLength(100, 'El motivo no debe tener más de 100 caracteres.')
  ),
  productos: array(
    object({
      producto: pipe(
        string('El producto es requerido.'),
        nonEmpty('El producto es requerido.')
      ),
      cantidad: optional(
        pipe(
          string(),
          nonEmpty(),
          custom<string>((value) => {
            const parsedValue = parseInt(value as string, 10);
            return !isNaN(parsedValue) && parsedValue >= 1;
          }, 'La cantidad debe ser > 0')
        )
      ),
      area_venta: optional(pipe(string(), nonEmpty('Localización requerida.'))),
      zapatos_id: optional(
        pipe(
          string('El ID de zapatos es requerido.'),
          nonEmpty('El ID de zapatos es requerido.'),
          custom((input: any) => {
            const ids = input.replace(/\s+/g, '').split(/[;,]/);
            const uniqueIds = new Set(ids);
            return (
              ids.every((id: string) => /^\d+$/.test(id) && parseInt(id) > 0) &&
              ids.length === uniqueIds.size
            );
          }, 'Los IDs deben ser números enteros > 0, separados por coma (,) o punto y coma (;) y deben ser únicos.')
        )
      ),
    })
  ),
});

export const SalariosSchema = object({
  usuario: pipe(
    string('El usuario es requerido'),
    nonEmpty('El usuario es requerido')
  ),
  cantidad: pipe(
    number('La cantidad es requerida'),
    minValue(1, 'La cantidad debe ser mayor a 0')
  ),
});
