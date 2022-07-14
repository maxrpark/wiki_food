import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchSingleMenu = (base_url) => {
    const [loading, setLoading] = useState(true);
    const [plate, setPlate] = useState(null);
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

    useEffect(() => {
        getData();
    }, [base_url]);
    return { loading, plate };
};
