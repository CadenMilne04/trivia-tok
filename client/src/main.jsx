import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain="login.triviatok.us"
        clientId="Yc5ymGs6h7iu6CBko5bHyHHyR768J14G"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>
)
