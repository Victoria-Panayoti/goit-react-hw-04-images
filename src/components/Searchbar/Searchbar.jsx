import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  query:'',
}
const SearchbarSchema = Yup.object().shape({
  query: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required field!'),
});
export const Searchbar = ({onSubmit,isSubmitting}) => {
  const handleSubmit = (values, { resetForm }) => {
    resetForm();
    onSubmit(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchbarSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <button type="submit" disabled={isSubmitting}>Search</button>
        <label>
          <Field name="query" required />
          <ErrorMessage name="query" component="div" />
        </label>
      </Form>
    </Formik>
  );
};
