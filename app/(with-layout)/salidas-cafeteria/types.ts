import { ProductInfo } from '../products/types';
import { Usuario } from '../users/types';

export interface SalidasCafeteria {
  id: number;
  cantidad: number;
  usuario: Usuario;
  created_at: string;
  info_producto: ProductInfo;
}
