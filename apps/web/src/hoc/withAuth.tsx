import React, { ComponentType, useContext, useEffect, useState } from 'react'
import { authenticate, UserContext } from '@panocreation/react-auth'
import { PageLoader } from '../components/PageLoader/PageLoader'
import { useNavigate } from 'react-router-dom'

const withAuth = <P extends object>(
    WrappedComponent: ComponentType<P>,
): React.FC<P> => {
    return (props) => {
        const { user, setUser } = useContext(UserContext)
        const [loading, setLoading] = useState(true)
        const [isAuthenticated, setIsAuthenticated] = useState(false)
        const navigate = useNavigate()

        useEffect(() => {
            async function auth() {
                const res = await authenticate(user)
                setUser(res)
                setIsAuthenticated(!!res)
                setLoading(false)

                if (!res) {
                    navigate('/login')
                }
            }

            void auth()
        }, [user, setUser, navigate])

        if (loading) {
            return <PageLoader text="Bitte warten..." />
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null
    }
}

export default withAuth
