// TODO : Eliminar las queries

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
