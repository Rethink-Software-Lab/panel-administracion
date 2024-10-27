import { Usuario } from '../users/types';

export interface Salario {
  id: number;
  usuario: Usuario;
  cantidad: number;
}
