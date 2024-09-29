import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function TopBar() {
  const { loginWithRedirect, user, isAuthenticated, isLoading  } = useAuth0();

  return (
    <div className='fixed top-0 w-full flex justify-end'>
      {isAuthenticated && <p>Welcome back, {user.name}!</p>}

    </div>
  )
}

export default TopBar
