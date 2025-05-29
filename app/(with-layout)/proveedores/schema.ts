import { object, string, pipe, nonEmpty } from 'valibot';

export const ProveedorSchema = object({
  nombre: pipe(
    string('El nombre es requerido'),
    nonEmpty('El nombre no puede estar vacío')
  ),
  direccion: string('La dirección debe ser una cadena de texto'),
  nit: string('El NIT debe ser una cadena de texto'),
  noCuentaCup: string('El número de cuenta CUP debe ser una cadena de texto'),
  noCuentaMayorista: string(
    'El número de cuenta mayorista debe ser una cadena de texto'
  ),
  telefono: string('El teléfono debe ser una cadena de texto'),
});
