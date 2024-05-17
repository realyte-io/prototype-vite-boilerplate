import * as Yup from 'yup'

export const initialValues = {
    textField: '',
    selectField: '',
    dateField: '',
}

export const validationSchema = Yup.object().shape({
    textField: Yup.string()
        .min(2, 'Bitte tragen Sie mindestens 2 Zeichen ein')
        .required('Bitte tragen Sie Ihren Vornamen ein'),
    selectField: Yup.string()
        .min(3, 'Bitte tragen Sie mindestens 3 Zeichen ein')
        .required('Bitte tragen Sie Ihren Nachnamen ein'),
    dateField: Yup.string().required(),
})

export type FormValues = Yup.InferType<typeof validationSchema>
