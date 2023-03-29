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
