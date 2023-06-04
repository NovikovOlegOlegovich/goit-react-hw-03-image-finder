import { Formik } from 'formik';
// import { TfiSearch } from 'react-icons/tfi';
import {
  SearchbarBox,
  SearchForm,
  SearchField,
  SearchFormButtonLabel,
  SearchFormButton,
} from './Searchbar.styled';

const initialValue = {
  searchWord: '',
};

export default function Searchbar({ onSubmit }) {
  const handleSubmit = ({ searchWord }, { resetForm }) => {
    onSubmit(searchWord);
    resetForm();
  };

  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      <SearchbarBox>
        <SearchForm>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchField
            name="searchWord"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarBox>
    </Formik>
  );
}
