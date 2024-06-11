import { mergeSchemas } from 'graphql-yoga'
import { readFileSync } from 'fs'
import { join } from 'path'

const clientTypeDefs = readFileSync(
    join(__dirname, 'graphql/client/client.schema.graphql'),
    'utf8',
)

import clientResolvers from './graphql/client/client.resolvers'

const schema = mergeSchemas({
    typeDefs: [clientTypeDefs],
    resolvers: [clientResolvers],
})

export default schema
