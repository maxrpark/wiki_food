import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
const base_url = 'https://www.themealdb.com/api/json/v1/1/random.php';
const category_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const area_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

function RandomPage() {
  const [loading, setLoading] = useState(true);
  const [plate, setPlate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState({});

  // TODO fix rerender and useref

  const rerender = () => {
    const btn = document.querySelector('.random-menu');
    if (btn != null) {
      btn.addEventListener('click', () => {
        getData();
      });
    }
  };

  // random order
  const cardsInRandomOrder = (item) => {
    item.sort(function () {
      return 0.5 - Math.random();
    });
  };

  const getData = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    const response = await axios(`${base_url}`);
    const data = await response.data.meals;
    if (data.length) {
      const {
        idMeal: id,
        strMeal: name,
        strCategory: category,
        strMealThumb: img,
        strArea: area,
        strInstructions: instructions,
        strYoutube: link,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,
        strIngredient18,
        strIngredient19,
        strIngredient20,
      } = data[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,
        strIngredient18,
        strIngredient19,
        strIngredient20,
      ];
      const plateDetails = {
        id,
        name,
        img,
        ingredients,
        name,
        area,
        instructions,
        link,
        category,
      };
      document.title = `WikiFood || ${plateDetails.name}`;
      setPlate(plateDetails);
      setLoading(false);
    }
  };

  // related category
  const getRelatedCategory = async () => {
    if (plate !== null && loading == true) {
      const response = await axios(`${category_url}${plate.category}`);
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
        cardsInRandomOrder(listOfPlates);
        setCategories(listOfPlates.slice(0, 3));
        setLoading(false);
      }
    }
  };

  // related category
  const getRecommendByCountry = async () => {
    if (plate !== null && loading == true) {
      const response = await axios(`${area_url}${plate.area}`);
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
        cardsInRandomOrder(listOfPlates);
        setCountry(listOfPlates.slice(0, 3));
      }
    }
  };

  useEffect(() => {
    getData();
    rerender();
    return () => {
      setState({}); // This worked for me
    };
  }, []);
  useEffect(() => {
    getRecommendByCountry();
    getRelatedCategory();
  }, [plate]);

  if (!loading) {
    const { id, name, img, ingredients, area, instructions, link, category } =
      plate;
    return (
      <main className='section-center food-page'>
        {/* single food */}
        <section className='single-food'>
          <div className='section-title'>
            <h1>{name}</h1>
            <div className='single-food-tags'>
              <Link to={`/category/${category}`}>{category}</Link>
              <Link to={`/country/${area}`}>{area}</Link>
            </div>
          </div>
          <div className='single-food-details'>
            <div className='details-top'>
              <img src={img} alt='' />
              <div className='ingredients-list'>
                <h3>Ingredients</h3>
                <div className='ingredients'>
                  {ingredients.map((item, index) => {
                    return item ? (
                      <p className='single-ingredient' key={index}>
                        {item}
                      </p>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            <div className='instructions'>
              <h2>Instructions</h2>
              <p>{instructions}</p>
            </div>
          </div>
        </section>
        {/* single food */}

        {/* category */}
        <section className='recommended-section-container'>
          <div className='section-title'>
            <h2>Recommend {category} food</h2>
            <Link to={`/category/${category}`}>See all</Link>
          </div>
          <div className='related-section'>
            {categories.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </div>
        </section>
        {/* area */}
        <section className='recommended-section-container'>
          <div className='section-title'>
            <h2>Recommend {area} food</h2>
            <Link to={`/country/${area}`}>See all</Link>
          </div>
          <div className='related-section'>
            {country.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </div>
        </section>
      </main>
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

export default RandomPage;
