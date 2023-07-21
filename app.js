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

const startButton = document.getElementById("start");
const questionContainer = document.getElementById("question-container");
const questionDiv = document.createElement("div");
const questionHeader = document.createElement("h2");
const choicesList = document.createElement("ul");

questionDiv.appendChild(questionHeader);
questionDiv.appendChild(choicesList);
questionContainer.appendChild(questionDiv);

let score = 0; // initialize score

function displayQuestion() {
  let currentQuestion = quizData[currentQuestionIndex];
  questionHeader.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

  choicesList.innerHTML = ''; // Clear out any previous choices

  currentQuestion.choices.forEach((choice) => {
    const choiceItem = document.createElement("li");
    const choiceButton = document.createElement("button");
    /*space between each choice */
    choiceButton.style.margin = '5px';
    choiceButton.textContent = choice;
    choiceItem.appendChild(choiceButton);

    choiceButton.addEventListener('click', () => {
      if(choice === currentQuestion.answer) {
        score++; // increase score if the answer is correct
      }
      currentQuestionIndex++;

      if (currentQuestionIndex < quizData.length) {
        displayQuestion();
      }
      else {
        // end the quiz and show score
        console.log(`Quiz finished! Your score: ${score}`);
      }
    });

    choicesList.appendChild(choiceItem);
  });
}
startButton.addEventListener("click", () => {
  startButton.style.display = 'none'; // Hide start button
  displayQuestion();
});