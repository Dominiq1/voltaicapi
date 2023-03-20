import { gql } from '@apollo/client';

const ADD_ORDER = gql`
  mutation addOrder(
    $orderId: String!,
    $itemName: String!,
    $itemDescription: String!,
    $itemImages:String!,
    $quantity: String!,
    $status: String!,
    $vanId: ID!
  ) {
    addOrder(
      orderId: $orderId,
      itemName: $itemName,
      itemDescription: $itemDescription,
      itemImages: $itemImages,
      quantity: $quantity,
      status: $status,
      vanId: $vanId
    ) {
      id
      orderId
      itemName
      itemDescription
      itemImages
      quantity
      status
      van {
        id
        licensePlate
      }
    }
  }
`;

export { ADD_ORDER };
