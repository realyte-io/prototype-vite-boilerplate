import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model'
import { APIGatewayEvent } from 'aws-lambda'

const verifier = CognitoJwtVerifier.create({
    tokenUse: 'access',
    userPoolId: process.env.cognito_user_pool_id,
    clientId: process.env.cognito_user_pool_client_id,
})

export async function authenticateUser(
    event: APIGatewayEvent,
): Promise<CognitoAccessTokenPayload | null> {
    const token =
        event.headers?.['Authorization'] || event.headers?.authorization

    if (token) {
        try {
            return await verifier.verify(token)
        } catch (e) {
            console.error('Token is not valid!')
        }
    }

    return null
}
