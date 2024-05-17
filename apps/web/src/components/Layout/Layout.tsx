import { styled } from '@mui/material'
import Navigation from '../Navigation/Navigation'
import withAuth from '../../hoc/withAuth'
import { Outlet } from 'react-router-dom'

const ContentWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(3),
}))

function AppLayout() {
    return (
        <section>
            <Navigation />
            <ContentWrapper><Outlet /></ContentWrapper>
        </section>
    )
}

export default withAuth(AppLayout)
