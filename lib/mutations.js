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
