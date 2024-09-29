import React, { useEffect, useRef, useState } from 'react'
import useScrollSnap from "react-use-scroll-snap";
import TriviaQuestion from '../components/TriviaQuestion';
import axios from "axios";


function Reels() {
  const [searchBox, setSearchBox] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])

  const scrollRef = useRef(null);
  useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });

  async function handleApplySearchTerm(){
    setLoading(true)
    setSearchTerm(searchBox)
    await fetchQuestions(searchBox, 0)
    setLoading(false)
  }

  async function fetchQuestions(searchTerm, page) {
    try {
      const request = {
          searchTerm: searchTerm,
          pageNum: page
      }
      const response = await axios.post("https://api.triviatok.us/api/questions", request);
      setQuestions(response.data.questions);

    } catch (err) {
        console.log(err)
    }

    setLoading(false);
  }

  useEffect(() => {
      fetchQuestions("random", 0)
  }, [])


  return (
    <div>
      <div className='fixed top-0 w-full flex items-center justify-between p-4 bg-white shadow-md'>
  
  <div className='flex flex-grow max-w-xl mx-4'>
    <input 
      type="text"
      placeholder='Input any trivia topic!' 
      className='block w-full p-3 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white'
      onChange={(e) => setSearchBox(e.target.value)}
      value={searchBox}
    />
    <button 
      className='ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200'
      onClick={handleApplySearchTerm}
    >
      Apply
    </button>
  </div>
  
  {searchTerm && (
    <p className='text-sm text-gray-600'>
      Selected Trivia Type: <span className='font-semibold'>{searchTerm}</span>
    </p>
  )}
</div>

        {loading ? <p className='grid place-items-center h-dvh'>Loading...</p> : 

        <section className="" ref={scrollRef}>
            {questions.map((question, i) => (
            <div key={i} className="h-dvh bg-gray-50">
              <TriviaQuestion questionData={question}/>
            </div>
            ))}
        </section>
        }
    </div>
  )
}

export default Reels
