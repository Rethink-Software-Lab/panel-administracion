import { object, string, pipe, nonEmpty } from 'valibot';

export const ProveedorSchema = object({
  nombre: pipe(
    string('El nombre es requerido'),
    nonEmpty('El nombre no puede estar vacío')
  ),
  direccion: pipe(
    string('La dirección es requerida'),
    nonEmpty('La dirección no puede estar vacía')
  ),
  nit: pipe(
    string('El NIT es requerido'),
    nonEmpty('El NIT no puede estar vacío')
  ),
  noCuentaCup: string('El número de cuenta CUP debe ser una cadena de texto'),
  noCuentaMayorista: string(
    'El número de cuenta mayorista debe ser una cadena de texto'
  ),
  telefono: pipe(
    string('El teléfono es requerido'),
    nonEmpty('El teléfono no puede estar vacío')
  ),
});
