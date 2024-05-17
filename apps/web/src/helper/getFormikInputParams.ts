import { FormikErrors, FormikProps } from 'formik'
import get from 'lodash.get'
import noop from 'lodash.noop'

type FormikInputParams = {
    error?:
        | string
        | false
        | FormikErrors<unknown>
        | string[]
        | FormikErrors<unknown>[]
    touched: boolean
    showError: boolean
    value: unknown
    checked: boolean
    handleChange: FormikProps<unknown>['handleChange'] | typeof noop
    handleBlur: FormikProps<unknown>['handleBlur'] | typeof noop
}

export function getFormikInputParams(
    formik: FormikProps<unknown>,
    id: string,
): FormikInputParams {
    const error = get(formik, `errors.${id}`, false)
    const touched = get(formik, `touched.${id}`, false) as boolean
    const showError = touched && !!error
    const value = get(formik, `values.${id}`, '')
    const checked = !!get(formik, `values.${id}`, false)
    const handleChange = formik?.['handleChange'] || noop
    const handleBlur = formik?.['handleBlur'] || noop

    return {
        error,
        touched,
        showError,
        value,
        checked,
        handleChange,
        handleBlur,
    }
}
