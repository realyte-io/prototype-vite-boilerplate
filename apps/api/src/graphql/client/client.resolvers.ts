import { Context } from '../../context'

const clientResolvers = {
    Query: {
        getAllClients: (_, _args, context: Context) => {
            return context.prisma.client.findMany()
        },
    },
    Mutation: {
        createClient: async (_, { input }, context: Context) => {
            return context.prisma.client.create({
                data: {
                    email: input.email,
                    phone: input.phone,
                    firstname: input.firstname,
                    lastname: input.lastname,
                },
            })
        },
        updateClient: async (_, { id, input }, context) => {
            return context.prisma.client.update({
                where: { id },
                data: {
                    email: input.email || undefined,
                    phone: input.phone || undefined,
                    firstname: input.firstname || undefined,
                    lastname: input.lastname || undefined,
                },
            })
        },
        deleteClient: async (_, { id }, context) => {
            return context.prisma.client.delete({
                where: { id },
            })
        },
    },
}

export default clientResolvers
