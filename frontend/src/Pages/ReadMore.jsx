import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api_url from '../utils';

const ReadMore = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleFetchById = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${api_url}/api/recipe/fetch/${id}`);
            const result = await response.json();
            const { success, message, recipeList } = result;

            if (success) {
                console.log(message);
                setRecipe(recipeList);
                setLoading(false);
            } else {
                console.log(message);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        handleFetchById();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="text-gray-500 animate-pulse">Loading...</span>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">No recipe found</span>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center sm:text-left">
                {recipe.title}
            </h1>
            <img
                src={recipe.imgUrl}
                alt={recipe.title || 'Recipe image'}
                className="w-full h-60 sm:h-80 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {recipe.description}
            </p>
        </div>
    );
};

export default ReadMore;
