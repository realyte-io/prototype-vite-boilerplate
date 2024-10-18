import { LoginWithTempPassword } from '@panocreation/react-auth'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageContext from '../../../../contexts/MessageContext'
import { Logo } from '../../../../components/Logo/Logo'

export default function CompanySignupPage() {
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
        <LoginWithTempPassword
            onSuccess={() => navigate('/login')}
            onError={handleError}
            logo={<Logo />}
        />
    )
}
