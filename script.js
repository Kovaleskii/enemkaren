const questions = [
  {
    question: "1. O que significa a sigla ENEM?",
    answers: [
      { id: 1, text: "Exame Nacional do Ensino Médio", correct: true },
      { id: 2, text: "Educação Nacional do Ensino Moderno", correct: false },
      { id: 3, text: "Estudo Nacional de Ensino Médio", correct: false },
      { id: 4, text: "Exame Nacional de Educação Moderna", correct: false }
    ]
  },
  {
    question: "2. Qual é o principal objetivo do ENEM?",
    answers: [
      { id: 1, text: "Selecionar alunos para escolas particulares", correct: false },
      { id: 2, text: "Avaliar o desempenho dos estudantes e acesso ao ensino superior", correct: true },
      { id: 3, text: "Conceder bolsas para cursos técnicos", correct: false },
      { id: 4, text: "Certificar a conclusão do ensino fundamental", correct: false }
    ]
  },
  {
    question: "3. Em que ano o ENEM foi criado?",
    answers: [
      { id: 1, text: "1998", correct: true },
      { id: 2, text: "2005", correct: false },
      { id: 3, text: "1992", correct: false },
      { id: 4, text: "2000", correct: false }
    ]
  },
  {
    question: "4. Quantos dias de prova o ENEM possui atualmente (após 2017)?",
    answers: [
      { id: 1, text: "Um dia", correct: false },
      { id: 2, text: "Dois dias", correct: true },
      { id: 3, text: "Três dias", correct: false },
      { id: 4, text: "Quatro dias", correct: false }
    ]
  },
  {
    question: "5. A redação do ENEM deve ser escrita em:",
    answers: [
      { id: 1, text: "Linguagem poética", correct: false },
      { id: 2, text: "Linguagem informal", correct: false },
      { id: 3, text: "Linguagem culta e dissertativo-argumentativa", correct: true },
      { id: 4, text: "Linguagem técnica e científica", correct: false }
    ]
  },
  {
    question: "6. Qual destas áreas NÃO faz parte do ENEM?",
    answers: [
      { id: 1, text: "Ciências Humanas", correct: false },
      { id: 2, text: "Matemática e suas Tecnologias", correct: false },
      { id: 3, text: "Educação Física", correct: true },
      { id: 4, text: "Linguagens e Códigos", correct: false }
    ]
  },
  {
    question: "7. Quantas questões possui o ENEM ao todo (sem contar a redação)?",
    answers: [
      { id: 1, text: "120", correct: false },
      { id: 2, text: "180", correct: true },
      { id: 3, text: "160", correct: false },
      { id: 4, text: "200", correct: false }
    ]
  },
  {
    question: "8. Qual é o tipo de texto exigido na redação do ENEM?",
    answers: [
      { id: 1, text: "Narrativo", correct: false },
      { id: 2, text: "Dissertativo-argumentativo", correct: true },
      { id: 3, text: "Descritivo", correct: false },
      { id: 4, text: "Expositivo", correct: false }
    ]
  },
  {
    question: "9. Qual é o órgão responsável pela aplicação do ENEM?",
    answers: [
      { id: 1, text: "MEC", correct: false },
      { id: 2, text: "INEP", correct: true },
      { id: 3, text: "ENAD", correct: false },
      { id: 4, text: "CAPES", correct: false }
    ]
  },
  {
    question: "10. Qual destes temas seria adequado para uma redação do ENEM?",
    answers: [
      { id: 1, text: "Como fazer amigos na internet", correct: false },
      { id: 2, text: "Desafios da inclusão social de pessoas com deficiência no Brasil", correct: true },
      { id: 3, text: "A história da televisão brasileira", correct: false },
      { id: 4, text: "A vida de um influenciador digital", correct: false }
    ]
  }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.dataset.id = answer.id;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(e) {
  const answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.find((answer) => answer.correct === true);

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length} questões! 🎯`;
  nextButton.innerHTML = "Jogar novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();