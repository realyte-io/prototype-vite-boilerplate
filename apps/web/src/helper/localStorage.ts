export function getAccessToken() {
    const userAuth = localStorage.getItem('userAuth')

    if (userAuth) {
        return JSON.parse(userAuth).AccessToken
    }

    return null
}
