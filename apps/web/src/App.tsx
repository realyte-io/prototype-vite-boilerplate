import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/auth/login'
import SignupPage from './pages/auth/signup'
import ForgotPasswordPage from './pages/auth/forgot-password'
import CodeConfirmationPage from './pages/auth/signup/confirm'
import Layout from './components/Layout/Layout'
import BasicFormPage from './pages/form'
import CompanySignupPage from './pages/auth/signup/company'

const routes = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/forms',
                element: <BasicFormPage />,
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/signup/confirm',
        element: <CodeConfirmationPage />,
    },
    {
        path: '/signup/:id',
        element: <CompanySignupPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
])

export default function App() {
    return <RouterProvider router={routes} />
}
