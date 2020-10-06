/**
 * Example store structure
 */
 const STORE = {
   // 5 or more questions are required
   questions: [
     {
       question: 'Who shoots lightning and stays with his trainer?',
       answers: [
         'Chocobo',
         'Minotaur',
         'Pikachu',
         'Ravio'
       ],
       correctAnswer: 'Pikachu'
     },
     {
       question: 'Who is always trying to strike it big?',
       answers: [
         'Gene Starwind',
         'Wario',
         'Spike Spiegel',
         'All of the above'
       ],
       correctAnswer: 'All of the above'
     },
     {
       question: 'Who needs to find the treasure at the Grand Line?',
       answers: [
         'The Straw Hat Crew',
         'The Akatsuki',
         'The Soul Society',
         'Organization XIII'
       ],
       correctAnswer: 'The Straw Hat Crew'
     },
     {
       question: 'Who runs at supersonic speeds?',
       answers: [
         'Static Shock',
         'Inuyasha',
         'Sonic the Hedgehog',
         'Terry Bogard'
       ],
       correctAnswer: 'Sonic the Hedgehog'
     },
     {
       question: 'Who tells you the princess is in another castle?',
       answers: [
         'Warrior of Light',
         'Toad',
         'The Great Deku Tree',
         'Johnny Bravo'
       ],
       correctAnswer: 'Toad'
     },
     {
       question: 'Who protects the world from devastation to unite all peoples within our nation?',
       answers: [
         'Jessie!',
         'James!',
         'And Meowth!',
         'Thats right!'
       ],
       correctAnswer: 'Thats right!'
     },
     {
       question: 'Who is the Star Warrior who woke up too early?',
       answers: [
         'Kirby',
         'Steve',
         'Dr Who',
         'All Might'
       ],
       correctAnswer: 'Kirby'
     },
     {
       question: 'Who wears fire retardant clothes from the fire rat?',
       answers: [
         'Aang',
         'Inuyasha',
         'Misty',
         'Sora'
       ],
       correctAnswer: 'Inuyasha'
     },
     {
       question: 'Who wields the swords of his forefathers?',
       answers: [
         'Noctis Lucis Caelum',
         'Chase Young',
         'Kenshin Himura',
         'Ieyasu Tokugawa'
       ],
       correctAnswer: 'Noctis Lucis Caelum'
     },
   ],
   quizStarted: false,
   questionNumber: 0,
   submittingAnswer: false,
   score: 0,
   currentQuestionState: {
     answerArray: []
   }
 };

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateWelcomeScreen() {
  return `
  <div class="welcome container">
    <form>
      <p>
        How do you do? Are you ready to take on this Character Quiz?
      </p>

      <button type="submit" id="beginQuiz" autofocus>Begin Quiz</button>
    </form>
  </div>
    `;
}

//Generates screen for quiz interface, questions and answers

function generateQuizInterface(questionObject) {
  return `
  <div class="quiz-interface container">
    <p>Question ${questionObject.index} / ${STORE.questions.length}
    </p>
    <p>
      ${questionObject.question.question}
    </p>
    <form>
      <ul>
        ${generateAnswerArray(questionObject.question.answers)}
      </ul>
      <button type="submit" class="submit-answer" autofocus>Submit Answer</button>
    </form>
  </div>`
}

//Creates answer array for each answer option

function generateAnswerArray(answers) {
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  })
  return answerArray.map(answer => stringifyQuizAnswers(answer)).join('');
}

//Makes strings of each answer and radio buttons

function stringifyQuizAnswers(answer) {
  let questionNumber = STORE.questionNumber;
  let name = STORE.questions[questionNumber].answers.indexOf(answer);
  return `
  <li>
    <div class="answer-container">
    <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
    <label for="answer-${name}"> ${answer}</label>

    </div>
  </li>
  `;
}

//Generate results for question submissions w/ buttons

function generateAnswerResults() {
  let answerArray = STORE.currentQuestionState.answerArray;
  const buttons = {
    next: ' <button type="submit" class="next-question" autofocus>Next Question</button>',
    results: '<button type="submit" class="see-results" autofocus>See Results</button>'
  };

  let correctResponse = `Good job! "${answerArray[1]}" is right.`;
  let incorrectResponse = `Yikes, ${answerArray[2]} is wrong. ${answerArray[1]} is the correct answer.`;
  let isFinalQuestion = (STORE.questionNumber + 1) === (STORE.questions.length);

  return `
    <div class="answer-response container">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${STORE.score}</p>
    ${isFinalQuestion ? buttons.results : buttons.next}
    </form>
    </div>
    `;
  }

//Creates results screen and resets quiz

function generateQuizResults() {
  return `
    <div class='quiz-results container'>
      <p>
       You're finished!
         </p>
          <p>You scored ${STORE.score} out of ${STORE.questions.length * 10}</p>
        <button class="restart-quiz">Restart Quiz</button>
    </div>`
  }




/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  if(STORE.quizStarted === false) {
    if(STORE.questionNumber === STORE.questions.length) {
      $('main').html(generateQuizResults());
    } else {
      $('main').html(generateWelcomeScreen());
    }
  } else if (STORE.quizStarted === true) {
    if(STORE.submittingAnswer === false) {
      $('main').html(generateQuizInterface(currentQuestion()))
    } else if(STORE.submittingAnswer === true) {
      $('main').html(generateAnswerResults())
    }
  }
  }


  //Changes value of quizStarted

function startQuiz() {
    STORE.quizStarted = true;
  }

  //Resets values to restart quiz

function restartQuiz() {
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.submittingAnswer = false;
    STORE.score = 0;
    STORE.currentQuestionState.answerArray = [];
  }

  //For submitting results to exit quiz

function seeResults() {
    STORE.quizStarted = false;
    STORE.questionNumber ++;
  }

  //Updates current question state

function currentQuestion() {
    let index = STORE.questionNumber;
    let questionObject =
     STORE.questions[index];
    return {
      index: index + 1,
      question: questionObject
    };
  }

  //Moves from current question to the nextQuestion

function nextQuestion() {
    if (STORE.questionNumber < STORE.questions.length) {
      STORE.questionNumber++;
      STORE.submittingAnswer = false;
    } else if (STORE.questionNumber === STORE.questions.length) {
      STORE.quizStarted = false;
    }
  }

  //Vaidates checked radio against correct answer

function validateAnswers() {
    let radios = $('input:radio[name="answer"]');
    let selectedAnswer = $('input[name="answer"]:checked').data('answer');
    let questionNumber = STORE.questionNumber;
    let correctAnswer = STORE.questions[questionNumber].correctAnswer;

    if (radios.filter(':checked').length === 0) {
      alert('Aht aht, pick an answer please.');
      return;
      } else {
      STORE.submittingAnswer = true;
      if (selectedAnswer === correctAnswer) {
        STORE.score += 10;
        STORE.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];

      } else {
        STORE.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
      }
      }
      }

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleBeginQuizSubmit(){

  $('main').on('click', '#beginQuiz', (event) => {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleSubmitAnswer() {
  $('main').on('click' , '.submit-answer', (event) => {
    event.preventDefault();
    console.log('submitting answer');
    validateAnswers();
    renderQuiz();
  });
}

function handleNextQuestionSubmit(){
  $('main').on('click', '.next-question', (event) => {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

function handleSeeResultsSubmit(){
  $('main').on('click', '.see-results', (event) => {
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

function handleRestartQuizSubmit(){
  $('main').on('click', '.restart-quiz', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}



function handleQuiz() {
  renderQuiz();
  handleBeginQuizSubmit();
  handleSubmitAnswer();
  handleNextQuestionSubmit();
  handleSeeResultsSubmit();
  handleRestartQuizSubmit();
}

$(handleQuiz);
