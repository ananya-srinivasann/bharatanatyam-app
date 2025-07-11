const questions = [
    {
        image: 'Mudra_Icon.png', 
        question: 'What is this Mudra?',
        options: ['Pataka', 'Tripataka', 'Ardha Chandra', 'Shikara'],
        answer: 'Pataka'
    },
    {
        image: 'Mudra_Icon.png',
        question: 'Identify this hand gesture.',
        options: ['Alapadma', 'Suchi', 'Mayura', 'Katakamukha'],
        answer: 'Mayura'
    },
    {
        image: 'Mudra_Icon.png',
        question: 'Which Mudra signifies a flag?',
        options: ['Suchi', 'Pataka', 'Mushti', 'Alapadma'],
        answer: 'Pataka'
    }
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false; // To manage initial state and score display

const mudraImage = document.getElementById('mudra-image');
const questionText = document.getElementById('question-text');
const quizOptions = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-button');
const quizResult = document.getElementById('quiz-result');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizStarted = true;
    nextButton.textContent = 'Next Question';
    nextButton.style.display = 'block'; // Ensure next button is visible
    quizResult.textContent = ''; // Clear previous results
    loadQuestion();
}

function loadQuestion() {
    resetQuizState();
    const currentQuestion = questions[currentQuestionIndex];
    mudraImage.src = currentQuestion.image;
    questionText.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        quizOptions.appendChild(button);
        button.dataset.answer = option; // Store the answer on the button
        button.addEventListener('click', selectAnswer);
    });
}

function resetQuizState() {
    mudraImage.src = ''; // Clear image
    questionText.textContent = ''; // Clear question
    while (quizOptions.firstChild) {
        quizOptions.removeChild(quizOptions.firstChild); // Clear old options
    }
    nextButton.style.display = 'none'; // Hide next button until answer is selected
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.dataset.answer;
    const currentQuestion = questions[currentQuestionIndex];

    // Disable all options after one is selected
    Array.from(quizOptions.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
        button.disabled = true;
    });

    if (selectedAnswer === currentQuestion.answer) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        //  show the correct answer
        Array.from(quizOptions.children).forEach(button => {
            if (button.dataset.answer === currentQuestion.answer) {
                button.classList.add('correct');
            }
        });
    }

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'block'; // Show next button
    } else {
        nextButton.textContent = 'Show Results';
        nextButton.style.display = 'block'; // Show show results button
    }
}

function showResults() {
    resetQuizState(); // Clear questions and options
    mudraImage.style.display = 'none'; // Hide image in result view
    questionText.style.display = 'none'; // Hide question in result view
    nextButton.style.display = 'none'; // Hide next button

    quizResult.innerHTML = `
        You scored ${score} out of ${questions.length}!
        <br>
        <button id="restart-quiz" class="start-button">Restart Quiz</button>
    `;
    document.getElementById('restart-quiz').addEventListener('click', () => {
        mudraImage.style.display = 'block'; // Show image for restart
        questionText.style.display = 'block'; // Show question for restart
        startQuiz();
    });
        quizResult.innerHTML = `
        You scored ${score} out of ${questions.length}!
        <br>
        <button id="restart-quiz" class="start-button">Restart Quiz</button>
    `;
    document.getElementById('restart-quiz').addEventListener('click', () => {
        mudraImage.style.display = 'block'; // Show image for restart
        questionText.style.display = 'block'; // Show question for restart
        mudraImage.style.marginLeft = 'auto';
        mudraImage.style.marginRight = 'auto';
        startQuiz();
    });

}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});

startQuiz();