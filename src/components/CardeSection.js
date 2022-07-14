import React from "react";
import { Link } from "react-router-dom";
import Card from "./../components/Card";
const CardeSection = ({ menus, category, relatedMenus }) => {
    return (
        <>
            <div className='section-title'>
                <h2>{category}</h2>
                <Link className='btn' to={`/category/${category}`}>
                    See all
                </Link>
            </div>
            <section className={relatedMenus && "related-section"}>
                {menus.map((card) => {
                    return (
                        <Link key={card.id} to={`/single-plate/${card.param}`}>
                            <Card {...card} />
                        </Link>
                    );
                })}
            </section>
        </>
    );
};

export default CardeSection;
