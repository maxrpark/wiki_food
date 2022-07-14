import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

// components
import { Form, Loader, Card } from "../components";

const base_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function Category() {
    const { id: search } = useParams();
    const { loading, menus: plate } = useFetch(base_url, search);

    useEffect(() => {
        document.title = `WikiFoo || ${search}`;
    }, []);

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
                                <Link
                                    key={card.id}
                                    to={`/single-plate/${card.param}`}
                                >
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
