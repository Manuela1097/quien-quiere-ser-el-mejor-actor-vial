
const questions = [
  {
    question: "¿Cuál es el límite de velocidad en zona urbana en la mayoría de los países?",
    options: {
      A: "30 km/h",
      B: "50 km/h",
      C: "70 km/h",
      D: "90 km/h"
    },
    correct: "B"
  },
  {
    question: "¿Qué indica una luz amarilla intermitente en un semáforo?",
    options: {
      A: "Alto total",
      B: "Precaución",
      C: "Avance sin detenerse",
      D: "Paso exclusivo para ciclistas"
    },
    correct: "B"
  }
];

let currentQuestion = 0;
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const winSound = new Audio("sounds/win.mp3");
const timerSound = new Audio("sounds/timer.mp3");
let timerInterval;
let timeLeft = 30;

function startTimer() {
  timeLeft = 30;
  document.getElementById("timer").textContent = `⏱ Tiempo: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏱ Tiempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      wrongSound.play();
      alert("⏰ Tiempo agotado. Fin del juego.");
      currentQuestion = 0;
      loadQuestion();
    }
  }, 1000);
  timerSound.play();
}

function loadQuestion() {
  clearInterval(timerInterval);
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  document.getElementById("optionA").textContent = `A: ${q.options.A}`;
  document.getElementById("optionB").textContent = `B: ${q.options.B}`;
  document.getElementById("optionC").textContent = `C: ${q.options.C}`;
  document.getElementById("optionD").textContent = `D: ${q.options.D}`;
  ["A", "B", "C", "D"].forEach(letter => {
    const btn = document.getElementById("option" + letter);
    btn.style.visibility = "visible";
    btn.classList.remove("correct", "wrong");
  });
  startTimer();
}

function checkAnswer(answer) {
  clearInterval(timerInterval);
  const correct = questions[currentQuestion].correct;
  const selectedBtn = document.getElementById("option" + answer);
  if (answer === correct) {
    selectedBtn.classList.add("correct");
    correctSound.play();
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        winSound.play();
        alert("🎉 ¡Felicidades, completaste el juego!");
      }
    }, 1000);
  } else {
    selectedBtn.classList.add("wrong");
    wrongSound.play();
    setTimeout(() => {
      alert("❌ Respuesta incorrecta. Fin del juego.");
      currentQuestion = 0;
      loadQuestion();
    }, 1000);
  }
}

["A", "B", "C", "D"].forEach(letter => {
  document.getElementById("option" + letter).addEventListener("click", () => checkAnswer(letter));
});

let used5050 = false;
document.getElementById("fiftyFifty").addEventListener("click", () => {
  if (used5050) return;
  used5050 = true;
  const correct = questions[currentQuestion].correct;
  const allOptions = ["A", "B", "C", "D"];
  const incorrects = allOptions.filter(opt => opt !== correct);
  const toHide = incorrects.sort(() => 0.5 - Math.random()).slice(0, 2);
  toHide.forEach(opt => {
    document.getElementById("option" + opt).style.visibility = "hidden";
  });
});

let usedPhone = false;
document.getElementById("phoneAFriend").addEventListener("click", () => {
  if (usedPhone) return;
  usedPhone = true;
  const correct = questions[currentQuestion].correct;
  alert("📞 Tu amigo dice: Estoy bastante seguro que la respuesta es la " + correct);
});

let usedAudience = false;
document.getElementById("askAudience").addEventListener("click", () => {
  if (usedAudience) return;
  usedAudience = true;
  const correct = questions[currentQuestion].correct;
  let percentages = { A: 15, B: 15, C: 15, D: 15 };
  percentages[correct] += 40;
  alert(`👥 El público opina:
A: ${percentages.A}%
B: ${percentages.B}%
C: ${percentages.C}%
D: ${percentages.D}%`);
});

window.onload = loadQuestion;
