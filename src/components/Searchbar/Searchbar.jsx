import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { ErrMessage, Header, SearchForm, SearchFormButton, SearchFormIcon, SearchFormInput } from './Searchbar.styled';

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
    <Header>
      <Formik
        initialValues={initialValues}
        validationSchema={SearchbarSchema}
        onSubmit={handleSubmit}
      >
        <SearchForm>
          <SearchFormButton type="submit">
              <SearchFormIcon />
          </SearchFormButton>
          <label>
            <SearchFormInput
              name="searchQuery"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            ></SearchFormInput>
          </label>
          <ErrMessage name="searchQuery" component="div" />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
