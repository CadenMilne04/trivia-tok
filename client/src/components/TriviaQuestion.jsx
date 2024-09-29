import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TriviaQuestion(props) {
  const {_id, term, question, answer, choice1, choice2, choice3, choice4, creator} = props.questionData;
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [confetti, setConfetti] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); 

  async function handleAnswerClick(e){
      // Validate correctness on the server.
      try {
          let request;

          if(isAuthenticated){
              request = {
                email: user.email,
                name: user.name,
                questionID: _id,
                answer: e.target.innerText,
              }
          }
          else {
              request = {
                email: "non-authenticated",
                name:  "non-authenticated",
                questionID: _id,
                answer: e.target.innerText,
              }
          }

          const response = await axios.post("https://api.triviatok.us/api/users/answer", request);

          if(response.data.correct){

            const newConfetti = Array.from({ length: 100 }).map(() => ({
              id: Math.random(), // Unique ID for each confetti piece
              left: Math.random() * 100, // Random position from 0 to 100% of width
              animationDuration: Math.random() * 2 + 1, // Random duration between 1s and 3s
              opacity: Math.random() * 0.5 + 0.5, // Random opacity for a more varied look
            }));

            setConfetti(newConfetti);
            setTimeout(() => {
              setConfetti([]); // Clear confetti after 3 seconds
            }, 3000);

            setCorrect(true)
          }
      } catch (err) {
        console.log(err)
      }
      

      setAnswered(true);
  }  

  async function fetchImage(){
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=6nB6DhEbxZxQ2ZJR9ldWrAQylZPCyFtn5BPZZt6T-rI`);
          setImage(response.data.results[Math.floor(Math.random() * 10)].urls.raw);

        } catch (err) {
            console.log(err)
        }
  }

  useEffect(()=>{
      fetchImage();
  }, [])

  return (
    <div className='flex flex-col gap-4 justify-center h-dvh mx-2'>
      {confetti.map(({ id, left, animationDuration, opacity }) => (
        <span
          key={id}
          className='fixed'
          style={{
            left: `${left}vw`,
            top: 10, // Start at the top of the screen
            animation: `confetti-fall ${animationDuration}s linear forwards`,
            opacity: opacity,
            fontSize: `${Math.random() * 2 + 1}rem`, // Random size for each confetti piece
            pointerEvents: 'none',
          }}
        >
          🎉
        </span>
      ))}
      <img className="h-1/4 w-fit mx-auto" src={image} />
      <div className='flex justify-center'>{question}</div>
      <ul className='grid grid-cols-2 grid-rows-2 gap-4'>
        <button className={`text-white py-2 px-4 rounded hover:bg-red-600 ${answered ? 'bg-gray-500 hover:bg-gray-500' : 'bg-red-500'}`} disabled={answered} onClick={handleAnswerClick}>{choice1}</button>
        <button className={`text-white py-2 px-4 rounded hover:bg-orange-600 ${answered ? 'bg-gray-500 hover:bg-gray-500' : 'bg-orange-500'}`} disabled={answered} onClick={handleAnswerClick}>{choice2}</button>
        <button className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${answered ? 'bg-gray-500 hover:bg-gray-500' : 'bg-blue-500'}`} disabled={answered} onClick={handleAnswerClick}>{choice3}</button>
        <button className={`text-white py-2 px-4 rounded hover:bg-green-600 ${answered ? 'bg-gray-500 hover:bg-gray-500' : 'bg-green-500'}`} disabled={answered} onClick={handleAnswerClick}>{choice4}</button>
      </ul>
      <div>
          {answered && 
              <>
              <p className='font-semibold text-lg'>Your answer was: 
                  <span className={`${(correct ? "text-green-500" : "text-red-500")}`}>{(correct ? " Correct (+1 Point)" : " Incorrect (-1 Point)")}</span>
              </p>
              {!isAuthenticated && 
                  <p><span className='text-blue-600 underline hover:cursor-pointer' onClick={() => {navigate("/")}}>Log in</span> to save your score.</p>
              }
              </>
          }
      </div>

      <p className='flex items-center'>Question by: {creator == "Google Gemini" ? <img className="h-12" src="gemini_logo.png" alt="Google Gemini Logo"/> : creator}</p>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
          }
        }
      `}</style>
    </div>
  )
}

export default TriviaQuestion
