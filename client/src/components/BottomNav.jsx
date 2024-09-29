import React from 'react'
import { NavLink } from 'react-router-dom'

function BottomNav() {
  return (
      <div className='fixed bottom-0 w-full flex items-center bg-white shadow-lg p-2'>
          <NavLink 
            to="/leaderboard" 
            className='flex flex-col items-center text-center p-2 hover:bg-gray-200 rounded-lg transition duration-300 flex-1'
          >
              <img className='w-10 h-10 object-cover' src="/leaderboard_icon.png" alt="Leaderboard" />
              <span className='text-sm'>Leaderboard</span>
          </NavLink>
      
          <div className='flex-1 flex justify-center'>
            <NavLink 
              to="/reels" 
              className='flex flex-col items-center text-center p-2 hover:bg-gray-200 rounded-lg transition duration-300'
            >
                <img className='w-10 h-10 object-cover' src="/reels_icon.svg" alt="Reels" />
                <span className='text-sm'>Questions</span>
            </NavLink>
          </div>

          <NavLink 
            to="/profile" 
            className='flex flex-col items-center text-center p-2 hover:bg-gray-200 rounded-lg transition duration-300 flex-1'
          >
              <img className='w-10 h-10 object-cover' src="/profile_icon.svg" alt="Profile" />
              <span className='text-sm'>Profile</span>
          </NavLink>
    </div>
  )
}

export default BottomNav
