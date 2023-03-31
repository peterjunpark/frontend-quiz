var landing = document.querySelector("#landing");
var startMenu = document.querySelector("#start-menu");
var startBtn = document.querySelector("#start-btn");
var scoreboardBtn = document.querySelector("#scoreboard-btn");
var score = document.querySelector("#score");
var scoreForm = document.querySelector("#score-form");
var scoresList = document.querySelector("#scores-list");
var endScore = document.querySelector("#save-score");
var initialsField = document.querySelector("#initials");
var playAgainBtn = document.querySelector("#play-again");
var clearScoresBtn = document.querySelector("#clear-score");
var timer = document.querySelector("#timer");
var questionH3 = document.querySelector("#question");
var questionNumberH3 = document.querySelector("#question-number");
var questionTypeImg = document.querySelector("#question-type");
var questionContainer = document.querySelector("#question-container");
var answersContainer = document.querySelector("#answers-container");
var scoreboardContainer = document.querySelector("#scoreboard-container");
var highscores = [];

// Utility to shuffle order of arrays. Use to shuffle questionsList array and answers array.
function shuffle(array) {
  var correctI = 0;

  for (i in array) {
    var randomI = Math.floor(Math.random() * array.length);

    [array[i], array[randomI]] = [array[randomI], array[i]];

    // When shuffling answers, keep track of the correct answer's index.
    if (i == correctI) correctI = randomI;
    else if (randomI == correctI) correctI = i;
  }
  return correctI;
}

function saveToLocal() {
  localStorage.setItem("scoreHistory", JSON.stringify(highscores));
  scoreForm.classList.add("hide");
}

function updateScores() {
  if (JSON.parse(localStorage.getItem("scoreHistory")) == null) {
    var noScore = document.createElement("li");
    noScore.setAttribute("class", "monospace");
    noScore.innerHTML = "No highscores";
    clearScoresBtn.classList.add("hide");
  } else {
  }

  highscores = JSON.parse(localStorage.getItem("scoreHistory"));
  for (i in highscores) {
    var scoreItem = document.createElement("li");
    scoreItem.setAttribute("class", "monospace");
    scoreItem.innerHTML = `${highscores[i].initials} | ${highscores[i].score} points`;
    scoresList.appendChild(scoreItem);
  }
}

function showScoreboard() {
  landing.style.display = "block";
  questionContainer.classList.replace("flex", "hide");
  answersContainer.classList.replace("flex", "hide");
  scoreboardContainer.classList.replace("hide", "flex");
  startMenu.classList.replace("flex", "hide");
  scoresList.replaceChildren();
  updateScores();

  playAgainBtn.addEventListener("click", () => {
    scoreboardContainer.classList.replace("flex", "hide");
    startMenu.classList.replace("hide", "flex");
  });

  clearScoresBtn.addEventListener("click", () => {
    highscores = [];
    scoresList.replaceChildren();
    saveToLocal();
  });
}

function startQuiz() {
  var questionsList = [
    // ! Correct answer must be at index of 0.
    {
      question: "Which of these is a class selector?",
      category: "css",
      answers: [
        ".container",
        "#container",
        "container",
        "(container)",
      ],
    },
    {
      question: "Which of the following is not a relative length unit used in styling?",
      category: "css",
      answers: [
        "in",
        "vh",
        "rem",
        "rem",
      ],
    },
    {
      question: "Which of the following is an example of a pseudo-element?",
      category: "css",
      answers: [
        "::before",
        ":before",
        "[before]",
        ">before",
      ],
    },
    {
      question: "What element do you use to refer to a CSS stylesheet in an HTML document?",
      category: "css",
      answers: [
        "<link>",
        "<script>",
        "<a>",
        "<src>",
      ],
    },
    {
      question:
        "What are the parts of the box model from innermost to outermost?",
      category: "css",
      answers: [
        "content, padding, border, margin",
        "content, margin, border, padding",
        "content, padding, margin, border",
        "content, border, padding, margin",
      ],
    },
    {
      question: "What attribute should you use to open a link in a new tab?",
      category: "html",
      answers: [
        'target="_blank"',
        'target="blank_"',
        'target="_tab"',
        'target="new-tab"',
      ],
    },
    {
      question: "Which of these tags should you not place in the <body> section of your document?",
      category: "html",
      answers: [
        '<meta>',
        '<a>',
        '<header>',
        '<script>',
      ],
    },
    {
      question:
        "Which attribute specifies descriptive text for an image used if the image cannot be displayed?",
      category: "html",
      answers: ["alt", "href", "id", "name"],
    },
    {
      question: "Which of the following symbols represents strict equality?",
      category: "js",
      answers: ["===", "==", "="],
    },
    {
      question:
        "The Document Object Model is a web API baked into modern browsers that represents the structure of an HTML document as a tree?",
      category: "js",
      answers: ["True", "False"],
    },
    {
      question:
        "The document method querySelectorAll() returns a value of which type?",
      category: "js",
      answers: ["array", "string", "number", "boolean"],
    },
    {
      question: "Which of the following is not a primitive type?",
      category: "js",
      answers: ["object", "bigint", "boolean", "undefined"],
    },
    {
      question: "Are function expressions hoisted?",
      category: "js",
      answers: ["false", "true", "sometimes"],
    },
    {
      question: 'What does "1" + 1 evaluate to?',
      category: "js",
      answers: ['"11"', "11", "2", '"2"'],
    },
    {
      question: "What does the [].push() method do?",
      category: "js",
      answers: [
        "Adds an element to the end of the array",
        "Removes the last element of the array",
        "Adds an element to the start of the array",
        "Removes the first element of the array",
      ],
    },
    {
      question:
        "What command can you use to switch to another branch (and create it if it doesn't exist)?",
      category: "git",
      answers: [
        'git checkout -b "..."',
        'git add -b "..."',
        'git branch -c "..."',
        'git new -b "..."',
      ],
    },
    {
      question: "What command lets you see a repository's commit history?",
      category: "git",
      answers: ["git log", "git history", "git branch", "git status"],
    },
  ];

  var currentQuestion = 0;
  var correctAnswer = 0;
  var points = 0;
  var time = 90;

  landing.style.display = "none";
  questionContainer.classList.replace("hide", "flex");
  answersContainer.classList.replace("hide", "flex");

  shuffle(questionsList);

  function startTimer() {
    var timerInterval = setInterval(() => {
      timer.innerHTML = "Time remaining: " + time.toFixed(2);
      time -= 0.01;

      if (time < 0) {
        clearInterval(timerInterval);
        clearQuiz();
      }
    });
  }

  function populateQuiz() {
    var question = questionsList[currentQuestion].question;
    var questionType = questionsList[currentQuestion].category;
    var answers = questionsList[currentQuestion].answers;

    clearQuiz();

    score.innerHTML = "Score: " + points;
    score.style.color = "";
    timer.style.color = "";

    // Populate question.
    questionH3.innerHTML = question;
    questionNumberH3.innerHTML = "Question " + (currentQuestion + 1);
    questionTypeImg.setAttribute("src", `./assets/images/${questionType}.svg`);

    // Shuffle answers and keep track of correct answer's index.
    correctAnswer = shuffle(answers);

    // Populate answers.
    for (i in answers) {
      var answerBtn = document.createElement("button");
      answersContainer.appendChild(answerBtn);
      answerBtn.innerHTML = answers[i];
      answerBtn.classList.add("monospace");
      answerBtn.addEventListener("click", checkAnswer);
      //Add marker to correct answer.
      if (i == correctAnswer) {
        answerBtn.setAttribute("data-correct", "");
      }
    }
  }

  function checkAnswer(e) {
    // Display feedback, add points, subtract time.
    if (e.target.hasAttribute("data-correct")) {
      e.target.style.backgroundColor = "lightgreen";
      score.style.color = "green";
      points += 10;
    } else {
      e.target.style.backgroundColor = "lightcoral";
      timer.style.color = "red";
      time -= 10;
    }
    // Queue up next question.
    if (currentQuestion !== questionsList.length - 1) {
      currentQuestion++;
      setTimeout(() => {
        populateQuiz();
      }, 400);
    } else {
      clearQuiz();
      saveScore();
    }
  }

  function clearQuiz() {
    score.innerHTML = "";
    timer.innerHTML = "";
    questionH3.innerHTML = "";
    questionNumberH3.innerHTML = "";
    questionTypeImg.removeAttribute("src");
    answersContainer.replaceChildren();

    if (time < 0) saveScore();
  }

  function saveScore() {
    time = 0;
    showScoreboard();
    scoreForm.classList.remove("hide");
    endScore.innerHTML = `You scored ${points} points.`;
  }

  scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Add score to scoreboard.
    var name = initialsField.value.toUpperCase().trim();
    var scoreData = {
      initials: name,
      score: points,
    };

    // Add score to localStorage.
    highscores.push(scoreData);
    saveToLocal();
    location.reload();
  });

  startTimer();
  populateQuiz();
}

startBtn.addEventListener("click", startQuiz);
scoreboardBtn.addEventListener("click", showScoreboard);
