export const LOGIN = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        isStaff
        rol
        username
      }
    }
  }
`;

export const ADD_ENTRADA = `
  mutation add_entrada(
    $metodoPago: String!
    $productInfo: String!
    $proveedor: String!
    $comprador: String!
    $variantes: GenericScalar
    $cantidad: Int
  ) {
    addEntrada(
      metodoPago: $metodoPago
      productInfo: $productInfo
      proveedor: $proveedor
      variantes: $variantes
      comprador: $comprador
      cantidad: $cantidad
    ) {
      response {
        color
        numeros {
          numero
          ids
        }
      }
    }
  }
`;

export const DELETE_ENTRADA = `
  mutation delete_entrada($id: ID!) {
    deleteEntrada(id: $id) {
      message
    }
  }
`;

export const UPDATE_SALIDA = `
  mutation update_salida(
    $id: ID!
    $productos: [ID]!
    $areaVenta: ID!
  ) {
    updateSalida(
      id: $id
      productos: $productos
      areaVenta: $areaVenta
    ) {
      salidaAlmacen {
        id
      }
    }
  }
`;

export const ADD_AREA_VENTA = `
  mutation add_area_venta(
    $nombre: String!
    $color: String!
  ) {
    addAreaVenta(
      nombre: $nombre
      color: $color
    ) {
      areaVenta {
        id
      }
    }
  }
`;

export const UPDATE_AREA_VENTA = `
  mutation update_area_venta(
    $id: ID!,
    $nombre: String!
    $color: String!
  ) {
    updateAreaVenta(
      id: $id
      nombre: $nombre
       color: $color
    ) {
      areaVenta {
        id
      }
    }
  }
`;

export const DELETE_AREA_VENTA = `
  mutation delete_area_venta($id: ID!) {
    deleteAreaVenta(id: $id) {
      message
    }
  }
`;

export const UPDATE_VENTA = `
  mutation update_venta(
    $id: ID!
    $productos: [ID]!
    $areaVenta: ID!
    $metodoPago: String!
  ) {
    updateVenta(id: $id,productos: $productos, areaVenta: $areaVenta, metodoPago: $metodoPago) {
      ventas {
        id
      }
    }
  }
`;

export const DELETE_VENTA = `
  mutation delete_venta($id: ID!) {
    deleteVenta(id: $id) {
      message
    }
  }
`;
