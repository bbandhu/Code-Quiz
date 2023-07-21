let quizData = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

let currentQuestionIndex = 0;
let score = 0; // initialize score
let timer = 60; // initialize timer with 60 seconds

const startButton = document.getElementById("start");
const questionContainer = document.getElementById("question-container");
const questionDiv = document.createElement("div");
const questionHeader = document.createElement("h2");
const choicesList = document.createElement("ul");
const timerDisplay = document.getElementById("time");
const feedbackDiv = document.getElementById("feedback");

questionDiv.appendChild(questionHeader);
questionDiv.appendChild(choicesList);
questionContainer.appendChild(questionDiv);

function displayQuestion() {
  if (currentQuestionIndex >= quizData.length || timer <= 0) {
    // end the quiz and show score
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").textContent = score;
    console.log(`Quiz finished! Your score: ${score}`);
    clearInterval(intervalId); // Stop the timer
    return;
  }
  
  let currentQuestion = quizData[currentQuestionIndex];
  questionHeader.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

  choicesList.innerHTML = ''; // Clear out any previous choices
  feedbackDiv.innerHTML = ''; // Clear out any previous feedback

  currentQuestion.choices.forEach((choice) => {
    const choiceItem = document.createElement("li");
    const choiceButton = document.createElement("button");
    /*space between each choice */
    choiceButton.style.margin = '5px';
    choiceButton.textContent = choice;
    choiceItem.appendChild(choiceButton);

    choiceButton.addEventListener('click', (event) => {
      let selectedChoice = event.target;
      if(selectedChoice.textContent === currentQuestion.answer) {
        score++; // increase score if the answer is correct
        feedbackDiv.textContent = "Correct!";
      } else {
        timer -= 10; // subtract 10 seconds for incorrect answer
        feedbackDiv.textContent = "Wrong!";
      }
      // Show feedback for a bit before moving to the next question
      setTimeout(() => {
        feedbackDiv.textContent = "";
        currentQuestionIndex++;
        displayQuestion();
      }, 1000);
    });
    choicesList.appendChild(choiceItem);
  });
}

let intervalId;

startButton.addEventListener("click", () => {
  startButton.style.display = 'none'; // Hide start button

  // Start timer
  intervalId = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(intervalId); // Stop the timer
      displayQuestion(); // End quiz when timer reaches 0
    }
  }, 1000);

  displayQuestion();
});

function goToHighScores() {
  // hide other screens
  document.getElementById("question-container").classList.add("hide");
  document.getElementById("end-screen").classList.add("hide");
  
  // retrieve high scores from local storage and sort them
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.sort((a, b) => b.score - a.score);

  // create and append each score to our high scores list
  let highScoreList = document.getElementById("high-scores");
  highScoreList.innerHTML = '';
  highscores.forEach((scoreObj) => {
    let li = document.createElement("li");
    li.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
    highScoreList.appendChild(li);
  });

  // show high scores screen
  document.getElementById("high-scores-screen").classList.remove("hide");
}
document.getElementById("submit").addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  let initials = document.getElementById("initials").value;
  // Save initials and score to local storage
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({initials: initials, score: score});
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // transition to high scores "page"
  goToHighScores();
});

document.getElementById("restart").addEventListener('click', () => {
  // reset quiz and timer variables
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;

  // transition back to start screen
  document.getElementById("high-scores-screen").classList.add("hide");
  document.getElementById("start").style.display = 'block';
  //click on start button to start quiz
  startButton.click();
  displayQuestion();

});

