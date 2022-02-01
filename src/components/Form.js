import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const base_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function Form() {
  const value = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleClick = async (e, value) => {
    e.preventDefault();
    let inputValue = value.current.value;
    if (inputValue.length) {
      try {
        const response = await axios(`${base_url}${inputValue}`);
        const data = await response.data.meals;
        if (data) {
          navigate(`/search/${inputValue}`, { replace: false });
        } else {
          setError('No menu with that name');
          value.current.value = '';
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError('Please enter value');
      value.current.value = '';
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  return (
    <div className='form-container'>
      <h3>Search a menu</h3>
      <form
        autocomplete='off'
        onSubmit={(e) => {
          handleClick(e, value);
        }}
        className='form'
      >
        <input
          placeholder='e.g. pizza'
          type='text'
          name='value'
          id=''
          ref={value}
        />
      </form>
      <div className='error'>{error && <p>{error}</p>}</div>
    </div>
  );
}

export default Form;
