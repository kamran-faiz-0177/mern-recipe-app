import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import api_url from "../utils";
import { useNavigate } from 'react-router-dom';

const MyRecipe = () => {
  const email = useSelector((state) => state.auth.email);
  const user = useSelector((state) => state.auth.user);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const handleFetchMyRecipe = async (req, res) => {
    try {
      const url = `${api_url}/api/recipe/fetchmyrecipe/${email}`;
      const response = await fetch(url);
      const result = await response.json();
      const { success, message, recipeList } = result;
      if (success) {
        console.log(message, recipeList);
        setRecipe(recipeList);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    handleFetchMyRecipe();
  }, [email])

  const handleReadMore = (id) => {
    navigate(`/readmore/${id}`);
  }

  const handleDeleteRecipe = async (id) => {
    try {
      const url = `${api_url}/api/recipe/delete/${id}`;
      const options = {
        method: "DELETE",
      }
      const response = await fetch(url, options);
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        console.log(message);
        handleFetchMyRecipe();
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleUpdateRecipe = async (id) => {
     navigate(`/createrecipe/${id}`);
  }

  if (recipe == null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            {user}'s Recipe Collection
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {
            recipe.map((val, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={val.imgUrl}
                    alt={val.title || "Recipe image"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                    {val.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {val.description}
                  </p>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => handleReadMore(val._id)}
                    >
                      View Recipe
                    </button>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => handleDeleteRecipe(val._id)}
                    >Delete Recipe</button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => handleUpdateRecipe(val._id)}
                    >Update Recipe</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MyRecipe