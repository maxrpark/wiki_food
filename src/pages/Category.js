import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

// components
import Card from './../components/Card';
import Loader from './../components/Loader';

const base_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

function Category() {
  const { id: category } = useParams();
  const [plate, setPlate] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState([]);

  const getCategoryInfo = async () => {
    window.scrollTo(0, 0);
    const mainCategory = category;
    try {
      const response = await axios(url);
      const data = response.data.categories;
      const singleCategory = data.filter(
        (category) => category.strCategory === mainCategory
      );
      const {
        idCategory: id,
        strCategory: name,
        strCategoryThumb: img,
        strCategoryDescription: description,
      } = singleCategory[0];
      const categoryDetails = { id, name, img, description };
      setCategoryInfo(categoryDetails);
      document.title = `WikiFood || ${category}`;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const response = await axios(`${base_url}${category}`);
    const data = await response.data.meals;
    if (data != null) {
      const listOfPlates = data.map((food) => {
        const {
          idMeal: id,
          strMeal: name,
          strMealThumb: img,
          idMeal: param,
        } = food;
        return { id, img, name, param };
      });
      setPlate(listOfPlates);
    }
  };
  useEffect(() => {
    getData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    getCategoryInfo(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (plate.length) {
    const { name, img, description } = categoryInfo;
    return (
      <main className='section-center'>
        <header className='category-header'>
          <div className='info'>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          <img src={img} alt='' />
        </header>
        <div className='card-container'>
          <section>
            {plate.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>
        </div>
      </main>
    );
  } else {
    return (
      <main className='section-center'>
        <div className='loading'>
          <Loader />
        </div>
      </main>
    );
  }
}

export default Category;
