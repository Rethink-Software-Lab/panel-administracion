import { object, string, minLength, pipe } from 'valibot';

export const ProveedorSchema = object({
  nombre: pipe(
    string('El nombre es requerido'),
    minLength(1, 'El nombre no puede estar vacío')
  ),
  direccion: pipe(
    string('La dirección es requerida'),
    minLength(1, 'La dirección no puede estar vacía')
  ),
  nit: pipe(
    string('El NIT es requerido'),
    minLength(1, 'El NIT no puede estar vacío')
  ),
  noCuentaCup: pipe(
    string('El número de cuenta CUP es requerido'),
    minLength(1, 'El número de cuenta CUP no puede estar vacío')
  ),
  noCuentaMayorista: pipe(
    string('El número de cuenta mayorista es requerido'),
    minLength(1, 'El número de cuenta mayorista no puede estar vacío')
  ),
  telefono: pipe(
    string('El teléfono es requerido'),
    minLength(1, 'El teléfono no puede estar vacío')
  ),
});
