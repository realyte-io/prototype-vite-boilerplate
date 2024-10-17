import { PrismaClient } from '@prisma/client'
import { authenticateUser } from './auth'
import { User } from './types'

const prisma = new PrismaClient()

export interface Context {
    prisma: PrismaClient
    user: Promise<User>
}

export const context = ({ event, req }): Context => {
    return { prisma, user: authenticateUser(event || req) }
}
