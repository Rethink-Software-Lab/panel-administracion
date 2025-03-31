import { relations } from "drizzle-orm/relations";
import { djangoContentType, authPermission, authGroup, authGroupPermissions, inventarioAreaventa, inventarioVentas, inventarioUser, inventarioUserGroups, inventarioUserUserPermissions, inventarioEntradaalmacen, inventarioSalidaalmacen, inventarioProducto, inventarioProductoinfo, inventarioSalidaalmacenrevoltosa, inventarioCategorias, inventarioImage, djangoAdminLog, inventarioTransferencia, inventarioTransferenciaProductos, inventarioAjusteinventario, inventarioAjusteinventarioProductos, inventarioGastos, inventarioElaboraciones, inventarioElaboracionesIngredientesCantidad, inventarioIngredienteCantidad, inventarioProductosCafeteria, inventarioTransacciones, inventarioVentasCafeteria, inventarioCuentas, inventarioElaboracionesVentasCafeteria, inventarioProductosEntradasCafeteria, inventarioEntradasCafeteria, inventarioEntradasCafeteriaProductos, inventarioVentasCafeteriaElaboraciones, inventarioVentasCafeteriaProductos, inventarioProductosVentasCafeteria, inventarioInventarioAlmacenCafeteria, inventarioInventarioAreaCafeteria, inventarioProductosSalidasCafeteria, inventarioSalidasCafeteria, inventarioSalidasCafeteriaProductos, inventarioElaboracionesSalidasAlmacenCafeteria, inventarioSalidasCafeteriaElaboraciones, inventarioCuentacasa, inventarioCuentacasaElaboraciones, inventarioElaboracionesCantidadCuentaCasa, inventarioCuentacasaProductos, inventarioProductosCantidadCuentaCasa, inventarioMermacafeteria, inventarioMermacafeteriaElaboraciones, inventarioElaboracionesCantidadMerma, inventarioMermacafeteriaProductos, inventarioProductosCantidadMerma } from "./schema";

export const authPermissionRelations = relations(authPermission, ({one, many}) => ({
	djangoContentType: one(djangoContentType, {
		fields: [authPermission.contentTypeId],
		references: [djangoContentType.id]
	}),
	authGroupPermissions: many(authGroupPermissions),
	inventarioUserUserPermissions: many(inventarioUserUserPermissions),
}));

export const djangoContentTypeRelations = relations(djangoContentType, ({many}) => ({
	authPermissions: many(authPermission),
	djangoAdminLogs: many(djangoAdminLog),
}));

export const authGroupPermissionsRelations = relations(authGroupPermissions, ({one}) => ({
	authGroup: one(authGroup, {
		fields: [authGroupPermissions.groupId],
		references: [authGroup.id]
	}),
	authPermission: one(authPermission, {
		fields: [authGroupPermissions.permissionId],
		references: [authPermission.id]
	}),
}));

export const authGroupRelations = relations(authGroup, ({many}) => ({
	authGroupPermissions: many(authGroupPermissions),
	inventarioUserGroups: many(inventarioUserGroups),
}));

export const inventarioVentasRelations = relations(inventarioVentas, ({one, many}) => ({
	inventarioAreaventa: one(inventarioAreaventa, {
		fields: [inventarioVentas.areaVentaId],
		references: [inventarioAreaventa.id]
	}),
	inventarioUser: one(inventarioUser, {
		fields: [inventarioVentas.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioProductos: many(inventarioProducto),
	inventarioTransacciones: many(inventarioTransacciones),
}));

export const inventarioAreaventaRelations = relations(inventarioAreaventa, ({many}) => ({
	inventarioVentas: many(inventarioVentas),
	inventarioSalidaalmacens: many(inventarioSalidaalmacen),
	inventarioProductos: many(inventarioProducto),
	inventarioUsers: many(inventarioUser),
	inventarioTransferencias_deId: many(inventarioTransferencia, {
		relationName: "inventarioTransferencia_deId_inventarioAreaventa_id"
	}),
	inventarioTransferencias_paraId: many(inventarioTransferencia, {
		relationName: "inventarioTransferencia_paraId_inventarioAreaventa_id"
	}),
	inventarioGastos: many(inventarioGastos),
}));

export const inventarioUserRelations = relations(inventarioUser, ({one, many}) => ({
	inventarioVentas: many(inventarioVentas),
	inventarioUserGroups: many(inventarioUserGroups),
	inventarioUserUserPermissions: many(inventarioUserUserPermissions),
	inventarioEntradaalmacens: many(inventarioEntradaalmacen),
	inventarioSalidaalmacens: many(inventarioSalidaalmacen),
	inventarioAreaventa: one(inventarioAreaventa, {
		fields: [inventarioUser.areaVentaId],
		references: [inventarioAreaventa.id]
	}),
	djangoAdminLogs: many(djangoAdminLog),
	inventarioSalidaalmacenrevoltosas: many(inventarioSalidaalmacenrevoltosa),
	inventarioTransferencias: many(inventarioTransferencia),
	inventarioAjusteinventarios: many(inventarioAjusteinventario),
	inventarioGastos: many(inventarioGastos),
	inventarioTransacciones: many(inventarioTransacciones),
	inventarioEntradasCafeterias: many(inventarioEntradasCafeteria),
	inventarioVentasCafeterias: many(inventarioVentasCafeteria),
	inventarioSalidasCafeterias: many(inventarioSalidasCafeteria),
	inventarioCuentacasas: many(inventarioCuentacasa),
	inventarioMermacafeterias: many(inventarioMermacafeteria),
}));

export const inventarioUserGroupsRelations = relations(inventarioUserGroups, ({one}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioUserGroups.userId],
		references: [inventarioUser.id]
	}),
	authGroup: one(authGroup, {
		fields: [inventarioUserGroups.groupId],
		references: [authGroup.id]
	}),
}));

export const inventarioUserUserPermissionsRelations = relations(inventarioUserUserPermissions, ({one}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioUserUserPermissions.userId],
		references: [inventarioUser.id]
	}),
	authPermission: one(authPermission, {
		fields: [inventarioUserUserPermissions.permissionId],
		references: [authPermission.id]
	}),
}));

export const inventarioEntradaalmacenRelations = relations(inventarioEntradaalmacen, ({one, many}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioEntradaalmacen.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioProductos: many(inventarioProducto),
}));

export const inventarioSalidaalmacenRelations = relations(inventarioSalidaalmacen, ({one, many}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioSalidaalmacen.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioAreaventa: one(inventarioAreaventa, {
		fields: [inventarioSalidaalmacen.areaVentaId],
		references: [inventarioAreaventa.id]
	}),
	inventarioProductos: many(inventarioProducto),
}));

export const inventarioProductoRelations = relations(inventarioProducto, ({one, many}) => ({
	inventarioVenta: one(inventarioVentas, {
		fields: [inventarioProducto.ventaId],
		references: [inventarioVentas.id]
	}),
	inventarioAreaventa: one(inventarioAreaventa, {
		fields: [inventarioProducto.areaVentaId],
		references: [inventarioAreaventa.id]
	}),
	inventarioProductoinfo: one(inventarioProductoinfo, {
		fields: [inventarioProducto.infoId],
		references: [inventarioProductoinfo.id]
	}),
	inventarioSalidaalmacen: one(inventarioSalidaalmacen, {
		fields: [inventarioProducto.salidaId],
		references: [inventarioSalidaalmacen.id]
	}),
	inventarioSalidaalmacenrevoltosa: one(inventarioSalidaalmacenrevoltosa, {
		fields: [inventarioProducto.salidaRevoltosaId],
		references: [inventarioSalidaalmacenrevoltosa.id]
	}),
	inventarioEntradaalmacen: one(inventarioEntradaalmacen, {
		fields: [inventarioProducto.entradaId],
		references: [inventarioEntradaalmacen.id]
	}),
	inventarioTransferenciaProductos: many(inventarioTransferenciaProductos),
	inventarioAjusteinventarioProductos: many(inventarioAjusteinventarioProductos),
}));

export const inventarioProductoinfoRelations = relations(inventarioProductoinfo, ({one, many}) => ({
	inventarioProductos: many(inventarioProducto),
	inventarioCategoria: one(inventarioCategorias, {
		fields: [inventarioProductoinfo.categoriaId],
		references: [inventarioCategorias.id]
	}),
	inventarioImage: one(inventarioImage, {
		fields: [inventarioProductoinfo.imagenId],
		references: [inventarioImage.id]
	}),
}));

export const inventarioSalidaalmacenrevoltosaRelations = relations(inventarioSalidaalmacenrevoltosa, ({one, many}) => ({
	inventarioProductos: many(inventarioProducto),
	inventarioUser: one(inventarioUser, {
		fields: [inventarioSalidaalmacenrevoltosa.usuarioId],
		references: [inventarioUser.id]
	}),
}));

export const inventarioCategoriasRelations = relations(inventarioCategorias, ({many}) => ({
	inventarioProductoinfos: many(inventarioProductoinfo),
}));

export const inventarioImageRelations = relations(inventarioImage, ({many}) => ({
	inventarioProductoinfos: many(inventarioProductoinfo),
}));

export const djangoAdminLogRelations = relations(djangoAdminLog, ({one}) => ({
	djangoContentType: one(djangoContentType, {
		fields: [djangoAdminLog.contentTypeId],
		references: [djangoContentType.id]
	}),
	inventarioUser: one(inventarioUser, {
		fields: [djangoAdminLog.userId],
		references: [inventarioUser.id]
	}),
}));

export const inventarioTransferenciaRelations = relations(inventarioTransferencia, ({one, many}) => ({
	inventarioAreaventa_deId: one(inventarioAreaventa, {
		fields: [inventarioTransferencia.deId],
		references: [inventarioAreaventa.id],
		relationName: "inventarioTransferencia_deId_inventarioAreaventa_id"
	}),
	inventarioAreaventa_paraId: one(inventarioAreaventa, {
		fields: [inventarioTransferencia.paraId],
		references: [inventarioAreaventa.id],
		relationName: "inventarioTransferencia_paraId_inventarioAreaventa_id"
	}),
	inventarioUser: one(inventarioUser, {
		fields: [inventarioTransferencia.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioTransferenciaProductos: many(inventarioTransferenciaProductos),
}));

export const inventarioTransferenciaProductosRelations = relations(inventarioTransferenciaProductos, ({one}) => ({
	inventarioTransferencia: one(inventarioTransferencia, {
		fields: [inventarioTransferenciaProductos.transferenciaId],
		references: [inventarioTransferencia.id]
	}),
	inventarioProducto: one(inventarioProducto, {
		fields: [inventarioTransferenciaProductos.productoId],
		references: [inventarioProducto.id]
	}),
}));

export const inventarioAjusteinventarioRelations = relations(inventarioAjusteinventario, ({one, many}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioAjusteinventario.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioAjusteinventarioProductos: many(inventarioAjusteinventarioProductos),
}));

export const inventarioAjusteinventarioProductosRelations = relations(inventarioAjusteinventarioProductos, ({one}) => ({
	inventarioAjusteinventario: one(inventarioAjusteinventario, {
		fields: [inventarioAjusteinventarioProductos.ajusteinventarioId],
		references: [inventarioAjusteinventario.id]
	}),
	inventarioProducto: one(inventarioProducto, {
		fields: [inventarioAjusteinventarioProductos.productoId],
		references: [inventarioProducto.id]
	}),
}));

export const inventarioGastosRelations = relations(inventarioGastos, ({one}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioGastos.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioAreaventa: one(inventarioAreaventa, {
		fields: [inventarioGastos.areaVentaId],
		references: [inventarioAreaventa.id]
	}),
}));

export const inventarioElaboracionesIngredientesCantidadRelations = relations(inventarioElaboracionesIngredientesCantidad, ({one}) => ({
	inventarioElaboracione: one(inventarioElaboraciones, {
		fields: [inventarioElaboracionesIngredientesCantidad.elaboracionesId],
		references: [inventarioElaboraciones.id]
	}),
	inventarioIngredienteCantidad: one(inventarioIngredienteCantidad, {
		fields: [inventarioElaboracionesIngredientesCantidad.ingredienteCantidadId],
		references: [inventarioIngredienteCantidad.id]
	}),
}));

export const inventarioElaboracionesRelations = relations(inventarioElaboraciones, ({many}) => ({
	inventarioElaboracionesIngredientesCantidads: many(inventarioElaboracionesIngredientesCantidad),
	inventarioElaboracionesVentasCafeterias: many(inventarioElaboracionesVentasCafeteria),
	inventarioElaboracionesSalidasAlmacenCafeterias: many(inventarioElaboracionesSalidasAlmacenCafeteria),
	inventarioElaboracionesCantidadCuentaCasas: many(inventarioElaboracionesCantidadCuentaCasa),
	inventarioElaboracionesCantidadMermas: many(inventarioElaboracionesCantidadMerma),
}));

export const inventarioIngredienteCantidadRelations = relations(inventarioIngredienteCantidad, ({one, many}) => ({
	inventarioElaboracionesIngredientesCantidads: many(inventarioElaboracionesIngredientesCantidad),
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioIngredienteCantidad.ingredienteId],
		references: [inventarioProductosCafeteria.id]
	}),
}));

export const inventarioProductosCafeteriaRelations = relations(inventarioProductosCafeteria, ({many}) => ({
	inventarioIngredienteCantidads: many(inventarioIngredienteCantidad),
	inventarioProductosEntradasCafeterias: many(inventarioProductosEntradasCafeteria),
	inventarioProductosVentasCafeterias: many(inventarioProductosVentasCafeteria),
	inventarioInventarioAlmacenCafeterias: many(inventarioInventarioAlmacenCafeteria),
	inventarioInventarioAreaCafeterias: many(inventarioInventarioAreaCafeteria),
	inventarioProductosSalidasCafeterias: many(inventarioProductosSalidasCafeteria),
	inventarioProductosCantidadCuentaCasas: many(inventarioProductosCantidadCuentaCasa),
	inventarioProductosCantidadMermas: many(inventarioProductosCantidadMerma),
}));

export const inventarioTransaccionesRelations = relations(inventarioTransacciones, ({one}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioTransacciones.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioVenta: one(inventarioVentas, {
		fields: [inventarioTransacciones.ventaId],
		references: [inventarioVentas.id]
	}),
	inventarioVentasCafeteria: one(inventarioVentasCafeteria, {
		fields: [inventarioTransacciones.ventaCafeteriaId],
		references: [inventarioVentasCafeteria.id]
	}),
	inventarioCuenta: one(inventarioCuentas, {
		fields: [inventarioTransacciones.cuentaId],
		references: [inventarioCuentas.id]
	}),
}));

export const inventarioVentasCafeteriaRelations = relations(inventarioVentasCafeteria, ({one, many}) => ({
	inventarioTransacciones: many(inventarioTransacciones),
	inventarioVentasCafeteriaElaboraciones: many(inventarioVentasCafeteriaElaboraciones),
	inventarioVentasCafeteriaProductos: many(inventarioVentasCafeteriaProductos),
	inventarioUser: one(inventarioUser, {
		fields: [inventarioVentasCafeteria.usuarioId],
		references: [inventarioUser.id]
	}),
}));

export const inventarioCuentasRelations = relations(inventarioCuentas, ({many}) => ({
	inventarioTransacciones: many(inventarioTransacciones),
}));

export const inventarioElaboracionesVentasCafeteriaRelations = relations(inventarioElaboracionesVentasCafeteria, ({one, many}) => ({
	inventarioElaboracione: one(inventarioElaboraciones, {
		fields: [inventarioElaboracionesVentasCafeteria.productoId],
		references: [inventarioElaboraciones.id]
	}),
	inventarioVentasCafeteriaElaboraciones: many(inventarioVentasCafeteriaElaboraciones),
}));

export const inventarioProductosEntradasCafeteriaRelations = relations(inventarioProductosEntradasCafeteria, ({one, many}) => ({
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioProductosEntradasCafeteria.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
	inventarioEntradasCafeteriaProductos: many(inventarioEntradasCafeteriaProductos),
}));

export const inventarioEntradasCafeteriaRelations = relations(inventarioEntradasCafeteria, ({one, many}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioEntradasCafeteria.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioEntradasCafeteriaProductos: many(inventarioEntradasCafeteriaProductos),
}));

export const inventarioEntradasCafeteriaProductosRelations = relations(inventarioEntradasCafeteriaProductos, ({one}) => ({
	inventarioEntradasCafeteria: one(inventarioEntradasCafeteria, {
		fields: [inventarioEntradasCafeteriaProductos.entradasCafeteriaId],
		references: [inventarioEntradasCafeteria.id]
	}),
	inventarioProductosEntradasCafeteria: one(inventarioProductosEntradasCafeteria, {
		fields: [inventarioEntradasCafeteriaProductos.productosEntradasCafeteriaId],
		references: [inventarioProductosEntradasCafeteria.id]
	}),
}));

export const inventarioVentasCafeteriaElaboracionesRelations = relations(inventarioVentasCafeteriaElaboraciones, ({one}) => ({
	inventarioVentasCafeteria: one(inventarioVentasCafeteria, {
		fields: [inventarioVentasCafeteriaElaboraciones.ventasCafeteriaId],
		references: [inventarioVentasCafeteria.id]
	}),
	inventarioElaboracionesVentasCafeteria: one(inventarioElaboracionesVentasCafeteria, {
		fields: [inventarioVentasCafeteriaElaboraciones.elaboracionesVentasCafeteriaId],
		references: [inventarioElaboracionesVentasCafeteria.id]
	}),
}));

export const inventarioVentasCafeteriaProductosRelations = relations(inventarioVentasCafeteriaProductos, ({one}) => ({
	inventarioVentasCafeteria: one(inventarioVentasCafeteria, {
		fields: [inventarioVentasCafeteriaProductos.ventasCafeteriaId],
		references: [inventarioVentasCafeteria.id]
	}),
	inventarioProductosVentasCafeteria: one(inventarioProductosVentasCafeteria, {
		fields: [inventarioVentasCafeteriaProductos.productosVentasCafeteriaId],
		references: [inventarioProductosVentasCafeteria.id]
	}),
}));

export const inventarioProductosVentasCafeteriaRelations = relations(inventarioProductosVentasCafeteria, ({one, many}) => ({
	inventarioVentasCafeteriaProductos: many(inventarioVentasCafeteriaProductos),
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioProductosVentasCafeteria.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
}));

export const inventarioInventarioAlmacenCafeteriaRelations = relations(inventarioInventarioAlmacenCafeteria, ({one}) => ({
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioInventarioAlmacenCafeteria.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
}));

export const inventarioInventarioAreaCafeteriaRelations = relations(inventarioInventarioAreaCafeteria, ({one}) => ({
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioInventarioAreaCafeteria.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
}));

export const inventarioProductosSalidasCafeteriaRelations = relations(inventarioProductosSalidasCafeteria, ({one, many}) => ({
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioProductosSalidasCafeteria.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
	inventarioSalidasCafeteriaProductos: many(inventarioSalidasCafeteriaProductos),
}));

export const inventarioSalidasCafeteriaRelations = relations(inventarioSalidasCafeteria, ({one, many}) => ({
	inventarioUser: one(inventarioUser, {
		fields: [inventarioSalidasCafeteria.usuarioId],
		references: [inventarioUser.id]
	}),
	inventarioSalidasCafeteriaProductos: many(inventarioSalidasCafeteriaProductos),
	inventarioSalidasCafeteriaElaboraciones: many(inventarioSalidasCafeteriaElaboraciones),
}));

export const inventarioSalidasCafeteriaProductosRelations = relations(inventarioSalidasCafeteriaProductos, ({one}) => ({
	inventarioSalidasCafeteria: one(inventarioSalidasCafeteria, {
		fields: [inventarioSalidasCafeteriaProductos.salidasCafeteriaId],
		references: [inventarioSalidasCafeteria.id]
	}),
	inventarioProductosSalidasCafeteria: one(inventarioProductosSalidasCafeteria, {
		fields: [inventarioSalidasCafeteriaProductos.productosSalidasCafeteriaId],
		references: [inventarioProductosSalidasCafeteria.id]
	}),
}));

export const inventarioElaboracionesSalidasAlmacenCafeteriaRelations = relations(inventarioElaboracionesSalidasAlmacenCafeteria, ({one, many}) => ({
	inventarioElaboracione: one(inventarioElaboraciones, {
		fields: [inventarioElaboracionesSalidasAlmacenCafeteria.productoId],
		references: [inventarioElaboraciones.id]
	}),
	inventarioSalidasCafeteriaElaboraciones: many(inventarioSalidasCafeteriaElaboraciones),
}));

export const inventarioSalidasCafeteriaElaboracionesRelations = relations(inventarioSalidasCafeteriaElaboraciones, ({one}) => ({
	inventarioSalidasCafeteria: one(inventarioSalidasCafeteria, {
		fields: [inventarioSalidasCafeteriaElaboraciones.salidasCafeteriaId],
		references: [inventarioSalidasCafeteria.id]
	}),
	inventarioElaboracionesSalidasAlmacenCafeteria: one(inventarioElaboracionesSalidasAlmacenCafeteria, {
		fields: [inventarioSalidasCafeteriaElaboraciones.elaboracionesSalidasAlmacenCafeteriaId],
		references: [inventarioElaboracionesSalidasAlmacenCafeteria.id]
	}),
}));

export const inventarioCuentacasaElaboracionesRelations = relations(inventarioCuentacasaElaboraciones, ({one}) => ({
	inventarioCuentacasa: one(inventarioCuentacasa, {
		fields: [inventarioCuentacasaElaboraciones.cuentacasaId],
		references: [inventarioCuentacasa.id]
	}),
	inventarioElaboracionesCantidadCuentaCasa: one(inventarioElaboracionesCantidadCuentaCasa, {
		fields: [inventarioCuentacasaElaboraciones.elaboracionesCantidadCuentaCasaId],
		references: [inventarioElaboracionesCantidadCuentaCasa.id]
	}),
}));

export const inventarioCuentacasaRelations = relations(inventarioCuentacasa, ({one, many}) => ({
	inventarioCuentacasaElaboraciones: many(inventarioCuentacasaElaboraciones),
	inventarioCuentacasaProductos: many(inventarioCuentacasaProductos),
	inventarioUser: one(inventarioUser, {
		fields: [inventarioCuentacasa.usuarioId],
		references: [inventarioUser.id]
	}),
}));

export const inventarioElaboracionesCantidadCuentaCasaRelations = relations(inventarioElaboracionesCantidadCuentaCasa, ({one, many}) => ({
	inventarioCuentacasaElaboraciones: many(inventarioCuentacasaElaboraciones),
	inventarioElaboracione: one(inventarioElaboraciones, {
		fields: [inventarioElaboracionesCantidadCuentaCasa.productoId],
		references: [inventarioElaboraciones.id]
	}),
}));

export const inventarioCuentacasaProductosRelations = relations(inventarioCuentacasaProductos, ({one}) => ({
	inventarioCuentacasa: one(inventarioCuentacasa, {
		fields: [inventarioCuentacasaProductos.cuentacasaId],
		references: [inventarioCuentacasa.id]
	}),
	inventarioProductosCantidadCuentaCasa: one(inventarioProductosCantidadCuentaCasa, {
		fields: [inventarioCuentacasaProductos.productosCantidadCuentaCasaId],
		references: [inventarioProductosCantidadCuentaCasa.id]
	}),
}));

export const inventarioProductosCantidadCuentaCasaRelations = relations(inventarioProductosCantidadCuentaCasa, ({one, many}) => ({
	inventarioCuentacasaProductos: many(inventarioCuentacasaProductos),
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioProductosCantidadCuentaCasa.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
}));

export const inventarioMermacafeteriaElaboracionesRelations = relations(inventarioMermacafeteriaElaboraciones, ({one}) => ({
	inventarioMermacafeteria: one(inventarioMermacafeteria, {
		fields: [inventarioMermacafeteriaElaboraciones.mermacafeteriaId],
		references: [inventarioMermacafeteria.id]
	}),
	inventarioElaboracionesCantidadMerma: one(inventarioElaboracionesCantidadMerma, {
		fields: [inventarioMermacafeteriaElaboraciones.elaboracionesCantidadMermaId],
		references: [inventarioElaboracionesCantidadMerma.id]
	}),
}));

export const inventarioMermacafeteriaRelations = relations(inventarioMermacafeteria, ({one, many}) => ({
	inventarioMermacafeteriaElaboraciones: many(inventarioMermacafeteriaElaboraciones),
	inventarioMermacafeteriaProductos: many(inventarioMermacafeteriaProductos),
	inventarioUser: one(inventarioUser, {
		fields: [inventarioMermacafeteria.usuarioId],
		references: [inventarioUser.id]
	}),
}));

export const inventarioElaboracionesCantidadMermaRelations = relations(inventarioElaboracionesCantidadMerma, ({one, many}) => ({
	inventarioMermacafeteriaElaboraciones: many(inventarioMermacafeteriaElaboraciones),
	inventarioElaboracione: one(inventarioElaboraciones, {
		fields: [inventarioElaboracionesCantidadMerma.productoId],
		references: [inventarioElaboraciones.id]
	}),
}));

export const inventarioMermacafeteriaProductosRelations = relations(inventarioMermacafeteriaProductos, ({one}) => ({
	inventarioMermacafeteria: one(inventarioMermacafeteria, {
		fields: [inventarioMermacafeteriaProductos.mermacafeteriaId],
		references: [inventarioMermacafeteria.id]
	}),
	inventarioProductosCantidadMerma: one(inventarioProductosCantidadMerma, {
		fields: [inventarioMermacafeteriaProductos.productosCantidadMermaId],
		references: [inventarioProductosCantidadMerma.id]
	}),
}));

export const inventarioProductosCantidadMermaRelations = relations(inventarioProductosCantidadMerma, ({one, many}) => ({
	inventarioMermacafeteriaProductos: many(inventarioMermacafeteriaProductos),
	inventarioProductosCafeteria: one(inventarioProductosCafeteria, {
		fields: [inventarioProductosCantidadMerma.productoId],
		references: [inventarioProductosCafeteria.id]
	}),
}));