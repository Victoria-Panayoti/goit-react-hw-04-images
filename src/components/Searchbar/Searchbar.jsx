import { Field, Form, Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const initialValues = {
  searchQuery: '',
};
const SearchbarSchema = Yup.object().shape({
  searchQuery: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('What would you like to find?'),
});
export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchbarSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <button type="submit">Search</button>
        <label>
          <Field
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></Field>
        </label>
        <ErrorMessage name="searchQuery"  component="div"/>
      </Form>
    </Formik>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
