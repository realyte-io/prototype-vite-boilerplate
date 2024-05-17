'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import { ProfileImage } from '../ProfileImage/ProfileImage'
import { Logo } from '../Logo/Logo'

export default function Navigation() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Logo shrink={1.5} />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Stack direction="row" spacing={2}>
                        <ProfileImage />
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
