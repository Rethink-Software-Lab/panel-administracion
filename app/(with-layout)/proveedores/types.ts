import { inventarioProveedor } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type Proveedor = InferSelectModel<typeof inventarioProveedor>;
