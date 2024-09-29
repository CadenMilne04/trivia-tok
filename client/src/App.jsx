import './App.css'

import { BrowserRouter, Routes, Route} from 'react-router-dom'

import BottomNav from './components/BottomNav'

import Landing from './pages/Landing.jsx'
import Reels from './pages/Reels.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Profile from './pages/Profile.jsx'

function App() {

  return (
    <BrowserRouter>
        <BottomNav />
        <Routes>
            <Route path="/">
                <Route path="/" element={<Landing />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
