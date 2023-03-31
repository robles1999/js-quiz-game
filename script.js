//! VARIABLES
let question = 0;
let timeLeft = 60;
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
<button class="answer answer-1"></button>
<button class="answer answer-2"></button>
<button class="answer answer-3"></button>
<button class="answer answer-4"></button>
</>
`;

//! ::::::::: answer validation element ::::::::::::::
const answerValidation = document.createElement("h1");
answerValidation.setAttribute("class", "answer-validation");

//! ::::::::: DON'T DELETE BELOW THIS LINE ::::::::::::::

function startQuiz() {
  showQuestion();

  // start timer
  setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  if (timeLeft < 0) {
    timeLeft = 0;
    window.location.replace("scores.html");
  }
  //! change timer color when it reacher 10 seconds
  if (clock.textContent === "Timer: 11") {
    clock.classList.toggle("red");
  }
  clock.textContent = `Timer: ${timeLeft}`;
}

function showQuestion() {
  mainBox.innerHTML = "";

  //! clear main box

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

  //! contains array of options
  const options = quizData[question + 1].options;

  //! add data-answer attribute by looping through the answer options array
  for (
    let option = 0;
    option < quizData[question + 1].options.length;
    option++
  ) {
    document
      .querySelector(".answer-" + (option + 1))
      .setAttribute("data-answer", options[option])
  }

  firstAnswer.textContent = "1. " + quizData[question + 1].options[0];
  secondAnswer.textContent = "2. " + quizData[question + 1].options[1];
  thirdAnswer.textContent = "3. " + quizData[question + 1].options[2];
  fourthAnswer.textContent = "4. " + quizData[question + 1].options[3];

  firstAnswer.addEventListener("click", checkAnswer);
  secondAnswer.addEventListener("click", checkAnswer);
  thirdAnswer.addEventListener("click", checkAnswer);
  fourthAnswer.addEventListener("click", checkAnswer);
}

async function checkAnswer(e) {
  if (e.target.getAttribute("data-answer") === quizData[question + 1].answer) {
    question++;

    answerValidation.textContent = "Correct!";

    mainBox.appendChild(answerValidation);
    if (question === Object.keys(quizData).length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      window.location.replace("scores.html");
    } else {
 
      showQuestion();
    }
  } else {
    timeLeft -= 10;
    answerValidation.textContent = "Incorrect!";

    mainBox.appendChild(answerValidation);
  }
}
