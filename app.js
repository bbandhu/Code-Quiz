// Create an array of objects each containing a question and the possible answers
// We assume 'a' is the correct answer here. You may adjust as needed.
var questions = [
  {question: "Question 1?", answers: ["a", "b", "c", "d"], correct: "a"},
  {question: "Question 2?", answers: ["a", "b", "c", "d"], correct: "b"},
  {question: "Question 3?", answers: ["a", "b", "c", "d"], correct: "c"},
  //... add as many questions as needed
];

var score = 0;
var currentQuestion = 0;
var timeLeft = 100; // Start timer at 100 seconds, adjust as needed
var timer;

// Start the quiz when the start button is clicked
document.getElementById("start").addEventListener("click", function() {
  document.querySelector(".title").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if(timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  displayQuestion();
});

// Display the current question
function displayQuestion() {
  var question = questions[currentQuestion];
  document.getElementById("question-title").textContent = question.question;
  
  var choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = ''; // Clear out any previous choices

  // Display the choices and add click handlers for them
  question.answers.forEach(function(choice, i) {
    var button = document.createElement("button");
    button.textContent = choice;
    button.onclick = function() {
      checkAnswer(choice);
    };

    choicesDiv.appendChild(button);
  });
}

// Check the answer, update the score if correct, decrease time if incorrect
function checkAnswer(answer) {
  if(answer === questions[currentQuestion].correct) {
    score++;
  } else {
    timeLeft -= 15; // Subtract 15 seconds for a wrong answer, adjust as needed
  }

  if(currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    endGame();
  }
}

// End the game, stop the timer, allow the user to save their score
function endGame() {
  clearInterval(timer);
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  document.getElementById("final-score").textContent = score;
}

// Save the score and initials to local storage
document.getElementById("submit").addEventListener("click", function() {
  var initials = document.getElementById("initials").value;
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var newScore = {
    initials: initials,
    score: score
  };

  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
});