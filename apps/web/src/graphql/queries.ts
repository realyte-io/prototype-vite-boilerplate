import { gql } from '@apollo/client'

export const GET_CLIENTS = gql`
    query getAllClients {
        getAllClients {
            id
            email
        }
    }
`
