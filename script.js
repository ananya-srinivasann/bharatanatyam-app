const questions = [
    {
        image: 'pataka.jpg', 
        question: 'What is this Mudra?',
        options: ['Pataka', 'Tripataka', 'Ardhachandra', 'Shikara'],
        answer: 'Pataka'
    },
    {
        image: 'Mayura.jpg',
        question: 'Identify this hand gesture.',
        options: ['Tripataka', 'Suchi', 'Mayura', 'Katakamukha'],
        answer: 'Mayura'
    },
    {
        image: 'katakamukha3.jpg',
        question: 'What is one thing this mudra signifies?',
        options: ['Bee', 'Demon Fangs', 'Lotus', 'Bird'],
        answer: 'Bird'
    },

    {
        image: 'katakamukha1.jpg',
        question: 'What is the name of this mudra?',
        options: ['Kapitha', 'Katakamukha', 'Bramara', 'Soochi'],
        answer: 'Katakamukha'
    },
        {
        image: 'sarpasirsha.jpg',
        question: 'What does this mudra signify?',
        options: ['Snake', 'Crocodile', 'Moon', 'Flower'],
        answer: 'Snake'
    },

        {
        image: 'chatura.jpg',
        question: 'What is this mudra?',
        options: ['Chatura', 'Hamsapaksha', 'Araala', 'Alapadma'],
        answer: 'Chatura'
    },

        {
        image: 'padmakosha.jpg',
        question: 'Which mudra involves the opening and closing of the mudra above?',
        options: ['Shukathunda', 'Padmakosha', 'Sandaamsha', 'Mukula'],
        answer: 'Sandaamsha'
    },

        {
        image: 'ardhapataka.jpg',
        question: 'What is this mudra?',
        options: ['Tripataka', 'Katakamukha', 'Ardhapataka', 'Hamsaasya'],
        answer: 'Ardhapataka'
    }
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false; // To manage initial state and score display
let shuffledQuestions = []; // To store the shuffled questions

const mudraImage = document.getElementById('mudra-image');
const questionText = document.getElementById('question-text');
const quizOptions = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-button');
const quizResult = document.getElementById('quiz-result');

// Fisher-Yates (Knuth) shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizStarted = true;
    shuffledQuestions = shuffleArray([...questions]); // Shuffle a copy of the original questions
    nextButton.textContent = 'Next Question';
    nextButton.style.display = 'block'; // next button is visible
    quizResult.textContent = ''; // Clear previous results
    loadQuestion();
}

function loadQuestion() {
    resetQuizState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex]; // Use shuffledQuestions
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
    const currentQuestion = shuffledQuestions[currentQuestionIndex]; // Use shuffledQuestions

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

    if (currentQuestionIndex < shuffledQuestions.length - 1) { // Use shuffledQuestions.length
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
        You scored ${score} out of ${shuffledQuestions.length}!
        <br>
        <button id="restart-quiz" class="start-button">Restart Quiz</button>
    `;
    document.getElementById('restart-quiz').addEventListener('click', () => {
        mudraImage.style.display = 'block'; // Show image for restart
        questionText.style.display = 'block'; // Show question for restart
        startQuiz();
    });
        quizResult.innerHTML = `
        You scored ${score} out of ${shuffledQuestions.length}!
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
    if (currentQuestionIndex < shuffledQuestions.length - 1) { 
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});

startQuiz();