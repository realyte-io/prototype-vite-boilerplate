import React, { createContext, useState } from 'react'
import { Button, Slide, SlideProps, Snackbar } from '@mui/material'
import { Alert, AlertProps } from '@mui/material'

type Message = {
    content?: string
    type?: AlertProps['severity']
    open: boolean
}

interface MessageValues {
    // eslint-disable-next-line no-unused-vars
    setMessage: (message: Message | null) => void
}

const MessageContext = createContext<MessageValues>({
    setMessage: () => {},
})

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />
}
interface MessageProviderProps {
    children: React.ReactNode
}

export const MessageProvider: React.FunctionComponent<MessageProviderProps> = ({
    children,
}) => {
    const [message, setMessage] = useState<Message | null>(null)

    const handleClose = () => {
        setMessage({ ...message, open: false })
    }

    return (
        <MessageContext.Provider value={{ setMessage }}>
            <Snackbar
                open={message?.open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={SlideTransition}
                onClose={handleClose}
            >
                <Alert
                    variant="filled"
                    severity={message?.type || 'info'}
                    action={
                        <Button
                            size="small"
                            onClick={handleClose}
                            color="inherit"
                        >
                            OK
                        </Button>
                    }
                >
                    {message?.content}
                </Alert>
            </Snackbar>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContext
