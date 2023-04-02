"use strict";
//! VARIABLES
let questionNumber = 1;
let timeLeft = 30;
let currentQuestionIndex;
let timerInterval;
let score;
let highScoresData;

//! quiz data
const quizData = {
  1: {
    question: "What is the symbol used for single-line comments in JavaScript?",
    options: ["//", "/*", "<!--", "-->"],
    answer: "//",
  },
  2: {
    question: "What is the symbol used for assignment in JavaScript?",
    options: ["+=", "-=", "=", "*="],
    answer: "=",
  },
  3: {
    question:
      "What is the result of adding a number and a string in JavaScript?",
    options: ["An error", "The number", "The string", "A new data type"],
    answer: "A new data type",
  },
  4: {
    question: "What is the purpose of the typeof operator in JavaScript?",
    options: [
      "To check if two values are equal",
      "To convert a string to a number",
      "To find the length of a string",
      "To determine the type of a value",
    ],
    answer: "To determine the type of a value",
  },
  5: {
    question:
      "What is the correct syntax for a function declaration in JavaScript?",
    options: [
      "function myFunction() {}",
      "myFunction() {}",
      "var myFunction = function() {}",
      "const myFunction => {}",
    ],
    answer: "function myFunction() {}",
  },
};
// function landingPage() {


//! ::::::::::::::: create DOM elements  :::::::::::::::
const timeFlexContainer = document.createElement("div");
const mainBox = document.createElement("main");
const timerHighScores = document.createElement("h4");
const landingPageHeader = document.createElement("h1");
const landingPageParagraph = document.createElement("p");
const startBtnContainer = document.createElement("div");
const startButton = document.createElement("button");
const clock = document.createElement("h4");

//! ::::::::::::::: add element content  :::::::::::::::
landingPageHeader.textContent = "Coding Quiz Challenge";

landingPageParagraph.textContent =
  "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

timerHighScores.textContent = "View high scores";
startButton.textContent = "Start Quiz";
clock.textContent = "Timer";

//! ::::::::::::::: set attributes  :::::::::::::::
timeFlexContainer.setAttribute("class", "timer-container");
timerHighScores.setAttribute("class", "high-score-text");
clock.setAttribute("class", "clock");
landingPageParagraph.setAttribute("class", "landing-paragraph");
mainBox.setAttribute("class", "main-box");
startBtnContainer.setAttribute("id", "start-button-container");
startButton.setAttribute("class", "start-button");

//! ::::::::::::::: select existing elements :::::::::::::::

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question");
const scoreText = document.createElement("p");
const submitButton = document.createElement("button");

//! :::::::::::::::`APPEND` landing page elements ::::::::::::::::
quizContainer.appendChild(timeFlexContainer);
timeFlexContainer.appendChild(timerHighScores);
timeFlexContainer.appendChild(clock);
quizContainer.appendChild(mainBox);
mainBox.appendChild(landingPageHeader);
mainBox.appendChild(landingPageParagraph);
mainBox.appendChild(startBtnContainer);
startBtnContainer.appendChild(startButton);
startButton.addEventListener("click", startQuiz);
timerHighScores.addEventListener("click", () => {
  window.location.href = "scores.html"
});

//! ::::::::::::::: question card elements :::::::::::::::

const questionCard = `
<h1 class="question">Test</h1>
<section class="answer-list">
<button class="answer answer-1"></button>
<button class="answer answer-2"></button>
<button class="answer answer-3"></button>
<button class="answer answer-4"></button>
</></>
`;

//! ::::::::: answer validation element ::::::::::::::
const answerValidation = document.createElement("h1");
answerValidation.setAttribute("class", "answer-validation");

//! ::::::::: DON'T DELETE BELOW THIS LINE ::::::::::::::

function startQuiz() {
  showQuestion();

  // start timer
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft < 0) {
    clearInterval(timerInterval);
    alert("You ran out of time or your score is less than 0.")
    window.location.replace("index.html");
  } else {
    //! change timer color when it reaches 10 seconds
    if (timeLeft === 10) {
      clock.classList.toggle("red");
    }
    timeLeft--;
    clock.textContent = `Timer: ${timeLeft}`;
  }
}

async function noMoreQuestions() {
  if (questionNumber > Object.keys(quizData).length) {
    clearInterval(timerInterval);
    score = timeLeft;
    console.log(`This is your score: ${timeLeft + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // window.location.replace("scores.html");
    mainBox.innerHTML = "";
    saveScore();
  } else {
    showQuestion();
  }
}

function showQuestion() {
  //! clear main box
  mainBox.innerHTML = "";

  //! load question card
  mainBox.innerHTML = questionCard;

  //! select question card elements
  const questionEl = document.querySelector(".question");
  // const answers = document.querySelector(".answer-list");
  const firstAnswer = document.querySelector(".answer-1");
  const secondAnswer = document.querySelector(".answer-2");
  const thirdAnswer = document.querySelector(".answer-3");
  const fourthAnswer = document.querySelector(".answer-4");

  //! populate card with question and possible answers
  questionEl.textContent = quizData[questionNumber].question;

  //! array of possible answers
  const options = quizData[questionNumber].options;

  //! add data-answer attribute by looping through the answer options array
  for (
    let option = 0;
    option < quizData[questionNumber].options.length;
    option++
  ) {
    document
      .querySelector(".answer-" + (option + 1))
      .setAttribute("data-answer", options[option]);
  }

  firstAnswer.textContent = "1. " + quizData[questionNumber].options[0];
  secondAnswer.textContent = "2. " + quizData[questionNumber].options[1];
  thirdAnswer.textContent = "3. " + quizData[questionNumber].options[2];
  fourthAnswer.textContent = "4. " + quizData[questionNumber].options[3];

  mainBox.addEventListener("click", checkAnswer);
}

async function checkAnswer(e) {

  //! make sure one of the answer buttons was pressed
  //? `target` returns the entire element
  //? ex. < button class="btn .answer" data-answer="//"> text</ >

  if (e.target.matches(".answer")) {
    console.log(e.target);
    if (e.target.dataset.answer === quizData[questionNumber].answer) {
      //! if correct answer increment question number
      questionNumber++;
      //! send feedback to the user
      answerValidation.textContent = "Correct!";
      mainBox.appendChild(answerValidation);
      //! give time for the user to read feedback
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //! check if there are more questions or if we reached the end
      //! of the quizData
      noMoreQuestions();
    } else {
      //! if a wrong answer was selected subtract 10 seconds from clock
      timeLeft -= 10;
      //! send feedback to the user
      answerValidation.textContent = "Wrong!";
      mainBox.appendChild(answerValidation);
    }
  }
}

function saveScore() {
  const playerForm = `
<h1 class="done-h1">All done!</h1>
<p class="player-score"></p>
<p class="initials-p">Enter initials:</>
<input
    type="text"
    name="initials"
    id="initials" />
    <button id="sub-button">Submit</button>
`;
  //! retrieve and parse previous local storage data from scores key
  const highScoresData = JSON.parse(localStorage.getItem("scores") || "[]");

  //! show players result and ask to input initials
  mainBox.innerHTML = playerForm;
  document.querySelector(".player-score").textContent =
    "Your final score is: " + timeLeft;

  const subBtn = document.querySelector("#sub-button");

  //! when the initials are submitted, add the initials and score
  //! to the `highScoresData` array, then write new data to local storage
  subBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const initials = document.querySelector("#initials").value;

    //! add player data to highScoresData array
    const playerScore = {};
    playerScore.initials = initials;
    playerScore.score = score;

    highScoresData.push(playerScore);

    //! write new data to local storage
    localStorage.setItem("scores", JSON.stringify(highScoresData));

    mainBox.innerHTML = "";
    // viewHighScores();
    window.location.href = "scores.html"
  });
}