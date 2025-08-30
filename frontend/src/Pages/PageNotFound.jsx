import React from 'react'

const PageNotFound = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='max-w-md mx-auto text-center'>
        
        {/* 404 Number */}
        <div className='mb-8'>
          <h1 className='text-6xl md:text-7xl font-bold text-gray-800 mb-4'>
            404
          </h1>
          <div className='w-16 h-1 bg-blue-500 mx-auto rounded'></div>
        </div>

        {/* Simple Icon */}
        <div className='mb-8'>
          <div className='w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className='w-12 h-12 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.293' />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Page Not Found
          </h2>
          <p className='text-gray-600 mb-6 leading-relaxed'>
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='space-y-3'>
          <button 
            onClick={() => window.location.href = '/'}
            className='w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200'
          >
            Go to Homepage
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className='w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200'
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  )
}

export default PageNotFound