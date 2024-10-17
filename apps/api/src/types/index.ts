import { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model'

export interface User extends CognitoAccessTokenPayload {
    companyId: string
}
