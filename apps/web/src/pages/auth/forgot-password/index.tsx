import { ForgotPassword } from '@panocreation/react-auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageContext from '../../../contexts/MessageContext'
import { Logo } from '../../../components/Logo/Logo'

export default function ForgotPasswordPage() {
    const navigate = useNavigate()
    const { setMessage } = useContext(MessageContext)

    const handleError = (error?: string) => {
        setMessage({
            open: true,
            type: 'error',
            content: error,
        })
    }

    const handleSuccess = () => {
        setMessage({
            open: true,
            content: 'Das Kennwort wurde erfolgreich geändert!',
            type: 'success',
        })

        navigate('/login')
    }

    return (
        <ForgotPassword
            onSuccess={handleSuccess}
            onError={handleError}
            onLoginClick={() => navigate('/login')}
            logo={<Logo />}
        />
    )
}
