import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import {getQuizdetails} from './services/quiz-service';
import { QuestionType, Quiz } from './Types/quiz_types';

import QuestionCard from './COmponents/QuestionCard';
// import './service-worker';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js") // service worker file location
    .then(function() {
      console.log("Service Worker Registered Successfully");
    })
    .catch(function(error) {
      console.error("Something goes wrong while registering service worker");
      console.log(error);
    });
} else {
  console.log("Service Worker is not available");
}



function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setscore]= useState(0)
  let [showResult, setShowResult]= useState(false)
  let [correctAns, setCorrectAns]= useState(" ")
  useEffect(()=>{
    async function fetchdata() {
      const questions: QuestionType[] = await getQuizdetails(5, 'easy');
      // console.log(questions);
      setQuiz(questions)
    
    
    }
    fetchdata();
  },[])

const handleSubmit = (e:React.FormEvent<EventTarget>, userAns: string) =>{
  e.preventDefault();

  const currentQuestion:QuestionType= quiz[currentStep];
console.log("Correct Ans " + currentQuestion.correct_answer + " --user selection " + userAns)
  if(userAns===currentQuestion.correct_answer){
    setscore(++score);
  }

  if(userAns!==currentQuestion.correct_answer){
    setCorrectAns(currentQuestion.correct_answer);
  }
  console.log(correctAns)

  
  // if(userAns!==currentQuestion.correct_answer){
  //   const anscheck=(true);
// }
  
  if(currentStep!==quiz.length-1)
  setCurrentStep(++currentStep);
  else{
    //  alert("You Final Score is" + score + " out of " + quiz.length);
setShowResult(true);
// setscore(0)
;}


}



if(!quiz.length)
return <img src='./Gif/loading' alt="loading"></img>

// if(correctAns){
//   return(
//   <h1>sd</h1>
//   )


if(showResult){
  return(<div className="result-container">
    {/* <h3>Result</h3> */}
    {/* <h2{...correctAns}></h2> */}

<p>{correctAns}</p>
  <p className="result-text">Yor Final Score is <b>{score}</b> out of <b>{quiz.length}</b></p>

  </div>)
}
// if(ana)



  return (
    <div className="App">

  

      <h1>Quizier</h1>

      <h3 className="heading">{currentStep+1}/{quiz.length}</h3>

      <QuestionCard
      option={quiz[currentStep].option}
      question={quiz[currentStep].question}
      callback={handleSubmit}
      
    
      />
      <button onClick={()=>setCurrentStep(0)} className="button">Restart</button>
      

    </div>
    
  );
}

export default App;
