import { Form, Formik } from 'formik'
import { FormValues, initialValues, validationSchema } from './formik.config'
import { Button, Stack } from '@mui/material'
import { FormikTextField } from '../../components/FormElements/TextField'
import { FormikDatePicker } from '../../components/FormElements/DatePicker'
import { FormikSelectField } from '../../components/FormElements/SelectField/FormikSelectField'

export default function BasicFormPage() {
    const handleSubmit = (values: FormValues) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={handleSubmit}
        >
            <Form>
                <Stack spacing={2}>
                    <FormikTextField name="textField" label="Textfield *" />
                    <FormikSelectField
                        name="selectField"
                        label="Selectfield *"
                        options={[{ label: 'Option 1', value: 'option1' }]}
                    />
                    <FormikDatePicker name="dateField" label="Datefield *" />
                    <Button type="submit">Speichern</Button>
                </Stack>
            </Form>
        </Formik>
    )
}
