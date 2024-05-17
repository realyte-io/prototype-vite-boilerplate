import { Menu, MenuItem, styled, Typography } from '@mui/material'
import { MouseEvent, useContext, useState } from 'react'
import { UserContext } from '@panocreation/react-auth'
import { useNavigate } from 'react-router-dom'

const Circle = styled('div')(({ theme }) => ({
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 100,
    width: theme.spacing(5),
    height: theme.spacing(5),
    textAlign: 'center',
    cursor: 'pointer',
}))

export function ProfileImage() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleUserMenu = (e: MouseEvent<HTMLElement>) => {
        setAnchorElUser(anchorElUser ? null : e.currentTarget)
    }

    const handleLogoutClick = (e: MouseEvent<HTMLElement>) => {
        handleUserMenu(e)
        localStorage.removeItem('userAuth')
        setUser(null)
        navigate('/login')
    }

    return (
        <>
            <Circle onClick={handleUserMenu}>
                <Typography sx={{ lineHeight: '38px', fontSize: 16 }}>
                    {user?.given_name?.[0] || ''}
                    {user?.family_name?.[0] || ''}
                </Typography>
            </Circle>
            <Menu
                sx={{ mt: 1 }}
                autoFocus={false}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleUserMenu}
            >
                <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Abmelden</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}
