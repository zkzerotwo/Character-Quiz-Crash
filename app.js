/**
 * Example store structure
 */
 const STORE = {
   // 5 or more questions are required
   questions: [
     {
       question: 'Shoots lightning and stays with his trainer?',
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
       question: 'Who is the legendary hero clad in green?',
       answers: [
         'Luigi',
         'Link',
         'Lance',
         'Lorelei'
       ],
       correctAnswer: 'Link'
     },
     {
       question: 'Who bends all the elements to their will?',
       answers: [
         'The Sannin',
         'The Z Fighters',
         'The Voltron Paladins',
         'The Avatars'
       ],
       correctAnswer: 'The Aavtars'
     },
   ],
   quizStarted: false,
   questionNumber: 0,
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
  <div class="welcome">
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
  <div class="quiz-interface">
    <p>Question ${questionObject.index} / ${STORE.questions.length}
    </p>
    <p>
      ${questionObject.question.question}
    </p>
    <form>
      <ul>
        ${generateAnswerArray(questionObject.question.answers)}
      </ul>
    </form>
  </div>`
}

//Creates answer array for each answer option

function generateAnswerArray() {
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  })
  return answerArray.map(answer => stringifyQuizAnswers(answer)).join('');
}

//Makes strings of each answer and radio buttons

function stringifyQuizAnswers() {
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
  let isFinalQuestion = (STORE.questionNumber + 1) === (store.questions.length);

  return `
    <div class="answer-response">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
    ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
    `;
  }

//Creates results screen and resets quiz

function generateQuizResults() {
  return `
    <div class='quiz-results'>
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
    } else if(STORE.subnittingANswer === true) {
      $('main').html(generateAnswerResults())
    }
  }
  }
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleQuiz() {
  renderQuiz();
}

$(handleQuiz);
