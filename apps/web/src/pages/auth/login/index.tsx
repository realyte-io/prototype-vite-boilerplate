import { Login } from '@panocreation/react-auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageContext from '../../../contexts/MessageContext'
import { Logo } from '../../../components/Logo/Logo'

export default function LoginPage() {
    const navigate = useNavigate()
    const { setMessage } = useContext(MessageContext)

    const handleError = () => {
        setMessage({
            open: true,
            type: 'error',
            content: 'Anmeldung fehlgeschlagen',
        })
    }

    return (
        <Login
            onSuccess={() => navigate('/')}
            onError={handleError}
            onForgotPasswordClick={() => navigate('/forgot-password')}
            onRegistrationClick={() => navigate('/signup')}
            logo={<Logo />}
        />
    )
}
