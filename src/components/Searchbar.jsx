import styles from './Serchbar.module.css';
import React, { Component, useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');
  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.info('🦄 Введите названия изображения', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onSubmit(imageName);
  };
  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <FaBeer></FaBeer>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
