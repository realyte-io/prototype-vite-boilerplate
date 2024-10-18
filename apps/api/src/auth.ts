import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { APIGatewayEvent } from 'aws-lambda'
import {
    CognitoIdentityProviderClient,
    GetUserCommand,
    AdminCreateUserCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { User } from './types'

const cognitoClient = new CognitoIdentityProviderClient({
    region: 'eu-central-1',
})

export async function authenticateUser(
    event: APIGatewayEvent,
): Promise<User | null> {
    const token =
        event.headers?.['Authorization'] || event.headers?.authorization

    if (token) {
        try {
            const command = new GetUserCommand({
                AccessToken: token,
            })

            const userData = await cognitoClient.send(command)
            const companyId = userData.UserAttributes.find(
                (attr) => attr.Name === 'custom:companyId',
            ).Value

            const verifier = CognitoJwtVerifier.create({
                tokenUse: 'access',
                userPoolId: process.env.cognito_user_pool_id || '',
                clientId: process.env.cognito_user_pool_client_id || '',
            })

            const verifierData = await verifier.verify(token)

            return {
                ...verifierData,
                companyId,
            }
        } catch (e) {
            console.error(e, 'Token is not valid!')
        }
    }

    return null
}

export async function inviteUser(
    email: string,
    companyId: string,
): Promise<string> {
    try {
        const command = new AdminCreateUserCommand({
            UserPoolId: process.env.cognito_user_pool_id || '',
            Username: email,
            DesiredDeliveryMediums: ['EMAIL'],
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'custom:companyId',
                    Value: companyId,
                },
                {
                    Name: 'email_verified',
                    Value: 'TRUE',
                },
            ],
        })

        await cognitoClient.send(command)

        return email
    } catch (e) {
        console.error(e, 'Invite User')
    }
}
