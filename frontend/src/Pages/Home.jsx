import React, { useEffect, useState } from 'react'
import api_url from '../utils';
import ReadMore from './ReadMore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();

  const handleFetchRecipe = async () => {
    try {
      const url = `${api_url}/api/recipe/fetch`;
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
    handleFetchRecipe();
  }, [])

  const handleReadMore = (id) => {
    navigate(`/readmore/${id}`);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'>
      <div className='container mx-auto px-4 py-8 lg:px-6'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4'>
            Recipe Collection
          </h1>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Discover amazing recipes from around the world and create memorable dining experiences
          </p>
          <div className='w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full'></div>
        </div>

        {/* Recipe Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {recipe.map((val, index) => (
            <div
              key={index}
              className='group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100'
            >
              {/* Image Container */}
              <div className='relative overflow-hidden'>
                <img
                  src={val.imgUrl}
                  alt={val.title}
                  className='w-full h-48 sm:h-52 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-110'
                />
                {/* Overlay gradient */}
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </div>

              {/* Content */}
              <div className='p-5 lg:p-6'>
                <h2 className='text-xl lg:text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-200'>
                  {val.title}
                </h2>

                {/* Two-line description with ellipsis */}
                <p className='text-gray-600 text-sm lg:text-base line-clamp-2 mb-4 leading-relaxed'>
                  {val.description}
                </p>

                {/* Read More Button */}
                <button
                  className='w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl'
                  onClick={() => handleReadMore(val._id)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home