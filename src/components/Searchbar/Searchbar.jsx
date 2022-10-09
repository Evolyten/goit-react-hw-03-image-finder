import React from 'react';
import { Header } from './Searchbar.module';
import toast from 'react-hot-toast';

export const SearchBar = ({ submitForm }) => {
  function takeDataFromForm(e) {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    if (name) {
      submitForm(name);
    } else toast.error('No matches for this query.');
    e.target.reset();
  }

  return (
    <Header>
      <form onSubmit={takeDataFromForm}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </Header>
  );
};
