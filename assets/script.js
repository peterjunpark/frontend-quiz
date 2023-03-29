var landing = document.querySelector("#landing");
var startBtn = document.querySelector("#start-btn");
var left = document.querySelector("#left");
var right = document.querySelector("#right");

function renderQuiz() {
  // Remove homepage.
  landing.style.display = "none";

  var questionNumber = document.createElement("h3");
  var question = document.createElement("h3");
  questionNumber.innerHTML = "Question Number One";
  question.innerHTML = "Question Text One";
  left.appendChild(questionNumber);
  left.appendChild(question);
}

startBtn.addEventListener("click", renderQuiz);
