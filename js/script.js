let quiz = [
  {
    question: "Hvilket styresett har Norge?",
    choices: [
      { id: 1, label: "Republikk" },
      { id: 2, label: "Militærstyre" },
      { id: 3, label: "Konstitusjonelt monarki" },
      { id: 4, label: "Diktatur" },
    ],
    correctAnswer: 3,
  },
  {
    question: "Hvem er Norges konge?",
    choices: [
      { id: 1, label: "Harald V" },
      { id: 2, label: "Olav V" },
      { id: 3, label: "Haakon VII" },
      { id: 4, label: "Frederik X" },
    ],
    correctAnswer: 1,
  },
  {
    question: "Hva er Stortinget?",
    choices: [
      { id: 1, label: "Norges regjering" },
      { id: 2, label: "Norges parlament (nasjonalforsamling)" },
      { id: 3, label: "Norges høyesterett" },
      { id: 4, label: "Norges kongehus" },
    ],
    correctAnswer: 2,
  },
  {
    question: "Hva betyr ordet \"likestilling\"?",
    choices: [
      { id: 1, label: "Alle skal tjene like mye" },
      { id: 2, label: "Kvinner og menn skal ha samme rettigheter og muligheter" },
      { id: 3, label: "Alle skal ha samme jobb" },
      { id: 4, label: "Alle skal bo på samme sted" },
    ],
    correctAnswer: 2,
  },
  {
    question: "Hvilket av disse fagene er vanlig på videregående skole i Norge?",
    choices: [
      { id: 1, label: "Norsk" },
      { id: 2, label: "Astronaut-trening" },
      { id: 3, label: "Militær-trening" },
      { id: 4, label: "Dyrepass" },
    ],
    correctAnswer: 1,
  },
  {
    question: "Hva betyr begrepet \"dugnad\" i norsk kultur?",
    choices: [
      { id: 1, label: "Frivillig arbeid for fellesskapet" },
      { id: 2, label: "En type mat" },
      { id: 3, label: "En skoleeksamen" },
      { id: 4, label: "En sport" },
    ],
    correctAnswer: 1,
  },
  {
    question: "Hva er vanlig arbeidstid i Norge for en fulltidsjobb?",
    choices: [
      { id: 1, label: "Ca. 20 timer per uke" },
      { id: 2, label: "Ca. 37,5 timer per uke" },
      { id: 3, label: "Ca. 50 timer per uke" },
      { id: 4, label: "Ca. 60 timer per uke" },
    ],
    correctAnswer: 2,
  },
  {
    question: "Hva betyr \"ytringsfrihet\"?",
    choices: [
      { id: 1, label: "Rett til å reise fritt" },
      { id: 2, label: "Rett til å si sin mening uten frykt for straff" },
      { id: 3, label: "Rett til gratis skole" },
      { id: 4, label: "Rett til arbeid" },
    ],
    correctAnswer: 2,
  },
  {
    question: "Hva er en kommune i Norge?",
    choices: [
      { id: 1, label: "En type skole" },
      { id: 2, label: "En lokal administrativ enhet som styrer tjenester i et område" },
      { id: 3, label: "En organisasjon" },
      { id: 4, label: "En bedrift" },
    ],
    correctAnswer: 2,
  },
  {
    question: "Hva er målet med videregående opplæring i Norge?",
    choices: [
      { id: 1, label: "Bare å gi karakterer" },
      { id: 2, label: "Å forberede elever til jobb eller høyere utdanning" },
      { id: 3, label: "Å lære sport" },
      { id: 4, label: "Å lære bare norsk språk" },
    ],
    correctAnswer: 2,
  },
  {
    question: "",
    video: "https://drive.google.com/file/d/1EOHYPGfF-V9nMWjCm49xbmbU2XD2QgX5/preview",
    choices: [
      { id: 1, label: "Kokken har lamme lår" },
      { id: 2, label: "Ananas ringer i salaten" },
      { id: 3, label: "Det er godt med isbiter" },
    ],
    correctAnswer: 3,
  },
];

let chosenAnswer = false;
let feedback = document.getElementById("feedback");
let count = 0;
let nextButton = document.getElementById("next");
let points = 0;

function loadQuiz() {
  if (quiz.length <= count) {
    document.getElementById("quizhero").innerHTML = "";
    document.getElementById("results").style.display = "";
    document.getElementById("points").innerHTML = `${points}/${quiz.length} rett`;
    renderLeaderboard();
  } else {
    let quizquestion = quiz[count];
    let question = document.getElementById("question");
    let buttonsContainer = document.getElementById("quizbuttons");
    buttonsContainer.innerHTML = "";

    if (quizquestion.video !== undefined) {
      document.getElementById("video").innerHTML =
        `<iframe src="${quizquestion.video}" width="426" height="240" allow="autoplay"></iframe>`;
    } else {
      document.getElementById("video").innerHTML = "";
    }

    question.textContent = quizquestion.question;

    quizquestion.choices.forEach(button => {
      buttonsContainer.innerHTML +=
        `<button id="${button.id}" onclick="checkAnswer(${button.id}, ${quizquestion.correctAnswer})">${button.label}</button>`;
    });

    equalizeButtonHeights();
  }
}

function equalizeButtonHeights() {
  const buttons = document.querySelectorAll("#quizbuttons button");
  buttons.forEach(btn => btn.style.height = "auto");
  const maxHeight = Math.max(...[...buttons].map(btn => btn.offsetHeight));
  buttons.forEach(btn => btn.style.height = maxHeight + "px");
}

function checkAnswer(buttonid, correctAnswer) {
  if (chosenAnswer) return;
  count++;
  chosenAnswer = true;

  const isCorrect = buttonid === correctAnswer;
  if (isCorrect) {
    points++;
    feedback.innerHTML = "Du hadde rett!";
    document.getElementById(buttonid).setAttribute("class", "correct");
  } else {
    feedback.innerHTML = "Du tok feil...";
    document.getElementById(buttonid).setAttribute("class", "wrong");
  }

  nextButton.innerHTML = `<button onclick="nextQuestion()">Neste</button>`;
}

function nextQuestion() {
  chosenAnswer = false;
  feedback.textContent = "";
  nextButton.innerHTML = "";
  loadQuiz();
}

// ---- Leaderboard ----

function saveScore() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    alert("Skriv inn et navn først!");
    return;
  }

  const scores = getScores();
  scores.push({ name, points, total: quiz.length, date: new Date().toLocaleDateString("nb-NO") });
  scores.sort((a, b) => b.points - a.points);

  localStorage.setItem("quizLeaderboard", JSON.stringify(scores));

  document.getElementById("nameentry").style.display = "none";
  renderLeaderboard();
}

function getScores() {
  return JSON.parse(localStorage.getItem("quizLeaderboard") || "[]");
}

function renderLeaderboard() {
  const scores = getScores();
  const list = document.getElementById("leaderboardList");

  if (scores.length === 0) {
    list.innerHTML = "<li style='justify-content:center'>Ingen resultater ennå</li>";
    return;
  }

  list.innerHTML = scores.map((s, i) =>
    `<li>
      <span>${i + 1}. ${s.name}</span>
      <span>${s.points}/${s.total}</span>
    </li>`
  ).join("");
}

function clearLeaderboard() {
  if (confirm("Er du sikker på at du vil slette alle resultater?")) {
    localStorage.removeItem("quizLeaderboard");
    renderLeaderboard();
  }
}

loadQuiz();