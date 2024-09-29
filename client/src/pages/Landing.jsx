import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import PoweredBy from '../components/PoweredBy';

function Landing() {
  const navigate = useNavigate(); 
  const { loginWithRedirect, user, isAuthenticated, isLoading  } = useAuth0();
  if(isAuthenticated){
      navigate('/reels');
  }
  
  useEffect(() => {
  }, [])


  return (
    <div className='grid items-center'>
      {(!isAuthenticated && !isLoading) &&
          <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
          {/* Hero Section */}
          <img className="rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-sm" src="/tt_i_logo.png" alt="" />
          <div className='text-center p-6'>
            <h1 className='text-4xl font-bold mb-4'>Trivia-Tok!</h1>
            <p className='text-lg text-gray-700 mb-6'>
              {/* Fill in with your app description */}
              Trivia-tok is doomscroll-based content platform designed from the ground up to privide more value to users by engaging the brain instead of rotting it.
            </p>
            
            <div className='flex flex-col w-fit m-auto gap-2 items-start px-3'>
                <p className='text-xl'>Login or sign up:</p>
                <button
                  className='bg-white border-2 border-black text-black font-bold py-1 px-1 rounded hover:bg-gray-100 transition duration-200 flex items-center'
                  onClick={loginWithRedirect}
                >
                  <img
                    src="auth0_logo.png" // Path to Auth0 logo
                    alt="Auth0 Logo"
                    className='h-10 px-10' // Adjust size as needed
                  />
                </button>
                <p className='text-xl'>Or, <span onClick={() => {navigate("/reels")}} className='text-blue-600 underline hover:cursor-pointer'>continue as a guest</span></p>
            </div>

            <PoweredBy />

          </div>
        </div>
      }
    </div>
  )
}

export default Landing
