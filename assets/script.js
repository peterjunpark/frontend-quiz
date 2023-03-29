var questionsList = [
  // ! Correct answer must be at index of 0.
  {
    question: "Which of these is a class selector?",
    category: "css",
    answers: [
      "<code>.container</code>",
      "<code>#container</code>",
      "<code>container</code>",
      "<code>(container)</code>",
    ],
  },
  {
    question: "What attribute should you use to open a link in a new tab?",
    category: "html",
    answers: [
      '<code>target="_blank"</code>',
      '<code>target="blank_"</code>',
      '<code>target="_tab"</code>',
      '<code>target="new-tab"</code>',
    ],
  },
  {
    question: "Which of these is not a typical way of defining a function?",
    category: "js",
    answers: [
      "function inversion",
      "function expression",
      "function declaration",
      "arrow function",
    ],
  },
  {
    question:
      "The document method <code>querySelectorAll()</code> returns a value of which type?",
    category: "js",
    answers: ["array", "string", "number", "boolean"],
  },
  {
    question:
      "What command can you use to create a new branch and switch to it?",
    category: "git",
    answers: [
      '<code>git checkout -b "newbranch"</code>',
      '<code>git add -b "newbranch"</code>',
      '<code>git branch -c "newbranch"</code>',
      '<code>git new -b "newbranch"</code>',
    ],
  },
];

var landing = document.querySelector("#landing");
var startBtn = document.querySelector("#start-btn");
var left = document.querySelector("#left");
var right = document.querySelector("#right");

// Utility to shuffle order of arrays. Use to shuffle questionsList array and answers array.
function shuffle(array) {
  var correctI = 0;

  for (i in array) {
    var randomI = Math.floor(Math.random() * array.length);

    [array[i], array[randomI]] = [array[randomI], array[i]];

    // When shuffling answers, keep track of the correct answer's index.
    i == correctI ? correctI = randomI : correctI = i;
  }
  return array[correctI];
}

function startQuiz() {
  var currentQuestion = 1;
  // Remove homepage.
  landing.style.display = "none";

  function populateQuiz() {
    var questionType = questionsList[currentQuestion].category;

    shuffle(questionsList);
    // Questions
    document.querySelector("#question-type").setAttribute("src", `./assets/images/${questionType}.svg`)
    document.querySelector("#question-number").innerHTML = "Question Number One";
    document.querySelector("#question").innerHTML = "Question Text One";
  }

  populateQuiz();
}

startBtn.addEventListener("click", startQuiz);
