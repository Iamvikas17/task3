// Toggle dark mode
const toggleBtn = document.getElementById("darkModeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
});

// Multiple Quiz Questions
const quizData = [
  {
    text: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style Syntax", "Computer Style System", "Coding Style Structure"],
    answer: "Cascading Style Sheets"
  },
  {
    text: "What is the correct way to link a CSS file?",
    options: ["<script src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<css>style.css</css>"],
    answer: "<link rel='stylesheet' href='style.css'>"
  },
  {
    text: "Which tag is used to insert JavaScript?",
    options: ["<javascript>", "<js>", "<script>", "<code>"],
    answer: "<script>"
  }
];

let currentQuestionIndex = 0;

function loadQuizQuestion() {
  const question = quizData[currentQuestionIndex];
  document.getElementById("quizQuestion").textContent = question.text;
  const quizOptions = document.getElementById("quizOptions");
  quizOptions.innerHTML = "";
  document.getElementById("quizResult").textContent = "";

  question.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      const result = document.getElementById("quizResult");
      result.textContent = opt === question.answer ? "✅ Correct!" : "❌ Incorrect!";
    });
    quizOptions.appendChild(btn);
  });
}

document.getElementById("nextQuestion").addEventListener("click", () => {
  currentQuestionIndex = (currentQuestionIndex + 1) % quizData.length;
  loadQuizQuestion();
});

loadQuizQuestion(); // Initialize first question

//joke
document.getElementById("jokeButton").addEventListener("click", async () => {
  const category = document.getElementById("jokeCategory").value;
  const jokePopup = document.getElementById("jokePopup");

  jokePopup.textContent = "Fetching a joke...";
  jokePopup.classList.add("show", "info");

  try {
    const res = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`);
    const data = await res.json();

    if (data && data.joke) {
      jokePopup.textContent = data.joke;
      jokePopup.classList.remove("error");
      jokePopup.classList.add("success");
    } else {
      jokePopup.textContent = "Couldn't get a joke.";
      jokePopup.classList.add("error");
    }
  } catch (err) {
    jokePopup.textContent = "Error getting joke 😢";
    jokePopup.classList.add("error");
  }

  // Auto hide popup after 5 seconds
  setTimeout(() => {
    jokePopup.classList.remove("show", "success", "error", "info");
  }, 7000);
});
//image carousel
const images = [
  'image1.jpeg',
  'image2.png',
  'image3.jpg'
]; 

let currentImage = 0;
const carouselImage = document.getElementById('carouselImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
  currentImage = (currentImage - 1 + images.length) % images.length;
  carouselImage.src = images[currentImage];
});

nextBtn.addEventListener('click', () => {
  currentImage = (currentImage + 1) % images.length;
  carouselImage.src = images[currentImage];
});

