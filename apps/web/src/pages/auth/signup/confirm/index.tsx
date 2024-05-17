import { CodeConfirmation } from '@panocreation/react-auth'
import { useContext } from 'react'
import MessageContext from '../../../../contexts/MessageContext'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../../../components/Logo/Logo'

export default function CodeConfirmationPage() {
    const { setMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    const handleError = (message?: string) => {
        setMessage({
            open: true,
            content: message,
            type: 'error',
        })
    }

    const handleSuccess = () => {
        setMessage({
            open: true,
            content: 'Die E-Mail Adresse wurde erfolgreich verifiziert!',
            type: 'success',
        })

        navigate('/login')
    }

    return (
        <CodeConfirmation
            onSuccess={handleSuccess}
            onError={handleError}
            onLoginClick={() => navigate('/login')}
            logo={<Logo />}
        />
    )
}
