import React from 'react'
import { TextField as MuiTextField, TextFieldProps } from '@mui/material'

type Props = TextFieldProps & {
    showError?: boolean
    errorMessage?: string
}

export const TextField: React.FunctionComponent<Props> = ({
    showError,
    errorMessage,
    value,
    onChange,
    onBlur,
    ...rest
}) => {
    return (
        <MuiTextField
            variant="filled"
            error={showError}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
            helperText={showError ? errorMessage : ''}
        />
    )
}
