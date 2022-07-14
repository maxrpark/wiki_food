import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

// components

import { CardeSection, Loader } from "../components";

const base_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const category_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const area_url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";

function SinglePlate() {
    const [loading, setLoading] = useState(true);
    const [plate, setPlate] = useState(null);
    const [categories, setCategories] = useState([]);
    const [country, setCountry] = useState([]);
    const { id } = useParams();

    // random order
    const cardsInRandomOrder = (item) => {
        item.sort(function () {
            return 0.5 - Math.random();
        });
    };

    const getData = async () => {
        window.scrollTo(0, 0);
        setLoading(true);
        const response = await axios(`${base_url}${id}`);
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
                area,
                instructions,
                link,
                category,
            };
            setPlate(plateDetails);
        }
    };

    // related category
    const getRelatedCategory = async () => {
        if (plate && loading === true) {
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
        if (plate && loading === true) {
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
                    document.title = `WikiFood || ${plate.name}`;
                    return { id, img, name, param };
                });
                cardsInRandomOrder(listOfPlates);
                setCountry(listOfPlates.slice(0, 3));
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    useEffect(() => {
        getRecommendByCountry(); // eslint-disable-next-line react-hooks/exhaustive-deps
        getRelatedCategory(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plate]);

    if (!loading) {
        const { name, img, ingredients, area, instructions, category } = plate;
        return (
            <main className='section-center food-page'>
                {/* single food */}
                <section className='single-food'>
                    <div className='section-title'>
                        <h1>{name}</h1>
                        <div className='single-food-tags'>
                            <Link className='btn' to={`/category/${category}`}>
                                {category}
                            </Link>
                            <Link className='btn' to={`/country/${area}`}>
                                {area}
                            </Link>
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
                                            <p
                                                className='single-ingredient'
                                                key={index}
                                            >
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
                    <CardeSection
                        menus={categories}
                        category={category}
                        relatedMenus={true}
                    />
                </section>
                {/* area */}
                <section className='recommended-section-container'>
                    <CardeSection
                        menus={country}
                        category={area}
                        relatedMenus={true}
                    />
                </section>
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

export default SinglePlate;
