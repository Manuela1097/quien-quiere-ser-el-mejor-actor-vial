
const questions = [
  {
    question: "¿Cuál es el equipo mínimo de seguridad para un motociclista?",
    options: ["Solo casco", "Casco y guantes", "Casco, chaqueta, guantes y botas", "Camiseta y jeans"],
    correct: "C"
  },
  {
    question: "¿Qué debes hacer ante un semáforo en rojo?",
    options: ["Pasar si no viene nadie", "Esperar el verde", "Tocar la bocina y pasar", "Girar sin detenerse"],
    correct: "B"
  }
];

let currentQuestion = 0;

const questionElement = document.getElementById("question");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");

const progressList = document.getElementById("progressList");
questions.forEach((q, index) => {
  const li = document.createElement("li");
  li.id = "step" + index;
  li.textContent = `Pregunta ${index + 1}`;
  progressList.prepend(li);
});

function loadQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  optionA.textContent = "A: " + q.options[0];
  optionB.textContent = "B: " + q.options[1];
  optionC.textContent = "C: " + q.options[2];
  optionD.textContent = "D: " + q.options[3];

  document.querySelectorAll("#progressList li").forEach(li => li.classList.remove("active"));
  document.getElementById("step" + currentQuestion).classList.add("active");
}

optionA.onclick = () => checkAnswer("A");
optionB.onclick = () => checkAnswer("B");
optionC.onclick = () => checkAnswer("C");
optionD.onclick = () => checkAnswer("D");

function checkAnswer(answer) {
  if (answer === questions[currentQuestion].correct) {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      alert("¡Ganaste!");
    }
  } else {
    alert("Respuesta incorrecta. Intenta de nuevo.");
  }
}

loadQuestion();
