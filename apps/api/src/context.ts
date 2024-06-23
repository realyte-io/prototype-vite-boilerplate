import { PrismaClient } from '@prisma/client'
import { authenticateUser } from './auth'
import { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model'

const prisma = new PrismaClient()

export interface Context {
    prisma: PrismaClient
    user: Promise<CognitoAccessTokenPayload>
}

export const context = ({ event }): Context => {
    return { prisma, user: authenticateUser(event) }
}
