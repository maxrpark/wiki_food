import React from "react";
import { Link } from "react-router-dom";

const SinglePlateDetails = ({
    name,
    img,
    ingredients,
    area,
    instructions,
    category,
}) => {
    return (
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
    );
};

export default SinglePlateDetails;
