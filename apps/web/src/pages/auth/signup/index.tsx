import { Registration } from '@panocreation/react-auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageContext from '../../../contexts/MessageContext'
import { Logo } from '../../../components/Logo/Logo'

export default function SignupPage() {
    const navigate = useNavigate()
    const { setMessage } = useContext(MessageContext)

    const handleError = (error?: string) => {
        setMessage({
            open: true,
            type: 'error',
            content: error,
        })
    }

    return (
        <Registration
            onSuccess={() => navigate('/signup/confirm')}
            onError={handleError}
            onLoginClick={() => navigate('/login')}
            logo={<Logo />}
        />
    )
}
