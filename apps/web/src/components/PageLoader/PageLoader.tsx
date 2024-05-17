import { CircularProgress, alpha, styled, useTheme } from '@mui/material'
import { FC } from 'react'

const Wrapper = styled('div')(() => ({
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: 8,
}))

const Text = styled('div')(() => ({
    textAlign: 'center',
    width: 300,
    position: 'fixed',
    left: 'calc(50% - 150px);',
    top: 'calc(50% + 35px);',
}))

interface PageLoaderProps {
    text?: string
    noOverlay?: boolean
}

export const PageLoader: FC<PageLoaderProps> = ({ text, noOverlay }) => {
    const { palette } = useTheme()

    return (
        <Wrapper
            sx={{
                background: noOverlay
                    ? 'transparent'
                    : alpha(palette.common.white, 0.9),
            }}
        >
            <CircularProgress
                sx={{
                    position: 'fixed',
                    left: 'calc(50% - 20px);',
                    top: 'calc(50% - 20px);',
                }}
            />
            {text && <Text>{text}</Text>}
        </Wrapper>
    )
}
