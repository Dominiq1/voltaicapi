import { gql } from '@apollo/client';

const ADD_VAN = gql`
  mutation addVan($licensePlate: String!, $statusFill: String) {
    addVan(licensePlate: $licensePlate, statusFill: $statusFill) {
      id
      licensePlate
      statusFill
    }
  }
`;

export  {ADD_VAN};
