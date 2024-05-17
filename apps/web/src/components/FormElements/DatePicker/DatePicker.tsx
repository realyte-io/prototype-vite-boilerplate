import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import React from 'react'

type Props = {
    showError?: boolean
    errorMessage?: string
    onChange: (value: Date | null) => void
    value: Date | null
    label: string
    disabled?: boolean
}

export const DatePicker: React.FunctionComponent<Props> = ({
    showError,
    errorMessage,
    value,
    onChange,
    label,
    ...rest
}) => {
    return (
        <MuiDatePicker
            value={value || null}
            onAccept={onChange}
            label={label}
            onChange={onChange}
            slotProps={{
                textField: {
                    fullWidth: true,
                    variant: 'filled',
                    error: showError,
                    helperText: errorMessage === 'false' ? '' : errorMessage,
                    placeholder: '',
                    InputProps: { disableUnderline: true },
                },
            }}
            {...rest}
        />
    )
}
