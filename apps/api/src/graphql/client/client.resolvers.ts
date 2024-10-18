import { Context } from '../../context'
import { inviteUser } from '../../auth'

const clientResolvers = {
    Query: {
        getAllClients: async (_, _args, context: Context) => {
            const companyId = (await context.user).companyId

            return context.prisma.client.findMany({
                where: { companyId },
            })
        },
    },
    Mutation: {
        inviteUser: async (_, { email }, context: Context) => {
            const companyId = (await context.user).companyId
            return inviteUser(email, companyId)
        },
        createClient: async (_, { input }, context: Context) => {
            const user = await context.user

            return context.prisma.client.create({
                data: {
                    email: input.email,
                    phone: input.phone,
                    firstname: input.firstname,
                    lastname: input.lastname,
                    companyId: user.companyId,
                },
            })
        },
        updateClient: async (_, { id, input }, context) => {
            const companyId = (await context.user).companyId

            return context.prisma.client.update({
                where: { id, companyId },
                data: {
                    email: input.email || undefined,
                    phone: input.phone || undefined,
                    firstname: input.firstname || undefined,
                    lastname: input.lastname || undefined,
                },
            })
        },
        deleteClient: async (_, { id }, context) => {
            const companyId = (await context.user).companyId

            return context.prisma.client.delete({
                where: { id, companyId },
            })
        },
    },
}

export default clientResolvers
