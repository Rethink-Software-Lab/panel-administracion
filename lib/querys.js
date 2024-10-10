// TODO : Eliminar las queries

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
