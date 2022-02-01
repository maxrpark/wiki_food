import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './../components/Card';
const base_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const url_list = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

function Country() {
  const [loading, setLoading] = useState(true);
  const { id: country_name } = useParams();
  const [plate, setPlate] = useState([]);
  const [countriesList, setcountriesList] = useState([]);
  // const [categoryInfo, setCategoryInfo] = useState([]);

  const getCountryList = async () => {
    try {
      const response = await axios(url_list);
      const data = response.data.meals;
      setcountriesList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    const response = await axios(`${base_url}${country_name}`);
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
    getData();
    getCountryList();
  }, [, country_name]);

  if (!loading) {
    // const { id, name, img, description } = categoryInfo;
    return (
      <main className='section-center section-center-countries'>
        <h1>Countries</h1>
        <header className='country-header'>
          <div className='country-list'>
            {countriesList.map((country) => {
              const { strArea: area } = country;
              return (
                <div
                  key={area}
                  className={`${
                    area == country_name
                      ? 'single-food-tags selected-country'
                      : 'single-food-tags'
                  }`}
                >
                  <Link to={`/country/${area}`}>{area}</Link>
                </div>
              );
            })}
          </div>
        </header>
        <div className='card-container'>
          <h2 className='country-title'>{country_name} Food</h2>
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
          <div className='spinner'></div>
        </div>
      </main>
    );
  }
}

export default Country;
