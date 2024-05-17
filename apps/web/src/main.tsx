import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { UserProvider } from '@panocreation/react-auth'
import { DefaultTheme } from './config/theme'
import { MessageProvider } from './contexts/MessageContext'
import App from './App'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={DefaultTheme}>
            <UserProvider>
                <MessageProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CssBaseline />
                    <App />
                    </LocalizationProvider>
                </MessageProvider>
            </UserProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
