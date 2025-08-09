import { AreaVenta } from "../areas-de-venta/types";
import { Categoria } from "../categorias/types";

export type AreaVentaInReporteFormData = Omit<AreaVenta, "color" | "isMesa">;

export interface ReporteFormData {
  areas: AreaVentaInReporteFormData[];
  categorias: Categoria[];
}
