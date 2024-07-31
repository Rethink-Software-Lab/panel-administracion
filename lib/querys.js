export const ALL_USERS = `
    query ALL_USERS($page: Int!) {
        allUsers(page: $page) {
            users {
              id
            }
            info {
              page
              totalPages
            }
          }
    }
`;

export const ONE_USERS = `
    query one_user($id: ID!) {
        oneUser(id: $id) {
              username
              rol
              lastLogin
              isSuperuser
              isStaff
              id
              areaVenta {
                id
                nombre
              }
            }

    }
`;

export const ALL_PRODUCTS_INFO = `
    query all_product_info ($page: Int) {
      allProductosInfo(page: $page) {
        info {
          page
          totalPages
        }
        productosInfo {
          id
          codigo
          categoria {
            nombre
          }
        }
      }
    }
`;

export const ONE_PRODUCTS_INFO = `
    query one_product_info ($id: ID!) {
      oneProductInfo(id: $id) {
          id
          imagen {
            url
          }
          descripcion
          codigo
          categoria {
            id
            nombre
          }
          precioCosto
          precioVenta
        }
    }
`;

export const ALL_ENTRADAS = `
    query all_entradas ($page: Int!) {
      allEntradas(page: $page) {
        entradas {
          id
          createdAt
          metodoPago
          proveedor
          comprador
          usuario {
            username
          }
        }
        info {
          totalPages
          page
        }
      }
    }
`;

export const ALL_SALIDAS = `
    query all_entradas ($page: Int!) {
      allSalidas(page: $page) {
        salidas {
          createdAt
          id
          usuario {
            username
          }
          productos {
            id
          }
          areaVenta {
            id
            nombre
          }
          updatedAt
        }
        info {
          page
          totalPages
        }
      }
    }
`;

export const ALL_AREAS_VENTAS = `
    query all_areas_ventas ($page: Int) {
      allAreaVenta(page: $page) {
        info {
          page
          totalPages
        }
        areasVenta {
          id
          nombre
          color
        }
      }
    }
`;

export const INVENTARIO_ALMACEN = `
    query inventario_almacen {
      inventarioAlmacen {
          color
          id
          numero
          info {
            codigo
            descripcion
            precioCosto
            precioVenta
            categoria {
              nombre
            }
          }
      }
    }
`;

export const ONE_PRODUCTO = `
    query one_producto ($id: ID!) {
      oneProducto(id: $id) {
          color
          id
          numero
          info {
            codigo
          }
      }
    }
`;

export const ONE_VENTAS = `
    query one_ventas($id: ID!, $page: Int) {
      oneVentas(id: $id, page: $page) {
        ventas {
          id
          usuario {
            username
          }
          productoSet {
            id
          }
          metodoPago
          createdAt
          areaVenta {
            nombre
          }
        }
      }
    }
`;

export const PRODUCTOS_BY_AREA_VENTA = `
    query productos_by_area_venta($id: ID!) {
      productosByAreaVenta(id: $id) {
        id
      }
    }
`;

export const USER_BY_TOKEN = `
    query {
        userByToken {
            rol
            areaVenta {
              id
            }
        }
    }
`;

export const VENTAS_HOY = `
    query {
        ventasHoy 
    }
`;

export const VENTAS_SEMANA = `
    query {
        ventasSemana 
    }
`;

export const VENTAS_MES = `
    query {
        ventasMes 
    }
`;

export const MAS_VENDIDOS = `
    query {
      masVendidos {
        cantidad
        producto {
          id
        }
      }
    }
`;

export const SEARCH_PRODUCT = `
    query search_product($codigo:String!) {
      searchProduct(codigo:$codigo) {
        descripcion
        imagen {
          url
        }
        categoria {
          nombre
        }
        precioCosto
        precioVenta
        productoSet {
          id
          numero
          color
          venta {
            id
          }
          areaVenta {
            nombre
          }
        }
      }
    }
`;

export const GRAFICO = `
    query {
      grafico {
        mes
        ventas
      }
    }
`;

export const INVENTARIO_AREA_VENTA = `
    query inventario_area_venta($id: ID!){
      inventarioAreaVenta( id: $id) {
        color
          id
          numero
          info {
            codigo
            descripcion
            precioCosto
            precioVenta
            categoria {
              nombre
            }
          }
      }
    }
`;
