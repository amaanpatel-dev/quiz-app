document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  // List of quiz questions with possible answers
  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Rome", correct: false },
      ],
    },
    {
      question: "What is 2 + 2?",
      answers: [
        { text: "3", correct: false },
        { text: "4", correct: true },
        { text: "5", correct: false },
        { text: "6", correct: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
      ],
    },
    {
      question: "Who wrote 'Hamlet'?",
      answers: [
        { text: "Charles Dickens", correct: false },
        { text: "Jane Austen", correct: false },
        { text: "William Shakespeare", correct: true },
        { text: "Mark Twain", correct: false },
      ],
    },
    {
      question: "What is the largest mammal in the world?",
      answers: [
        { text: "African Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Hippopotamus", correct: false },
      ],
    },
  ];

  let currentQuestionIndex = 0; // Tracks the current question index
  let score = 0; // Tracks the user's score

  // Start the quiz by shuffling questions and resetting states
  function startQuiz() {
    shuffleQuestions(); // Shuffle questions to randomize the order
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(); // Display the first question
  }

  // Display the current question and possible answers
  function showQuestion() {
    resetState(); // Clear previous answers and buttons
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}: ${currentQuestion.question}`;

    // Loop through the answers to create buttons dynamically
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtonsElement.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct; // Mark correct answer
      }
      button.addEventListener("click", selectAnswer); // Listen for answer selection
    });
  }

  // Reset the state of the quiz (e.g., clear buttons, hide the next button)
  function resetState() {
    nextButton.style.display = "none"; // Hide next button initially
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild); // Remove old buttons
    }
  }

  // Handle answer selection by the user
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if selected answer is correct

    // Highlight correct or incorrect answer
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }

    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach((button) => {
      button.disabled = true; // Disable all buttons
      if (button.dataset.correct === "true") {
        button.classList.add("correct"); // Highlight the correct answer
      }
    });

    // Wait for 1 second before moving to the next question
    setTimeout(() => {
      handleNextButton();
    }, 1000);
  }

  // Display the user's score after all questions are answered
  function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = `Play Again`;
    nextButton.style.display = "block"; // Show the play again button
  }

  // Handle the next question or restart the quiz if all questions are answered
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(); // Show next question
    } else {
      showScore(); // Show final score if all questions are answered
    }
  }

  // Shuffle the questions array using the Fisher-Yates algorithm
  function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap elements
    }
  }

  // Restart the quiz when the user clicks the "Play Again" button
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton(); // Proceed to next question
    } else {
      startQuiz(); // Restart the quiz
    }
  });

  startQuiz(); // Initialize the quiz when the page loads
});
