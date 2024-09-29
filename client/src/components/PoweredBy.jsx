import React from 'react'

function PoweredBy() {
  return (
      <div className='flex flex-col items-center justify-center p-6 mt-4'>
          <h2 className='text-xl font-semibold mb-4'>Powered by:</h2>
          <div className='flex flex-shrink justify-center gap-1'>
            <img 
              src="gemini_logo.png" 
              alt="Tool 1 Logo" 
              className='h-16 w-auto' // Adjust height as needed
            />
            <img 
              src="mongodb_logo.png" 
              alt="Tool 2 Logo" 
              className='h-16 w-auto' // Adjust height as needed
            />
            <img 
              src="godaddy_logo.png" 
              alt="Tool 3 Logo" 
              className='h-16 w-auto' // Adjust height as needed
            />
            <img 
              src="pitt_logo.png" 
              alt="Tool 4 Logo" 
              className='h-16 w-auto' // Adjust height as needed
            />
          </div>
        </div>
  )
}

export default PoweredBy
