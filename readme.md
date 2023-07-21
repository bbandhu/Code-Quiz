Quiz Application

This is a simple JavaScript-based quiz application. The application allows users to answer multiple-choice questions within a set time limit, keeps track of the user's score, and allows them to submit their initials and score to a high-score list stored in their local browser storage.

# How to Run

Open index.html in your browser.
# Features

Quiz starts when the user clicks the "Start Quiz" button.
The user is presented with a series of questions and has to select one of the provided choices.
The user's score increases by 1 for every correct answer.
10 seconds are deducted from the remaining time for every incorrect answer.
When the user finishes the quiz or the time runs out, they are shown their final score.
The user can enter their initials and submit their score to the high-score list.
High scores are stored in local storage and displayed in descending order.
The user can restart the quiz at any time by clicking the "Restart Quiz" button.
Code Structure

The application is primarily written in JavaScript, with the quiz data (questions, choices, and correct answers) stored in an array of objects. The code interacts with the DOM to update the question display, track user inputs, manage the timer, and update the high-score list.


# Future Improvements

Add more questions to the quiz data array.
Improve the user interface and experience.
Implement a feature to clear the high-score list.
Allow users to compete in different categories of quizzes.



