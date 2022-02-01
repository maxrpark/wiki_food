import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './../components/Card';
import axios from 'axios';
const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

function Categories() {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    window.scrollTo(0, 0);
    const response = await axios(url);
    const data = await response.data.categories;

    if (data != null) {
      const listOfCategories = data.map((food) => {
        const {
          idCategory: id,
          strCategory: name,
          strCategoryThumb: img,
          strCategory: param,
        } = food;
        return { id, name, img, param };
      });
      setCategories(listOfCategories);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (categories.length) {
    return (
      <div className='section-center'>
        <h1 className='categories-title'>Categories</h1>
        <div className='card-container'>
          <section>
            {categories.map((card) => {
              return (
                <Link key={card.id} to={`/category/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <main className='section-center'>
        <div className='loading'>
          <div className='spinner'></div>
        </div>
      </main>
    );
  }
}

export default Categories;
