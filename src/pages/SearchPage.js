import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

// components
import Card from './../components/Card';
import Form from './../components/Form';
import Loader from './../components/Loader';

const base_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function Category() {
  const [loading, setLoading] = useState(true);
  const { id: search } = useParams();
  const [plate, setPlate] = useState([]);

  const getData = async () => {
    setLoading(true);
    const response = await axios(`${base_url}${search}`);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    document.title = `WikiFoo || ${search}`;
    getData();
  }, [, search]);

  if (!loading) {
    // const { id, name, img, description } = searchResult;
    return (
      <main className='section-center'>
        <Form />
        <h1 className='result-title'>Result for : {search}</h1>
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
