import { useFormikContext, Field } from 'formik'
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    FormHelperText,
} from '@mui/material'
import { SelectOption } from './SelectField'
import { getFormikInputParams } from '../../../helper/getFormikInputParams'

interface FormikSelectFieldProps {
    name: string
    label: string
    options: SelectOption[]
}

export const FormikSelectField = ({
    name,
    options,
    label,
}: FormikSelectFieldProps) => {
    const formik = useFormikContext()

    if (!formik) {
        throw Error('Formik context is required!')
    }

    const { error, showError, value, handleChange } = getFormikInputParams(
        formik,
        name,
    )

    return (
        <FormControl variant="filled" fullWidth error={showError}>
            <InputLabel>{label}</InputLabel>
            <Field
                as={Select}
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Box
                                component="span"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                marginRight={2}
                            >
                                {option.label}
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Field>
            {showError && (
                <FormHelperText error>{error as string}</FormHelperText>
            )}
        </FormControl>
    )
}
