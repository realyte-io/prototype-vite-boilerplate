import { FC } from 'react'
import { useFormikContext } from 'formik'
import { TextFieldProps } from '@mui/material'
import { TextField } from './TextField'
import { getFormikInputParams } from '../../../helper/getFormikInputParams'

type Props = TextFieldProps & NonNullable<unknown>

export const FormikTextField: FC<Props> = ({ ...rest }) => {
    const formik = useFormikContext()

    if (!formik) {
        throw Error('Formik context is required!')
    }

    const id = rest.id || rest.name || ''
    const { error, showError, value, handleChange, handleBlur } =
        getFormikInputParams(formik, id)

    return (
        <TextField
            fullWidth
            showError={showError}
            errorMessage={error?.toString()}
            value={value || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            {...rest}
        />
    )
}
