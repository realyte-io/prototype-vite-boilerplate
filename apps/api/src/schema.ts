import { readFileSync } from 'fs'
import { join } from 'path'
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLError } from 'graphql'

const authDirective = (next) => async (root, args, context, info) => {
    const user = await context.user
    console.log(user)

    if (!user?.sub) {
        throw new GraphQLError('Not authorized')
    }
    return next(root, args, context, info)
}

const clientTypeDefs = readFileSync(
    join(__dirname, 'graphql/client/client.schema.graphql'),
    'utf8',
)

import clientResolvers from './graphql/client/client.resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'

const executableSchema = makeExecutableSchema({
    typeDefs: [clientTypeDefs],
    resolvers: [clientResolvers],
})

const schema = mapSchema(executableSchema, {
    [MapperKind.ROOT_FIELD]: (fieldConfig) => {
        const publicDirective = getDirective(
            executableSchema,
            fieldConfig,
            'public',
        )?.[0]

        const { resolve = defaultFieldResolver } = fieldConfig
        if (!publicDirective) {
            fieldConfig.resolve = authDirective(resolve)
        }

        return fieldConfig
    },
})

export default schema
