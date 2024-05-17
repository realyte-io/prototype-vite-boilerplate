import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'

export type SelectOption = {
    value: string | number
    label: string
    disabled?: boolean
}

interface SelectFieldProps {
    onChange: (e: SelectChangeEvent) => void
    options: SelectOption[]
    value: string | number | null
    name: string
    label: string
    disabled?: boolean
}

export function SelectField({
    onChange,
    options,
    value,
    name,
    label,
    disabled,
}: SelectFieldProps) {
    return (
        <FormControl fullWidth variant="filled" disabled={disabled}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                id={name}
                value={value ? value.toString() : undefined}
                label={label}
                onChange={onChange}
            >
                {options?.map((option) => (
                    <MenuItem
                        key={option?.value}
                        value={option?.value}
                        disabled={option?.disabled}
                    >
                        {option?.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
