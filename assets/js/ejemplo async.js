/*const getData = async (id) => {
  fetch('./assets/js/questions.json')
  .then(response => response.json())
  .then(questions => { return questions})
}*/

const getData = async () => {
  try {
    const response = await fetch('./assets/js/questions.json');
    if (!response.ok) {
      throw new Error('Error en la petición Fetch');
    }
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Puedes volver a lanzar el error si lo deseas.
  }
};

const checkAnswer = (answer, correct) => {
  let solution = false;
  answer==correct ? solution = true : solution = false;
  return solution
}

let userScore = 0;

const showInfo = (result,id) => {
  let question = document.getElementById("question");
  let answers = document.getElementById("answers");
  let idQ = document.getElementById("n-question");
  
  let selected = false;
  let userAnswer;

  idQ.innerText = result[id].idquestion;
  question.innerHTML = result[id].question;
  answers.innerHTML = `<ul>
      <div>
          <li><button class="answer">${result[id].a}</button></li>
          <li><button class="answer">${result[id].b}</button></li>
          <li><button class="answer">${result[id].c}</button></li>
          <li><button class="answer">${result[id].d}</button></li>
      </div>
  </ul>
  <button id='next'> Next </button>
  <p class='margin-b-5'>Score: <span id="score">${userScore}</span></p>`;

  let score = document.getElementById('score');
  let answerButtons = document.getElementsByClassName('answer');

  for(let button of answerButtons){
                button.addEventListener('click',(e)=>{
                  userAnswer = e.target.innerText
                    for (let otherButton of answerButtons) {
                        if (otherButton !== e.target) {
                            otherButton.classList.remove('selected');
                        }
                    }
                    e.target.classList.add('selected');
                    selected = true;
                })               
  }

  let nextButton = document.getElementById('next');
  if(parseInt(idQ.innerText)<=10){
    nextButton.addEventListener('click', () => {
      console.log(userAnswer)
      console.log(result[id].correct)
      if(selected){
        if(checkAnswer(userAnswer,result[id].correct)){

          userScore++
          score.innerText = userScore;
        } else{
          score.innerText = userScore;
        }
        if(parseInt(idQ.innerText)<10){
          // console.log(id)
          id++
          showInfo(result,id);
        }else{
          let thank = document.getElementById('quiz');
          thank.innerHTML = `Thank you for participate! <br>
          your score is ${score.innerText}`
        }
      } else{
        alert('Choose an answer')
      }
    })
  } 

/*
              nextButton.addEventListener('click', () => {
                  if(selected){
                      if(parseInt(idQ.innerText)<10){
                          getData(parseInt(idQ.innerText)+1);
                      } else{
                          let thank = document.getElementById('quiz');
                          thank.innerHTML = "Thank you for participate!"
                      }
                  }
                  else{
                      alert('please choose a answer')
                  }
              })*/
              
}           


  



// Llamar a la función async y obtener los datos usando await
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const result = await getData(); // Obtein data 
    console.log(result); // Aquí puedes acceder a los datos obtenidos
    
    let startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
        let welcome = document.getElementById('welcome');
        let quiz = document.getElementById('quiz');
        welcome.style.display = 'none';
        quiz.style.display = 'block';
        showInfo(result,1);
        
    })
    // button next








  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante la obtención de datos
    console.error('Error:', error);
  }
}
)
