import { gql } from "@apollo/client";

export const Me = gql`
  query allUsers {
    me {
      id
      email
    }
  }
`;