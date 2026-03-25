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
];



function loadQuiz() {
    console.log("quiz loaded!");

    let firstElement = quiz[0];

    console.log(firstElement);

    let question = document.getElementById("question");
    let buttonsContainer = document.getElementById("quizbuttons");


    question.textContent += `${firstElement.question}`;

    let buttons = firstElement.choices;
    
    buttons.forEach(button => {
        buttonsContainer.innerHTML += `<button id="${button.id}" onclick="checkAnswer(${button.id}, ${firstElement.correctAnswer})">${button.label}</button>`;
    })
}

let chosenAnswer = false;



function checkAnswer(buttonid, correctAnswer) {
    console.log(buttonid, correctAnswer);

    let feedback = document.getElementById("feedback");
    let isCorrect = buttonid === correctAnswer;

    console.log(isCorrect);

    if(isCorrect && !chosenAnswer) {
        feedback.innerHTML = "Du hadde rett!"
        document.getElementById(buttonid).setAttribute("class","correct");
    } else if (!isCorrect && !chosenAnswer) {
        feedback.innerHTML = "Du tok feil..."
        document.getElementById(buttonid).setAttribute("class","wrong");
    }

    chosenAnswer = true;

    if(chosenAnswer) {
        let nextButton = document.getElementById("next")

        nextButton.innerHTML += `<button onClick="nextQuestion()">Next</button>`
    }

}

function nextQuestion() {
    
}

loadQuiz();