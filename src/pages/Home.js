import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './../components/Card';
import Form from './../components/Form';
import axios from 'axios';
const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;

function Home() {
  const [isloading, setIsLoading] = useState(true);
  const [categoryOne, setCategoryOne] = useState([]);
  const [categoryTwo, setCategoryTwo] = useState([]);
  const [categoryThree, setCategoryThree] = useState([]);
  const [categoryFour, setCategoryFour] = useState([]);
  const [categoryFive, setCategoryFive] = useState([]);
  const [categorySix, setCategorySix] = useState([]);

  const categories = [
    'Breakfast',
    'Starter',
    'Beef',
    'Pasta',
    'Seafood',
    'Vegetarian',
  ];
  const states = [
    setCategoryOne,
    setCategoryTwo,
    setCategoryThree,
    setCategoryFour,
    setCategoryFive,
    setCategorySix,
  ];

  const getData = async (category, state) => {
    setIsLoading(true);
    const response = await axios(`${url}${category}`);
    const data = await response.data.meals;
    if (data != null) {
      const listOfFood = data.map((food) => {
        const {
          idMeal: id,
          strMeal: name,
          strMealThumb: img,
          idMeal: param,
        } = food;
        return { id, name, img, param };
      });
      state(listOfFood.slice(0, 3));
      setIsLoading(false);
    }
  };
  useEffect(() => {
    document.title = `WikiFood`;
    categories.forEach((category, index) => {
      getData(categories[index], states[index]);
    });
  }, []);
  if (isloading) {
    return (
      <main className='section-center'>
        <div className='loading'>
          <div className='spinner'></div>
        </div>
      </main>
    );
  } else {
    return (
      <main className='section-center'>
        <Form />
        {/* 'Breakfast' */}
        <div className='section-title'>
          <h2>{categories[0]}</h2>
          <Link to={`/category/${categories[0]}`}>See all</Link>
        </div>
        <div className='card-container'>
          <section>
            {categoryOne.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>

          {/* 'Starter',  */}
          <div className='section-title'>
            <h2>{categories[1]}</h2>
            <Link to={`/category/${categories[1]}`}>See all</Link>
          </div>
          <section>
            {categoryTwo.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>

          {/* 'Beef'  */}
          <div className='section-title'>
            <h2>{categories[2]}</h2>
            <Link to={`/category/${categories[2]}`}>See all</Link>
          </div>
          <section>
            {categoryThree.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>
          {/* 'Pasta' */}
          <div className='section-title'>
            <h2>{categories[3]}</h2>
            <Link to={`/category/${categories[3]}`}>See all</Link>
          </div>
          <section>
            {categoryFour.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>
          {/* 'Seafood', */}
          <div className='section-title'>
            <h2>{categories[4]}</h2>
            <Link to={`/category/${categories[4]}`}>See all</Link>
          </div>
          <section>
            {categoryFive.map((card) => {
              return (
                <Link key={card.id} to={`/single-plate/${card.param}`}>
                  <Card {...card} />
                </Link>
              );
            })}
          </section>
          <div className='section-title'>
            <h2>{categories[5]}</h2>
            <Link to={`/category/${categories[5]}`}>See all</Link>
          </div>
          <section>
            {/* 'vegan',*/}
            {categorySix.map((card) => {
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
  }
}

export default Home;
