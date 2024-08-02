import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { UserProvider } from '@panocreation/react-auth'
import { DefaultTheme } from './config/theme'
import { MessageProvider } from './contexts/MessageContext'
import App from './App'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { getAccessToken } from './helper/localStorage'

const client = new ApolloClient({
    uri: process.env.graphql_api_url,
    headers: {
        Authorization: getAccessToken(),
    },
    cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
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
        </ApolloProvider>
    </React.StrictMode>,
)
