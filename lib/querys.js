// TODO: Eliminar las queries

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
