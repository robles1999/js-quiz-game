//! VARIABLES
let question = 0;
let timeLeft = 10;
let currentQuestionIndex;
let timerInterval;
let score;

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

// quiz variables

//! ::::::::::::::: create DOM elements  :::::::::::::::
const timeFlexContainer = document.createElement("div");
const mainBox = document.createElement("main");
const timerText = document.createElement("h4");
const landingPageHeader = document.createElement("h1");
const landingPageParagraph = document.createElement("p");
const startButton = document.createElement("button");
const clock = document.createElement("h4");

//! ::::::::::::::: add element content  :::::::::::::::
landingPageHeader.textContent = "Coding Quiz Challenge";

landingPageParagraph.textContent =
  "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

timerText.textContent = "View high scores";
startButton.textContent = "Start Quiz";
clock.textContent = "Timer";

//! ::::::::::::::: set attributes  :::::::::::::::
timeFlexContainer.setAttribute("class", "timer-container");
timerText.setAttribute("class", "high-score-text");
clock.setAttribute("class", "clock");
landingPageParagraph.setAttribute("class", "landing-paragraph");
mainBox.setAttribute("class", "main-box");
startButton.setAttribute("class", "start-button");

//! ::::::::::::::: select existing elements :::::::::::::::

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question");
const scoreText = document.createElement("p");
const submitButton = document.createElement("button");

//! :::::::::::::::`APPEND` landing page elements ::::::::::::::::
quizContainer.appendChild(timeFlexContainer);
timeFlexContainer.appendChild(timerText);
timeFlexContainer.appendChild(clock);
quizContainer.appendChild(mainBox);
mainBox.appendChild(landingPageHeader);
mainBox.appendChild(landingPageParagraph);
mainBox.appendChild(startButton);
startButton.addEventListener("click", startQuiz);
//! ::::::::::::::: select added elements :::::::::::::::
// document.querySelector(".start-button")

//! ::::::::::::::: question card elements :::::::::::::::

const questionCard = `
<h1 class="question">Test</h1>
<button class="answer answer-1">First Answer</button>
<button class="answer answer-2"></button>
<button class="answer answer-3"></button>
<button class="answer answer-4"></button>
</>
`;
//! ::::::::: DON'T DELETE BELOW THIS LINE ::::::::::::::

function startQuiz() {
  showQuestion();

  // start timer
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  if (timeLeft < 0) {
    timeLeft = 0;
    window.location.replace("scores.html");
  }
  clock.textContent = `Timer: ${timeLeft}`;
}

function showQuestion() {
  //! select question text and answers
  // const questionData = quizData[currentQuestionIndex];

  //! clear main box
  mainBox.innerHTML = "";
  // landingPageParagraph.textContent = questionData.question;

  //! load question card
  mainBox.innerHTML = questionCard;

  //! select question card elements
  const questionEl = document.querySelector(".question");
  const firstAnswer = document.querySelector(".answer-1");
  const secondAnswer = document.querySelector(".answer-2");
  const thirdAnswer = document.querySelector(".answer-3");
  const fourthAnswer = document.querySelector(".answer-4");

  //! populate card with question and possible answers

  questionEl.textContent = quizData[question + 1].question;

  firstAnswer.setAttribute("data-answer", quizData[question + 1].options[0]);
  secondAnswer.setAttribute("data-answer", quizData[question + 1].options[1]);
  thirdAnswer.setAttribute("data-answer", quizData[question + 1].options[2]);
  fourthAnswer.setAttribute("data-answer", quizData[question + 1].options[3]);

  firstAnswer.textContent = "1. " + quizData[question + 1].options[0];
  secondAnswer.textContent = "2. " + quizData[question + 1].options[1];
  thirdAnswer.textContent = "3. " + quizData[question + 1].options[2];
  fourthAnswer.textContent = "4. " + quizData[question + 1].options[3];

  firstAnswer.addEventListener("click", checkAnswer);
  secondAnswer.addEventListener("click", checkAnswer);
  thirdAnswer.addEventListener("click", checkAnswer);
  fourthAnswer.addEventListener("click", checkAnswer);
}

function checkAnswer(e) {
  if (e.target.getAttribute("data-answer") === quizData[question + 1].answer) {
    console.log("Correct!");
    question++;
    console.log("Question number:" + question);
    if (question >= Object.keys(quizData).length) {
      window.location.replace("scores.html");
    }
    console.log(Object.keys(quizData).length);
    showQuestion();
  } else {
    timeLeft -= 10;
    console.log("Incorrect.");
  }
}
