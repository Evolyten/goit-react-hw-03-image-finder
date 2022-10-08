import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Header } from './Searchbar.module';
import * as Yup from 'yup';

const userData = {
  name: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Pls enter any request'),
});

export const SearchBar = ({ submitForm }) => {
  const handleSubmit = (values, { resetForm }) => {
    submitForm(Object.values(values));
    resetForm();
  };

  return (
    <Header>
      <Formik
        initialValues={userData}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <button type="submit">
            <span>Search</span>
          </button>

          <Field
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage component="div" name="name" />
        </Form>
      </Formik>
    </Header>
  );
};
