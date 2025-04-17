// script.js
const quizData = [
  { question: "Capital of France?", options: ["Berlin", "Paris", "Madrid", "Rome"], answer: "Paris" },
  { question: "5 + 3 = ?", options: ["5", "8", "9", "7"], answer: "8" },
  { question: "Color of the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: "Blue" },
  { question: "Which is a fruit?", options: ["Carrot", "Potato", "Apple", "Onion"], answer: "Apple" },
  { question: "Fastest animal?", options: ["Cheetah", "Elephant", "Dog", "Cat"], answer: "Cheetah" },
  { question: "Water freezes at?", options: ["0°C", "10°C", "100°C", "50°C"], answer: "0°C" },
  { question: "2 * 6 = ?", options: ["10", "12", "8", "14"], answer: "12" },
  { question: "Which is a color?", options: ["Tree", "Blue", "Dog", "Chair"], answer: "Blue" },
  { question: "Planet we live on?", options: ["Mars", "Venus", "Earth", "Jupiter"], answer: "Earth" },
  { question: "Which one can fly?", options: ["Elephant", "Dog", "Bird", "Cat"], answer: "Bird" },
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 30;

function loadQuestion() {
  if (current >= quizData.length) return showResult();

  document.getElementById("question").innerText = quizData[current].question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  quizData[current].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerText = opt;
    btn.onclick = () => selectOption(opt);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("progress").style.width = ((current) / quizData.length) * 100 + "%";
}

function selectOption(selected) {
  if (selected === quizData[current].answer) score++;
  current++;
  loadQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function showResult() {
  clearInterval(timer);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("restartBtn").style.display = "inline-block";

  const resultDiv = document.getElementById("result");
  let emoji = "😐";
  if (score <= 3) emoji = "😢";
  else if (score <= 7) emoji = "😊";
  else if (score <= 9) emoji = "😁";
  else emoji = "🎉";

  resultDiv.innerHTML = `<div class="emoji">${emoji}</div><p>Your Score: ${score}/10</p><p>Thank you for participating in the quiz!</p>`;
  resultDiv.style.display = "block";

  if (score === 10) {
    document.getElementById("fireworks").style.display = "block";
    setTimeout(() => {
      document.getElementById("fireworks").style.display = "none";
    }, 5000);
  }
}

function restartQuiz() {
  current = 0;
  score = 0;
  timeLeft = 30;
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("time").innerText = timeLeft;
  document.getElementById("fireworks").style.display = "none";
  loadQuestion();
  startTimer();
}

window.onload = () => {
  loadQuestion();
  startTimer();
};
