import React from 'react'
import { useFormikContext } from 'formik'
import { TextFieldProps } from '@mui/material'
import { getFormikInputParams } from '../../../helper/getFormikInputParams'
import { DatePicker } from './DatePicker'

type Props = TextFieldProps & NonNullable<unknown>

export const FormikDatePicker: React.FunctionComponent<Props> = ({
    ...rest
}) => {
    const formik = useFormikContext()

    if (!formik) {
        throw Error('Formik context is required!')
    }

    const id = rest.id || rest.name || ''
    const { error, showError, value } = getFormikInputParams(formik, id)

    return (
        <DatePicker
            label={rest.label as string}
            showError={showError}
            errorMessage={error?.toString()}
            value={value ? new Date(value as string) : null}
            onChange={(date) => formik.setFieldValue(id, date)}
        />
    )
}
