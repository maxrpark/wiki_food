import { useEffect, useState } from "react";
import axios from "axios";
export const useFetch = (base_url, param) => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        setLoading(true);
        const response = await axios(`${base_url}${param}`);
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
            setMenus(listOfPlates);
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, [param]);
    return { loading, menus };
};
