let quiz = [
  {
    category: "Elektro og datateknologi",
    question: "Hva måles i Ohm (Ω)?",
    choices: [
      { id: 1, label: "Strøm" },
      { id: 2, label: "Motstand" },
      { id: 3, label: "Spenning" },
      { id: 4, label: "Effekt" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Helse- og oppvekstfag",
    question: "Hva er normal kroppstemperatur hos mennesker?",
    choices: [
      { id: 1, label: "35°C" },
      { id: 2, label: "37°C" },
      { id: 3, label: "39°C" },
      { id: 4, label: "40°C" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Idrettsfag",
    question: "Hva er kroppens viktigste energikilde under hard trening?",
    choices: [
      { id: 1, label: "Protein" },
      { id: 2, label: "Karbohydrater" },
      { id: 3, label: "Vann" },
      { id: 4, label: "Vitaminer" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Medier og kommunikasjon",
    question: "Hva betyr målgruppe i media?",
    choices: [
      { id: 1, label: "Hvor reklamen sendes" },
      { id: 2, label: "Hvem budskapet er laget for" },
      { id: 3, label: "Hvor videoen spilles inn" },
      { id: 4, label: "Hvor mange som ser" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Påbygging til generell studiekompetanse",
    question: "Hvilket fagområde studerer samfunn og politikk?",
    choices: [
      { id: 1, label: "Sosiologi" },
      { id: 2, label: "Biologi" },
      { id: 3, label: "Fysikk" },
      { id: 4, label: "Geografi" },
    ],
    correctAnswer: 1,
  },
  {
    category: "Salg, service og reiseliv",
    question: "Hva er god kundeservice?",
    choices: [
      { id: 1, label: "Å ignorere kunder" },
      { id: 2, label: "Å hjelpe kunder på en vennlig og profesjonell måte" },
      { id: 3, label: "Å selge mest mulig" },
      { id: 4, label: "Å snakke lite" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Teknologi- og industrifag",
    question: "Hva brukes en dreiebenk til?",
    choices: [
      { id: 1, label: "Sveising" },
      { id: 2, label: "Bearbeiding av roterende materialer" },
      { id: 3, label: "Maling" },
      { id: 4, label: "Montering" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Informasjonsteknologi og medieproduksjon",
    question: "Hva betyr HTML?",
    choices: [
      { id: 1, label: "HyperText Markup Language" },
      { id: 2, label: "HighText Machine Language" },
      { id: 3, label: "Hyper Transfer Media Link" },
      { id: 4, label: "Home Tool Markup Language" },
    ],
    correctAnswer: 1,
  },
  {
    category: "Demokrati og medborgerskap",
    question: "Hva regnes som mobbing?",
    choices: [
      { id: 1, label: "En enkelt krangel mellom venner" },
      { id: 2, label: "Gjentatt negativ atferd mot en person over tid" },
      { id: 3, label: "Å være uenig med noen" },
      { id: 4, label: "Å gi konstruktiv kritikk" },
    ],
    correctAnswer: 2,
  },
  {
    category: "Kombinasjonsklasse",
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

    document.getElementById("category").textContent = quizquestion.category;

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

const homeList = document.getElementById("homeLeaderboardList");
if (homeList) {
  const scores = getScores().slice(0, 4);
  if (scores.length === 0) {
    homeList.innerHTML = "<li style='justify-content:center'>Ingen resultater ennå</li>";
  } else {
    homeList.innerHTML = scores.map((s, i) =>
      `<li>
        <span>${i + 1}. ${s.name}</span>
        <span>${s.points}/${s.total}</span>
      </li>`
    ).join("");
  }
}

loadQuiz();