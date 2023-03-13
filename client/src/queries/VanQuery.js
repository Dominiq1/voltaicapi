import { gql } from '@apollo/client';

const GET_VAN = gql`
  query GetVan($id: ID!) {
    Van(id: $id) {
      id
      licensePlate
      statusFill
    }
  }
`;


export { GET_VAN };