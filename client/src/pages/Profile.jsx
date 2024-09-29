import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PoweredBy from '../components/PoweredBy';

function Profile() {
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  async function fetchPoints() {
    try {
      const request = {
          email: user.email,
      }
      const response = await axios.post("https://api.triviatok.us/api/users/points", request);
      setPoints(response.data.points);

    } catch (err) {
        console.log(err)
    }

    setLoading(false);
  }


  useEffect(() => {
      if(!isLoading && !isAuthenticated){
          navigate('/');
      }
      if(!isLoading){
          fetchPoints()
      }
  }, [isLoading])

  return (
      <>
      {(!isLoading && isAuthenticated) && 
          <div className='flex flex-col items-center p-6 bg-gray-100 min-h-screen'>
              <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
                {/* Profile Picture */}
                <div className='flex flex-col items-center mb-4'>
                  <img
                    className='w-24 h-24 rounded-full shadow-md'
                    src={user.picture}// Placeholder image
                    alt="Profile"
                  />
                  <h1 className='text-2xl font-bold mt-2'>{user.name}</h1>
                  <p className='text-gray-600'>{user.email}</p>
                  <p className='text-green-500 font-semibold mt-1'>Points: {points}</p>
                </div>

                {/* Options Menu */}
                <div className='relative flex justify-end'>
                  <button
                    className='flex items-center justify-center bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2 focus:outline-none'
                    onClick={toggleDropdown}
                  >
                    <span className='mx-1'>More</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg'>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200'
                        onClick={logout}
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                  </div>
                </div>
              <PoweredBy className="mb-28"/>
              </div>
        }
      </>
  )
}

export default Profile
