/*Definiendo variables necesarias
  userScore variable donde almaceno las preguntas acertadas
  questionArray array donde almaceno las preguntas que vayan saliendo
*/
let userScore = 0;
let questionsArray = [];


/*Functions*/
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

const getId = () =>{
  let id = Math.floor(Math.random()*110+1);
  return id
}
const checkAnswer = (answer, correct) => {
  let solution = false;
  answer==correct ? solution = true : solution = false;
  return solution
}



const showInfo = (result,id) => {
  questionsArray.push(id);
  let question = document.getElementById("question");
  let answers = document.getElementById("answers");
  let nQuestion = document.getElementById("n-question");
  
  let selected = false;
  let userAnswer;

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
  <h3 class='margin-b-5'>Score: <span id="score">${userScore}</span></h3>`;

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
  if(parseInt(nQuestion.innerText)<=20){
    nextButton.addEventListener('click', () => {
      if(selected){
        if(checkAnswer(userAnswer,result[id].correct)){
          userScore++
          score.innerText = userScore;
        } else{
          score.innerText = userScore;
        }
        if(parseInt(nQuestion.innerText)<20){
          nQuestion.innerText = parseInt(nQuestion.innerText)+1;
          // Obtener una nueva pregunta pero que no este incluida en el array de questiones
          do{
            id = getId();
          } while(questionsArray.includes(id))
          showInfo(result,id);
        }else{
          let category;
          if (userScore == 20){
            category = result["clasification"]["category5"];
          } else if (userScore >= 15) {
            category = result["clasification"]["category4"];
          } else if (userScore >= 10){
            category = result["clasification"]["category3"];
          } else if (userScore >= 5) {
            category = result["clasification"]["category2"];
          } else{
            category = result["clasification"]["category1"];
          }
          let thank = document.getElementById('quiz');
          thank.innerHTML = `<h1 class="padtop-30">Congratulations! Your score is: ${score.innerText}</h1> 
          <h2> You are ${category.title} </h2>
          <div id="category-image" class="image-center"></div> 
          <p class="pad-10">${category.description}</p>
          
          `;
          let image = document.getElementById('category-image');
          image.style.backgroundImage = `url('${category.url}')`;
        }
      } else{
        alert('Choose an answer')
      }
    })
  } 
}           


  



// Llamar a la función async y obtener los datos usando await
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const result = await getData(); // Obtein data 

    let startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
        let welcome = document.getElementById('welcome');
        let quiz = document.getElementById('quiz');
        welcome.style.display = 'none';
        quiz.style.display = 'block';
        showInfo(result,getId());
        
    })
    // button next








  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante la obtención de datos
    console.error('Error:', error);
  }
}
)
