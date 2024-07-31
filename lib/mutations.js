import gql from 'graphql-tag';

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

export const ADD_USER = `
  mutation ADDUser($username: String!, $password: String!, $rol: String!, $areaVenta: ID) {
    addUser(username: $username, password: $password, rol: $rol, areaVenta: $areaVenta) {
      user {
        id
      }
    }
  }
`;

export const EDIT_USER = `
  mutation edit_user($id: ID!, $username: String!, $password: String!, $rol: String!, $areaVenta: ID) {
    updateUser(id: $id, username: $username, password: $password, rol: $rol, areaVenta: $areaVenta) {
      user {
        id
      }
    }
  }
`;

export const DELETE_USER = `
  mutation delete_user($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;

export const DELETE_PRODUCT_INFO = `
  mutation delete_product_info($id: ID!) {
    deleteProductoInfo(id: $id) {
      message
    }
  }
`;

export const ADD_PRODUCT_INFO = `
  mutation add_product_info(
    $codigo: String!
    $descripcion: String!
    $categoria: String!
    $precioCosto: Decimal!
    $precioVenta: Decimal!
    $imagen: Upload
  ) {
    addProductoInfo(
      codigo: $codigo
      descripcion: $descripcion
      categoria: $categoria
      precioCosto: $precioCosto
      precioVenta: $precioVenta
      imagen: $imagen
    ) {
      productoInfo {
        id
      }
    }
  }
`;

export const UPDATE_PRODUCT_INFO = `
  mutation update_product_info(
    $id: ID!
    $codigo: String!
    $descripcion: String!
    $categoria: String!
    $precioCosto: Decimal!
    $precioVenta: Decimal!
    $imagen: Upload
  ) {
    updateProductoInfo(
      id: $id
      codigo: $codigo
      imagen: $imagen
      descripcion: $descripcion
      categoria: $categoria
      precioCosto: $precioCosto
      precioVenta: $precioVenta
    ) {
      productoInfo {
        id
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

export const ADD_SALIDA = `
  mutation add_salida(
    $productos: [ID]!
    $areaVenta: ID!
  ) {
    addSalida(productos: $productos, areaVenta: $areaVenta) {
      salidaAlmacen {
        id
      }
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

export const DELETE_SALIDA = `
  mutation delete_salida($id: ID!) {
    deleteSalida(id: $id) {
      message
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

export const ADD_VENTA = `
  mutation add_venta(
    $productos: [ID]!
    $areaVenta: ID!
    $metodoPago: String!
  ) {
    addVenta(productos: $productos, areaVenta: $areaVenta, metodoPago: $metodoPago) {
      ventas {
        id
      }
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
