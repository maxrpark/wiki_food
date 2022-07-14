import React, { useState, useEffect } from "react";
import axios from "axios";
// components
import { CardeSection, Form, Loader } from "../components";
const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;

const categories = [
    "Breakfast",
    "Starter",
    "Beef",
    "Pasta",
    "Seafood",
    "Vegetarian",
];

function Home() {
    const [isloading, setIsLoading] = useState(true);
    const [categoryOne, setCategoryOne] = useState([]);
    const [categoryTwo, setCategoryTwo] = useState([]);
    const [categoryThree, setCategoryThree] = useState([]);
    const [categoryFour, setCategoryFour] = useState([]);
    const [categoryFive, setCategoryFive] = useState([]);
    const [categorySix, setCategorySix] = useState([]);

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
        categories.forEach((category, index) => {
            getData(categories[index], states[index]);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
        document.title = `WikiFood`;
    }, []);
    if (isloading) {
        return (
            <main className='section-center'>
                <div className='loading'>
                    <Loader />
                </div>
            </main>
        );
    } else {
        return (
            <main className='section-center'>
                <Form />
                {/* 'Breakfast' */}
                <div className='card-container'>
                    <CardeSection
                        menus={categoryOne}
                        category={categories[0]}
                    />
                    {/* 'Starter',  */}
                    <CardeSection
                        menus={categoryTwo}
                        category={categories[1]}
                    />
                    {/* 'Beef'  */}
                    <CardeSection
                        menus={categoryThree}
                        category={categories[2]}
                    />
                    {/* 'Pasta' */}

                    <CardeSection
                        menus={categoryFour}
                        category={categories[3]}
                    />
                    {/* 'Seafood', */}
                    <CardeSection
                        menus={categoryFive}
                        category={categories[4]}
                    />
                    {/* 'vegan',*/}
                    <CardeSection
                        menus={categorySix}
                        category={categories[5]}
                    />
                </div>
            </main>
        );
    }
}

export default Home;
