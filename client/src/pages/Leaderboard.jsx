import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PoweredBy from '../components/PoweredBy';

function Leaderboard() {
    const [topTen, setTopTen] = useState([])
    const [loading, setLoading] = useState(true)

    const getMedalIcon = (position) => {
        switch (position) {
          case 0:
            return '🏅'; // Gold medal
          case 1:
            return '🥈'; // Silver medal
          case 2:
            return '🥉'; // Bronze medal
          default:
            return ''; // No medal
        }
    };

    async function fetchTopTenUsers(){
        try {
          const response = await axios.get("https://api.triviatok.us/api/users/leaderboard");
          setTopTen(response.data.topten);

        } catch (err) {
            console.log(err)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchTopTenUsers()
    }, [])

    if(loading){

    }

    return (
    <>
    <div className='max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg'>
        <h2 className="text-2xl font-semibold text-center mb-4">Leaderboard 🏆</h2>
          <div className="border-b border-gray-300 mb-4">
            <div className="flex justify-between py-2 font-medium text-gray-600">
              <span>Name</span>
              <span>Points</span>
            </div>
          </div>
        {loading ? <p className='h-dvh'>Loading...</p> : 
            <div>
                {topTen.map((user, i) => (
                  <div key={i} className={`flex justify-between py-2 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <span className="flex items-center">
                      {getMedalIcon(i)} 
                      <span className="ml-2">{user.name}</span>
                    </span>
                    <span>{user.points}</span>
                  </div>
                ))}
            </div>
        }

    </div>
    <PoweredBy />
    </>
    )
}

export default Leaderboard
