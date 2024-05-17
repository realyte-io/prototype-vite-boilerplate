import { createTheme, PaletteOptions } from '@mui/material'
import { Components } from '@mui/material/styles'

declare module '@mui/material/styles' {
    // Allow configuration using `createTheme`
    // eslint-disable-next-line no-unused-vars
    interface ThemeOptions {
        status?: {
            positive: string
            warning: string
            error: string
            info: string
            blocked: string
            default: string
        }
        common?: {
            black: string
            white: string
        }
    }
}

const DefaultPaletteOverrides: PaletteOptions = {
    mode: 'light',
    common: {
        white: '#fff',
        black: '#000',
    },
    text: {
        primary: '#080B0F',
    },
    primary: {
        main: '#CAF53F',
    },
    secondary: {
        main: '#0CC685',
    },
    error: {
        main: '#D83F3E',
    },
    success: {
        main: '#27DC9D',
    },
    warning: {
        main: '#EFE72E',
    },
    info: {
        main: '#3EA1D8',
    },
    background: {
        default: '#fff',
        paper: '#FAFAFA',
    },
    grey: {
        800: '#080B0F', // Grey 08
        700: '#212327', // Grey 07
        600: '#37393D', // Grey 06
        500: '#686C73', // Grey 05
        400: '#9C9FA5', // Grey 04
        300: '#D2D3D6', // Grey 03
        200: '#ECEDEE', // Grey 02
        100: '#FAFAFA', // Grey 01
    },
}

export const globalStyles = {
    body: {
        maxHeight: '100vh',
        overFlowY: 'scroll',
        fontWeight: 'normal',
        fontSize: '16px',
        color: DefaultPaletteOverrides.text?.primary,
        backgroundColor: DefaultPaletteOverrides?.background?.default,
    },
    a: {
        color: 'inherit',
        textDecoration: 'none',
    },
    button: {
        '&:focus': {
            outline: 'none',
        },
    },
}

const DefaultComponentOverrides: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            ...globalStyles,
        },
    },
    MuiButton: {
        defaultProps: {
            variant: 'contained',
        },
        styleOverrides: {
            root: {
                fontSize: 16,
                letterSpacing: '0.15px',
                lineHeight: '24px',
                padding: '10px 24px',
            },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                background: DefaultPaletteOverrides.background?.default,
            },
        },
    },
}

export const DefaultTheme = createTheme({
    components: DefaultComponentOverrides,
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 950,
            lg: 1280,
            xl: 1920,
        },
    },

    typography: {
        htmlFontSize: 14,
        fontSize: 14,
        fontFamily: 'Poppins',
        h1: {
            fontSize: 96,
        },
        h2: {
            lineHeight: '52px',
            fontSize: 48,
        },
        h3: {
            lineHeight: '52px',
            fontSize: 28,
        },
        h4: {
            lineHeight: '40px',
            fontSize: 36,
        },
        h5: {
            lineHeight: '36px',
            fontSize: 28,
        },
        h6: {
            lineHeight: '24px',
            fontSize: 22,
        },
        subtitle1: {
            textTransform: 'uppercase',
            lineHeight: '24px',
            letterSpacing: '0.15px',
            fontSize: 16,
            color: DefaultPaletteOverrides?.grey?.[400],
        },
        subtitle2: {
            textTransform: 'uppercase',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            fontSize: 14,
        },
        body1: {
            letterSpacing: '0.25px',
            lineHeight: '20px',
            fontSize: 14,
        },
        body2: {
            letterSpacing: '0.4px',
            lineHeight: '16px',
            fontSize: 12,
        },
        caption: {
            lineHeight: 1.5,
            fontSize: 11,
            color: DefaultPaletteOverrides?.grey?.[400],
        },
    },
    palette: { ...DefaultPaletteOverrides },
    status: {
        positive: '#27DC9D',
        warning: '#EFE72E',
        error: '#D83F3E',
        info: '#3EA1D8',
        blocked: '#1A1A1A',
        default: '#424242',
    },
})
