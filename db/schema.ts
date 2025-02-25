import { pgTable, bigint, varchar, timestamp, unique, integer, index, foreignKey, numeric, boolean, check, text, smallint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const djangoMigrations = pgTable("django_migrations", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "django_migrations_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	app: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	applied: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
});

export const djangoContentType = pgTable("django_content_type", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "django_content_type_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	appLabel: varchar("app_label", { length: 100 }).notNull(),
	model: varchar({ length: 100 }).notNull(),
}, (table) => [
	unique("django_content_type_app_label_model_76bd3d3b_uniq").on(table.appLabel, table.model),
]);

export const authPermission = pgTable("auth_permission", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "auth_permission_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	contentTypeId: integer("content_type_id").notNull(),
	codename: varchar({ length: 100 }).notNull(),
}, (table) => [
	index("auth_permission_content_type_id_2f476e4b").using("btree", table.contentTypeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.contentTypeId],
			foreignColumns: [djangoContentType.id],
			name: "auth_permission_content_type_id_2f476e4b_fk_django_co"
		}),
	unique("auth_permission_content_type_id_codename_01ab375a_uniq").on(table.contentTypeId, table.codename),
]);

export const authGroup = pgTable("auth_group", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "auth_group_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 150 }).notNull(),
}, (table) => [
	index("auth_group_name_a6ea08ec_like").using("btree", table.name.asc().nullsLast().op("varchar_pattern_ops")),
	unique("auth_group_name_key").on(table.name),
]);

export const authGroupPermissions = pgTable("auth_group_permissions", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "auth_group_permissions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	groupId: integer("group_id").notNull(),
	permissionId: integer("permission_id").notNull(),
}, (table) => [
	index("auth_group_permissions_group_id_b120cbf9").using("btree", table.groupId.asc().nullsLast().op("int4_ops")),
	index("auth_group_permissions_permission_id_84c5c92e").using("btree", table.permissionId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [authGroup.id],
			name: "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id"
		}),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [authPermission.id],
			name: "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm"
		}),
	unique("auth_group_permissions_group_id_permission_id_0cd325b0_uniq").on(table.groupId, table.permissionId),
]);

export const inventarioVentas = pgTable("inventario_ventas", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ventas_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	metodoPago: varchar("metodo_pago", { length: 30 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	areaVentaId: bigint("area_venta_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
	efectivo: numeric({ precision: 7, scale:  2 }),
	transferencia: numeric({ precision: 7, scale:  2 }),
}, (table) => [
	index("inventario_ventas_area_venta_id_b3f7fecc").using("btree", table.areaVentaId.asc().nullsLast().op("int8_ops")),
	index("inventario_ventas_usuario_id_835764cf").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.areaVentaId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_ventas_area_venta_id_b3f7fecc_fk_inventari"
		}),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_ventas_usuario_id_835764cf_fk_inventario_user_id"
		}),
]);

export const inventarioAreaventa = pgTable("inventario_areaventa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_areaventa_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	nombre: varchar({ length: 50 }).notNull(),
	color: varchar({ length: 10 }).notNull(),
});

export const inventarioUserGroups = pgTable("inventario_user_groups", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_user_groups_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
	groupId: integer("group_id").notNull(),
}, (table) => [
	index("inventario_user_groups_group_id_c3a1eebe").using("btree", table.groupId.asc().nullsLast().op("int4_ops")),
	index("inventario_user_groups_user_id_93508bd4").using("btree", table.userId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_user_groups_user_id_93508bd4_fk_inventario_user_id"
		}),
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [authGroup.id],
			name: "inventario_user_groups_group_id_c3a1eebe_fk_auth_group_id"
		}),
	unique("inventario_user_groups_user_id_group_id_49fae05b_uniq").on(table.userId, table.groupId),
]);

export const inventarioUserUserPermissions = pgTable("inventario_user_user_permissions", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_user_user_permissions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
	permissionId: integer("permission_id").notNull(),
}, (table) => [
	index("inventario_user_user_permissions_permission_id_50b6e5f3").using("btree", table.permissionId.asc().nullsLast().op("int4_ops")),
	index("inventario_user_user_permissions_user_id_26f01dc8").using("btree", table.userId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_user_user_user_id_26f01dc8_fk_inventari"
		}),
	foreignKey({
			columns: [table.permissionId],
			foreignColumns: [authPermission.id],
			name: "inventario_user_user_permission_id_50b6e5f3_fk_auth_perm"
		}),
	unique("inventario_user_user_per_user_id_permission_id_4d57db71_uniq").on(table.userId, table.permissionId),
]);

export const inventarioEntradaalmacen = pgTable("inventario_entradaalmacen", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_entradaalmacen_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	metodoPago: varchar("metodo_pago", { length: 30 }).notNull(),
	proveedor: varchar({ length: 30 }).notNull(),
	comprador: varchar({ length: 30 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_entradaalmacen_usuario_id_b421c7f9").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_entradaal_usuario_id_b421c7f9_fk_inventari"
		}),
]);

export const inventarioCategorias = pgTable("inventario_categorias", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_categorias_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	nombre: varchar({ length: 50 }).notNull(),
});

export const inventarioSalidaalmacen = pgTable("inventario_salidaalmacen", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_salidaalmacen_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	areaVentaId: bigint("area_venta_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_salidaalmacen_area_venta_id_9fbedf6a").using("btree", table.areaVentaId.asc().nullsLast().op("int8_ops")),
	index("inventario_salidaalmacen_usuario_id_866bfe76").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_salidaalm_usuario_id_866bfe76_fk_inventari"
		}),
	foreignKey({
			columns: [table.areaVentaId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_salidaalm_area_venta_id_9fbedf6a_fk_inventari"
		}),
]);

export const inventarioProducto = pgTable("inventario_producto", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_producto_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	color: varchar({ length: 100 }),
	numero: numeric({ precision: 3, scale:  1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	areaVentaId: bigint("area_venta_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	entradaId: bigint("entrada_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	infoId: bigint("info_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ventaId: bigint("venta_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	salidaId: bigint("salida_id", { mode: "number" }),
	almacenRevoltosa: boolean("almacen_revoltosa").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	salidaRevoltosaId: bigint("salida_revoltosa_id", { mode: "number" }),
}, (table) => [
	index("inventario_producto_area_venta_id_3503cefd").using("btree", table.areaVentaId.asc().nullsLast().op("int8_ops")),
	index("inventario_producto_entrada_id_54105bf9").using("btree", table.entradaId.asc().nullsLast().op("int8_ops")),
	index("inventario_producto_info_id_25d764ab").using("btree", table.infoId.asc().nullsLast().op("int8_ops")),
	index("inventario_producto_salida_id_c9d9731a").using("btree", table.salidaId.asc().nullsLast().op("int8_ops")),
	index("inventario_producto_salida_revoltosa_id_99a3c049").using("btree", table.salidaRevoltosaId.asc().nullsLast().op("int8_ops")),
	index("inventario_producto_venta_id_83ddd82d").using("btree", table.ventaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.ventaId],
			foreignColumns: [inventarioVentas.id],
			name: "inventario_producto_venta_id_83ddd82d_fk_inventario_ventas_id"
		}),
	foreignKey({
			columns: [table.areaVentaId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_producto_area_venta_id_3503cefd_fk_inventari"
		}),
	foreignKey({
			columns: [table.infoId],
			foreignColumns: [inventarioProductoinfo.id],
			name: "inventario_producto_info_id_25d764ab_fk_inventari"
		}),
	foreignKey({
			columns: [table.salidaId],
			foreignColumns: [inventarioSalidaalmacen.id],
			name: "inventario_producto_salida_id_c9d9731a_fk_inventari"
		}),
	foreignKey({
			columns: [table.salidaRevoltosaId],
			foreignColumns: [inventarioSalidaalmacenrevoltosa.id],
			name: "inventario_producto_salida_revoltosa_id_99a3c049_fk_inventari"
		}),
	foreignKey({
			columns: [table.entradaId],
			foreignColumns: [inventarioEntradaalmacen.id],
			name: "inventario_producto_entrada_id_54105bf9_fk_inventari"
		}),
]);

export const inventarioProductoinfo = pgTable("inventario_productoinfo", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productoinfo_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	codigo: varchar({ length: 30 }).notNull(),
	descripcion: varchar({ length: 100 }).notNull(),
	precioCosto: numeric("precio_costo", { precision: 7, scale:  2 }).notNull(),
	precioVenta: numeric("precio_venta", { precision: 7, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	categoriaId: bigint("categoria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	imagenId: bigint("imagen_id", { mode: "number" }),
	pagoTrabajador: integer("pago_trabajador").notNull(),
}, (table) => [
	index("inventario_productoinfo_categoria_id_0290445f").using("btree", table.categoriaId.asc().nullsLast().op("int8_ops")),
	index("inventario_productoinfo_codigo_d029faf9_like").using("btree", table.codigo.asc().nullsLast().op("varchar_pattern_ops")),
	index("inventario_productoinfo_imagen_id_88d7e135").using("btree", table.imagenId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.categoriaId],
			foreignColumns: [inventarioCategorias.id],
			name: "inventario_productoi_categoria_id_0290445f_fk_inventari"
		}),
	foreignKey({
			columns: [table.imagenId],
			foreignColumns: [inventarioImage.id],
			name: "inventario_productoi_imagen_id_88d7e135_fk_inventari"
		}),
	unique("inventario_productoinfo_codigo_key").on(table.codigo),
]);

export const inventarioUser = pgTable("inventario_user", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_user_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	password: varchar({ length: 128 }).notNull(),
	lastLogin: timestamp("last_login", { withTimezone: true, mode: 'string' }),
	isSuperuser: boolean("is_superuser").notNull(),
	username: varchar({ length: 15 }).notNull(),
	rol: varchar({ length: 30 }).notNull(),
	isStaff: boolean("is_staff").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	areaVentaId: bigint("area_venta_id", { mode: "number" }),
	almacen: varchar({ length: 30 }),
}, (table) => [
	index("inventario_user_area_venta_id_f6c18e65").using("btree", table.areaVentaId.asc().nullsLast().op("int8_ops")),
	index("inventario_user_username_820e633b_like").using("btree", table.username.asc().nullsLast().op("varchar_pattern_ops")),
	foreignKey({
			columns: [table.areaVentaId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_user_area_venta_id_f6c18e65_fk_inventari"
		}),
	unique("inventario_user_username_key").on(table.username),
]);

export const djangoAdminLog = pgTable("django_admin_log", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "django_admin_log_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	actionTime: timestamp("action_time", { withTimezone: true, mode: 'string' }).notNull(),
	objectId: text("object_id"),
	objectRepr: varchar("object_repr", { length: 200 }).notNull(),
	actionFlag: smallint("action_flag").notNull(),
	changeMessage: text("change_message").notNull(),
	contentTypeId: integer("content_type_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
}, (table) => [
	index("django_admin_log_content_type_id_c4bce8eb").using("btree", table.contentTypeId.asc().nullsLast().op("int4_ops")),
	index("django_admin_log_user_id_c564eba6").using("btree", table.userId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.contentTypeId],
			foreignColumns: [djangoContentType.id],
			name: "django_admin_log_content_type_id_c4bce8eb_fk_django_co"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [inventarioUser.id],
			name: "django_admin_log_user_id_c564eba6_fk_inventario_user_id"
		}),
	check("django_admin_log_action_flag_check", sql`action_flag >= 0`),
]);

export const inventarioImage = pgTable("inventario_image", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_image_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	publicId: varchar("public_id", { length: 50 }).notNull(),
	url: varchar({ length: 200 }).notNull(),
}, (table) => [
	index("inventario_image_public_id_d8a43c12_like").using("btree", table.publicId.asc().nullsLast().op("varchar_pattern_ops")),
	index("inventario_image_url_6aea672c_like").using("btree", table.url.asc().nullsLast().op("varchar_pattern_ops")),
	unique("inventario_image_public_id_key").on(table.publicId),
	unique("inventario_image_url_6aea672c_uniq").on(table.url),
]);

export const inventarioSalidaalmacenrevoltosa = pgTable("inventario_salidaalmacenrevoltosa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_salidaalmacenrevoltosa_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_salidaalmacenrevoltosa_usuario_id_b22c2981").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_salidaalm_usuario_id_b22c2981_fk_inventari"
		}),
]);

export const inventarioTransferencia = pgTable("inventario_transferencia", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_transferencia_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	deId: bigint("de_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	paraId: bigint("para_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_transferencia_de_id_ab761e45").using("btree", table.deId.asc().nullsLast().op("int8_ops")),
	index("inventario_transferencia_para_id_4f9e32ff").using("btree", table.paraId.asc().nullsLast().op("int8_ops")),
	index("inventario_transferencia_usuario_id_f59177aa").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.deId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_transfere_de_id_ab761e45_fk_inventari"
		}),
	foreignKey({
			columns: [table.paraId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_transfere_para_id_4f9e32ff_fk_inventari"
		}),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_transfere_usuario_id_f59177aa_fk_inventari"
		}),
]);

export const inventarioTransferenciaProductos = pgTable("inventario_transferencia_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_transferencia_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	transferenciaId: bigint("transferencia_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_transferencia_productos_producto_id_58fac46a").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	index("inventario_transferencia_productos_transferencia_id_62009cdf").using("btree", table.transferenciaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.transferenciaId],
			foreignColumns: [inventarioTransferencia.id],
			name: "inventario_transfere_transferencia_id_62009cdf_fk_inventari"
		}),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProducto.id],
			name: "inventario_transfere_producto_id_58fac46a_fk_inventari"
		}),
	unique("inventario_transferencia_transferencia_id_product_ab7df270_uniq").on(table.transferenciaId, table.productoId),
]);

export const inventarioAjusteinventario = pgTable("inventario_ajusteinventario", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ajusteinventario_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	motivo: varchar({ length: 100 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_ajusteinventario_usuario_id_ff88fff9").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_ajusteinv_usuario_id_ff88fff9_fk_inventari"
		}),
]);

export const inventarioAjusteinventarioProductos = pgTable("inventario_ajusteinventario_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ajusteinventario_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ajusteinventarioId: bigint("ajusteinventario_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_ajusteinventari_ajusteinventario_id_c7ff354b").using("btree", table.ajusteinventarioId.asc().nullsLast().op("int8_ops")),
	index("inventario_ajusteinventario_productos_producto_id_1303305a").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.ajusteinventarioId],
			foreignColumns: [inventarioAjusteinventario.id],
			name: "inventario_ajusteinv_ajusteinventario_id_c7ff354b_fk_inventari"
		}),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProducto.id],
			name: "inventario_ajusteinv_producto_id_1303305a_fk_inventari"
		}),
	unique("inventario_ajusteinventa_ajusteinventario_id_prod_a446f145_uniq").on(table.ajusteinventarioId, table.productoId),
]);

export const inventarioGastos = pgTable("inventario_gastos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_gastos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	tipo: varchar({ length: 30 }).notNull(),
	descripcion: varchar({ length: 100 }).notNull(),
	cantidad: integer().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	frecuencia: varchar({ length: 30 }),
	diaMes: integer("dia_mes"),
	diaSemana: integer("dia_semana"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	areaVentaId: bigint("area_venta_id", { mode: "number" }),
	isCafeteria: boolean("is_cafeteria").notNull(),
}, (table) => [
	index("inventario_gastos_area_venta_id_1b18e8f5").using("btree", table.areaVentaId.asc().nullsLast().op("int8_ops")),
	index("inventario_gastos_usuario_id_c9d7d796").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_gastos_usuario_id_c9d7d796_fk_inventario_user_id"
		}),
	foreignKey({
			columns: [table.areaVentaId],
			foreignColumns: [inventarioAreaventa.id],
			name: "inventario_gastos_area_venta_id_1b18e8f5_fk_inventari"
		}),
]);

export const inventarioTransferenciastarjetas = pgTable("inventario_transferenciastarjetas", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_trnsferenciastarjetas_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	descripcion: varchar({ length: 50 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	tarjetaId: bigint("tarjeta_id", { mode: "number" }).notNull(),
	tipo: varchar({ length: 30 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ventaId: bigint("venta_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ventaCafeteriaId: bigint("venta_cafeteria_id", { mode: "number" }),
}, (table) => [
	index("inventario_transferenciastarjetas_usuario_id_7c62afec").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	index("inventario_trnsferenciastarjetas_tarjeta_id_6391af07").using("btree", table.tarjetaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.tarjetaId],
			foreignColumns: [inventarioTarjetas.id],
			name: "inventario_trnsferen_tarjeta_id_6391af07_fk_inventari"
		}),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_transfere_usuario_id_7c62afec_fk_inventari"
		}),
	foreignKey({
			columns: [table.ventaId],
			foreignColumns: [inventarioVentas.id],
			name: "inventario_transfere_venta_id_35c04c04_fk_inventari"
		}),
	foreignKey({
			columns: [table.ventaCafeteriaId],
			foreignColumns: [inventarioVentasCafeteria.id],
			name: "inventario_transfere_venta_cafeteria_id_976c2f5f_fk_inventari"
		}),
	unique("inventario_transferenciastarjetas_venta_id_35c04c04_uniq").on(table.ventaId),
	unique("inventario_transferenciastarjetas_venta_cafeteria_id_key").on(table.ventaCafeteriaId),
]);

export const inventarioTarjetas = pgTable("inventario_tarjetas", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_tarjetas_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	nombre: varchar({ length: 50 }).notNull(),
	banco: varchar({ length: 50 }).notNull(),
});

export const inventarioBalancetarjetas = pgTable("inventario_balancetarjetas", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_balancetarjetas_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	valor: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	tarjetaId: bigint("tarjeta_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tarjetaId],
			foreignColumns: [inventarioTarjetas.id],
			name: "inventario_balanceta_tarjeta_id_db5389b2_fk_inventari"
		}),
	unique("inventario_balancetarjetas_tarjeta_id_db5389b2_uniq").on(table.tarjetaId),
]);

export const inventarioElaboracionesIngredientesCantidad = pgTable("inventario_elaboraciones_ingredientes_cantidad", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_elaboraciones_ingredientes_cantidad_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	elaboracionesId: bigint("elaboraciones_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ingredienteCantidadId: bigint("ingrediente_cantidad_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_elaboraciones_i_elaboraciones_id_95ee7062").using("btree", table.elaboracionesId.asc().nullsLast().op("int8_ops")),
	index("inventario_elaboraciones_i_ingrediente_cantidad_id_102c7e19").using("btree", table.ingredienteCantidadId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.elaboracionesId],
			foreignColumns: [inventarioElaboraciones.id],
			name: "inventario_elaboraci_elaboraciones_id_95ee7062_fk_inventari"
		}),
	foreignKey({
			columns: [table.ingredienteCantidadId],
			foreignColumns: [inventarioIngredienteCantidad.id],
			name: "inventario_elaboraci_ingrediente_cantidad_102c7e19_fk_inventari"
		}),
	unique("inventario_elaboraciones_elaboraciones_id_ingredi_2e33d06a_uniq").on(table.elaboracionesId, table.ingredienteCantidadId),
]);

export const inventarioIngredienteCantidad = pgTable("inventario_ingrediente_cantidad", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ingrediente_cantidad_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  3 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ingredienteId: bigint("ingrediente_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_ingrediente_cantidad_ingrediente_id_07f0428a").using("btree", table.ingredienteId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.ingredienteId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_ingredien_ingrediente_id_07f0428a_fk_inventari"
		}),
]);

export const inventarioElaboraciones = pgTable("inventario_elaboraciones", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_elaboraciones_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	precio: numeric({ precision: 12, scale:  2 }).notNull(),
	manoObra: numeric("mano_obra", { precision: 12, scale:  2 }).notNull(),
	nombre: varchar({ length: 50 }).notNull(),
});

export const inventarioProductosCafeteria = pgTable("inventario_productos_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productos_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	nombre: varchar({ length: 50 }).notNull(),
	precioCosto: numeric("precio_costo", { precision: 12, scale:  2 }).notNull(),
	precioVenta: numeric("precio_venta", { precision: 12, scale:  2 }).notNull(),
});

export const inventarioElaboracionesVentasCafeteria = pgTable("inventario_elaboraciones_ventas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_elaboraciones_ventas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: integer().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_elaboraciones_ventas_cafeteria_producto_id_7f688893").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioElaboraciones.id],
			name: "inventario_elaboraci_producto_id_7f688893_fk_inventari"
		}),
]);

export const inventarioProductosEntradasCafeteria = pgTable("inventario_productos_entradas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productos_entradas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_productos_entradas_cafeteria_producto_id_2b900e7f").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_productos_producto_id_2b900e7f_fk_inventari"
		}),
]);

export const inventarioEntradasCafeteria = pgTable("inventario_entradas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_entradas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	metodoPago: varchar("metodo_pago", { length: 30 }).notNull(),
	proveedor: varchar({ length: 30 }).notNull(),
	comprador: varchar({ length: 30 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_entradas_cafeteria_usuario_id_5d8b4d3e").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_entradas__usuario_id_5d8b4d3e_fk_inventari"
		}),
]);

export const inventarioEntradasCafeteriaProductos = pgTable("inventario_entradas_cafeteria_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_entradas_cafeteria_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	entradasCafeteriaId: bigint("entradas_cafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productosEntradasCafeteriaId: bigint("productos_entradas_cafeteria_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_entradas_cafete_entradas_cafeteria_id_98fd7ab2").using("btree", table.entradasCafeteriaId.asc().nullsLast().op("int8_ops")),
	index("inventario_entradas_cafete_productos_entradas_cafeter_47611d09").using("btree", table.productosEntradasCafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.entradasCafeteriaId],
			foreignColumns: [inventarioEntradasCafeteria.id],
			name: "inventario_entradas__entradas_cafeteria_i_98fd7ab2_fk_inventari"
		}),
	foreignKey({
			columns: [table.productosEntradasCafeteriaId],
			foreignColumns: [inventarioProductosEntradasCafeteria.id],
			name: "inventario_entradas__productos_entradas_c_47611d09_fk_inventari"
		}),
	unique("inventario_entradas_cafe_entradas_cafeteria_id_pr_065d4fb1_uniq").on(table.entradasCafeteriaId, table.productosEntradasCafeteriaId),
]);

export const inventarioVentasCafeteriaElaboraciones = pgTable("inventario_ventas_cafeteria_elaboraciones", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ventas_cafeteria_elaboraciones_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ventasCafeteriaId: bigint("ventas_cafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	elaboracionesVentasCafeteriaId: bigint("elaboraciones_ventas_cafeteria_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_ventas_cafeteri_elaboraciones_ventas_cafet_b3bd21fb").using("btree", table.elaboracionesVentasCafeteriaId.asc().nullsLast().op("int8_ops")),
	index("inventario_ventas_cafeteri_ventas_cafeteria_id_1f8764a9").using("btree", table.ventasCafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.ventasCafeteriaId],
			foreignColumns: [inventarioVentasCafeteria.id],
			name: "inventario_ventas_ca_ventas_cafeteria_id_1f8764a9_fk_inventari"
		}),
	foreignKey({
			columns: [table.elaboracionesVentasCafeteriaId],
			foreignColumns: [inventarioElaboracionesVentasCafeteria.id],
			name: "inventario_ventas_ca_elaboraciones_ventas_b3bd21fb_fk_inventari"
		}),
	unique("inventario_ventas_cafete_ventas_cafeteria_id_elab_7b9f8dea_uniq").on(table.ventasCafeteriaId, table.elaboracionesVentasCafeteriaId),
]);

export const inventarioVentasCafeteriaProductos = pgTable("inventario_ventas_cafeteria_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ventas_cafeteria_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ventasCafeteriaId: bigint("ventas_cafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productosVentasCafeteriaId: bigint("productos_ventas_cafeteria_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_ventas_cafeteri_productos_ventas_cafeteria_dd02a326").using("btree", table.productosVentasCafeteriaId.asc().nullsLast().op("int8_ops")),
	index("inventario_ventas_cafeteri_ventas_cafeteria_id_89ae285d").using("btree", table.ventasCafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.ventasCafeteriaId],
			foreignColumns: [inventarioVentasCafeteria.id],
			name: "inventario_ventas_ca_ventas_cafeteria_id_89ae285d_fk_inventari"
		}),
	foreignKey({
			columns: [table.productosVentasCafeteriaId],
			foreignColumns: [inventarioProductosVentasCafeteria.id],
			name: "inventario_ventas_ca_productos_ventas_caf_dd02a326_fk_inventari"
		}),
	unique("inventario_ventas_cafete_ventas_cafeteria_id_prod_9d58c5c7_uniq").on(table.ventasCafeteriaId, table.productosVentasCafeteriaId),
]);

export const inventarioVentasCafeteria = pgTable("inventario_ventas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_ventas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	metodoPago: varchar("metodo_pago", { length: 30 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
	efectivo: numeric({ precision: 7, scale:  2 }),
	transferencia: numeric({ precision: 7, scale:  2 }),
}, (table) => [
	index("inventario_ventas_cafeteria_usuario_id_f95b48c6").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_ventas_ca_usuario_id_f95b48c6_fk_inventari"
		}),
]);

export const inventarioProductosVentasCafeteria = pgTable("inventario_productos_ventas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productos_ventas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 7, scale:  2 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_productos_ventas_cafeteria_producto_id_67103ae0").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_productos_producto_id_67103ae0_fk_inventari"
		}),
]);

export const inventarioInventarioAlmacenCafeteria = pgTable("inventario_inventario_almacen_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_inventario_producto_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_inventari_producto_id_443d6873_fk_inventari"
		}),
	unique("inventario_inventario_pr_producto_id_443d6873_uniq").on(table.productoId),
]);

export const inventarioInventarioAreaCafeteria = pgTable("inventario_inventario_area_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_inventario_area_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_inventari_producto_id_ec3af37d_fk_inventari"
		}),
	unique("inventario_inventario_area_cafeteria_producto_id_key").on(table.productoId),
]);

export const inventarioProductosSalidasCafeteria = pgTable("inventario_productos_salidas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productos_salidas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_productos_salidas_cafeteria_producto_id_88bf2e08").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_productos_producto_id_88bf2e08_fk_inventari"
		}),
]);

export const inventarioSalidasCafeteria = pgTable("inventario_salidas_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_salidas_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
}, (table) => [
	index("inventario_salidas_cafeteria_usuario_id_86c1a2dd").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_salidas_c_usuario_id_86c1a2dd_fk_inventari"
		}),
]);

export const inventarioSalidasCafeteriaProductos = pgTable("inventario_salidas_cafeteria_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_salidas_cafeteria_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	salidasCafeteriaId: bigint("salidas_cafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productosSalidasCafeteriaId: bigint("productos_salidas_cafeteria_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_salidas_cafeter_productos_salidas_cafeteri_13821a28").using("btree", table.productosSalidasCafeteriaId.asc().nullsLast().op("int8_ops")),
	index("inventario_salidas_cafeter_salidas_cafeteria_id_5cb6101f").using("btree", table.salidasCafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.salidasCafeteriaId],
			foreignColumns: [inventarioSalidasCafeteria.id],
			name: "inventario_salidas_c_salidas_cafeteria_id_5cb6101f_fk_inventari"
		}),
	foreignKey({
			columns: [table.productosSalidasCafeteriaId],
			foreignColumns: [inventarioProductosSalidasCafeteria.id],
			name: "inventario_salidas_c_productos_salidas_ca_13821a28_fk_inventari"
		}),
	unique("inventario_salidas_cafet_salidas_cafeteria_id_pro_23d6a07b_uniq").on(table.salidasCafeteriaId, table.productosSalidasCafeteriaId),
]);

export const inventarioElaboracionesSalidasAlmacenCafeteria = pgTable("inventario_elaboraciones_salidas_almacen_cafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_elaboraciones_salidas_almacen_cafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_elaboraciones_s_producto_id_4072ff2f").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioElaboraciones.id],
			name: "inventario_elaboraci_producto_id_4072ff2f_fk_inventari"
		}),
]);

export const inventarioSalidasCafeteriaElaboraciones = pgTable("inventario_salidas_cafeteria_elaboraciones", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_salidas_cafeteria_elaboraciones_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	salidasCafeteriaId: bigint("salidas_cafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	elaboracionesSalidasAlmacenCafeteriaId: bigint("elaboraciones_salidas_almacen_cafeteria_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_salidas_cafeter_elaboraciones_salidas_alma_6f04391c").using("btree", table.elaboracionesSalidasAlmacenCafeteriaId.asc().nullsLast().op("int8_ops")),
	index("inventario_salidas_cafeter_salidas_cafeteria_id_6ea9876d").using("btree", table.salidasCafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.salidasCafeteriaId],
			foreignColumns: [inventarioSalidasCafeteria.id],
			name: "inventario_salidas_c_salidas_cafeteria_id_6ea9876d_fk_inventari"
		}),
	foreignKey({
			columns: [table.elaboracionesSalidasAlmacenCafeteriaId],
			foreignColumns: [inventarioElaboracionesSalidasAlmacenCafeteria.id],
			name: "inventario_salidas_c_elaboraciones_salida_6f04391c_fk_inventari"
		}),
	unique("inventario_salidas_cafet_salidas_cafeteria_id_ela_eac1b1ff_uniq").on(table.salidasCafeteriaId, table.elaboracionesSalidasAlmacenCafeteriaId),
]);

export const inventarioCuentacasaElaboraciones = pgTable("inventario_cuentacasa_elaboraciones", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_cuentacasa_elaboraciones_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cuentacasaId: bigint("cuentacasa_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	elaboracionesCantidadCuentaCasaId: bigint("elaboraciones_cantidad_cuenta_casa_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_cuentacasa_elaboraciones_cuentacasa_id_cb18c705").using("btree", table.cuentacasaId.asc().nullsLast().op("int8_ops")),
	index("inventario_cuentacasa_elaboraciones_elaboraciones_id_95a41087").using("btree", table.elaboracionesCantidadCuentaCasaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.cuentacasaId],
			foreignColumns: [inventarioCuentacasa.id],
			name: "inventario_cuentacas_cuentacasa_id_cb18c705_fk_inventari"
		}),
	foreignKey({
			columns: [table.elaboracionesCantidadCuentaCasaId],
			foreignColumns: [inventarioElaboracionesCantidadCuentaCasa.id],
			name: "inventario_cuentacas_elaboraciones_cantid_9b6b426a_fk_inventari"
		}),
	unique("inventario_cuentacasa_el_cuentacasa_id_elaboracio_88fb6b42_uniq").on(table.cuentacasaId, table.elaboracionesCantidadCuentaCasaId),
]);

export const inventarioCuentacasaProductos = pgTable("inventario_cuentacasa_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_cuentacasa_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cuentacasaId: bigint("cuentacasa_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productosCantidadCuentaCasaId: bigint("productos_cantidad_cuenta_casa_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_cuentacasa_productos_cuentacasa_id_442086f6").using("btree", table.cuentacasaId.asc().nullsLast().op("int8_ops")),
	index("inventario_cuentacasa_productos_productos_cafeteria_id_ade0413f").using("btree", table.productosCantidadCuentaCasaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.cuentacasaId],
			foreignColumns: [inventarioCuentacasa.id],
			name: "inventario_cuentacas_cuentacasa_id_442086f6_fk_inventari"
		}),
	foreignKey({
			columns: [table.productosCantidadCuentaCasaId],
			foreignColumns: [inventarioProductosCantidadCuentaCasa.id],
			name: "inventario_cuentacas_productos_cantidad_c_45a6a69e_fk_inventari"
		}),
	unique("inventario_cuentacasa_pr_cuentacasa_id_productos__9bb0078f_uniq").on(table.cuentacasaId, table.productosCantidadCuentaCasaId),
]);

export const inventarioMermacafeteriaElaboraciones = pgTable("inventario_mermacafeteria_elaboraciones", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_mermacafeteria_elaboraciones_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mermacafeteriaId: bigint("mermacafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	elaboracionesCantidadMermaId: bigint("elaboraciones_cantidad_merma_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_mermacafeteria__elaboraciones_id_23f3f2b9").using("btree", table.elaboracionesCantidadMermaId.asc().nullsLast().op("int8_ops")),
	index("inventario_mermacafeteria__mermacafeteria_id_c5ed4944").using("btree", table.mermacafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.mermacafeteriaId],
			foreignColumns: [inventarioMermacafeteria.id],
			name: "inventario_mermacafe_mermacafeteria_id_c5ed4944_fk_inventari"
		}),
	foreignKey({
			columns: [table.elaboracionesCantidadMermaId],
			foreignColumns: [inventarioElaboracionesCantidadMerma.id],
			name: "inventario_mermacafe_elaboraciones_cantid_27ea67b7_fk_inventari"
		}),
	unique("inventario_mermacafeteri_mermacafeteria_id_elabor_128eb554_uniq").on(table.mermacafeteriaId, table.elaboracionesCantidadMermaId),
]);

export const inventarioMermacafeteriaProductos = pgTable("inventario_mermacafeteria_productos", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_mermacafeteria_productos_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mermacafeteriaId: bigint("mermacafeteria_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productosCantidadMermaId: bigint("productos_cantidad_merma_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_mermacafeteria__productos_cafeteria_id_3d73742e").using("btree", table.productosCantidadMermaId.asc().nullsLast().op("int8_ops")),
	index("inventario_mermacafeteria_productos_mermacafeteria_id_1bdf65dc").using("btree", table.mermacafeteriaId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.mermacafeteriaId],
			foreignColumns: [inventarioMermacafeteria.id],
			name: "inventario_mermacafe_mermacafeteria_id_1bdf65dc_fk_inventari"
		}),
	foreignKey({
			columns: [table.productosCantidadMermaId],
			foreignColumns: [inventarioProductosCantidadMerma.id],
			name: "inventario_mermacafe_productos_cantidad_m_6151759f_fk_inventari"
		}),
	unique("inventario_mermacafeteri_mermacafeteria_id_produc_04311ede_uniq").on(table.mermacafeteriaId, table.productosCantidadMermaId),
]);

export const inventarioCuentacasa = pgTable("inventario_cuentacasa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_cuentacasa_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
	isAlmacen: boolean("is_almacen").notNull(),
}, (table) => [
	index("inventario_cuentacasa_usuario_id_7dc94e37").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_cuentacasa_usuario_id_7dc94e37_fk_inventario_user_id"
		}),
]);

export const inventarioMermacafeteria = pgTable("inventario_mermacafeteria", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_mermacafeteria_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usuarioId: bigint("usuario_id", { mode: "number" }),
	isAlmacen: boolean("is_almacen").notNull(),
}, (table) => [
	index("inventario_mermacafeteria_usuario_id_2dfab6b7").using("btree", table.usuarioId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.usuarioId],
			foreignColumns: [inventarioUser.id],
			name: "inventario_mermacafe_usuario_id_2dfab6b7_fk_inventari"
		}),
]);

export const inventarioElaboracionesCantidadCuentaCasa = pgTable("inventario_elaboraciones_cantidad_cuenta_casa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_elaboraciones_cantidad_cuenta_casa_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_elaboraciones_c_producto_id_ea6fb7c9").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioElaboraciones.id],
			name: "inventario_elaboraci_producto_id_ea6fb7c9_fk_inventari"
		}),
]);

export const inventarioElaboracionesCantidadMerma = pgTable("inventario_elaboraciones_cantidad_merma", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_elaboraciones_cantidad_merma_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_elaboraciones_cantidad_merma_producto_id_6f8a5466").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioElaboraciones.id],
			name: "inventario_elaboraci_producto_id_6f8a5466_fk_inventari"
		}),
]);

export const inventarioProductosCantidadCuentaCasa = pgTable("inventario_productos_cantidad_cuenta_casa", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productos_cantidad_cuenta_casa_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_productos_cantidad_cuenta_casa_producto_id_1ac8b21c").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_productos_producto_id_1ac8b21c_fk_inventari"
		}),
]);

export const inventarioProductosCantidadMerma = pgTable("inventario_productos_cantidad_merma", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_productos_cantidad_merma_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	cantidad: numeric({ precision: 12, scale:  2 }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productoId: bigint("producto_id", { mode: "number" }).notNull(),
}, (table) => [
	index("inventario_productos_cantidad_merma_producto_id_5c55ab55").using("btree", table.productoId.asc().nullsLast().op("int8_ops")),
	foreignKey({
			columns: [table.productoId],
			foreignColumns: [inventarioProductosCafeteria.id],
			name: "inventario_productos_producto_id_5c55ab55_fk_inventari"
		}),
]);

export const djangoSession = pgTable("django_session", {
	sessionKey: varchar("session_key", { length: 40 }).primaryKey().notNull(),
	sessionData: text("session_data").notNull(),
	expireDate: timestamp("expire_date", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	index("django_session_expire_date_a5c62663").using("btree", table.expireDate.asc().nullsLast().op("timestamptz_ops")),
	index("django_session_session_key_c0390e0f_like").using("btree", table.sessionKey.asc().nullsLast().op("varchar_pattern_ops")),
]);

export const inventarioVendedorexterno = pgTable("inventario_vendedorexterno", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "inventario_vendedorexterno_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	nombre: varchar({ length: 50 }).notNull(),
	telefono: varchar({ length: 50 }).notNull(),
	codigoReferido: varchar("codigo_referido", { length: 8 }).notNull(),
}, (table) => [
	index("inventario_vendedorexterno_codigo_referido_f8778923_like").using("btree", table.codigoReferido.asc().nullsLast().op("varchar_pattern_ops")),
	unique("inventario_vendedorexterno_codigo_referido_key").on(table.codigoReferido),
]);
