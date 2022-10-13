const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = 0
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availabeQuestions = []
//All of the questions
let questions = [
    {
    question: 'Inside what HTML element do we put the Javascript',
    choice1: '<script>',
    choice2: '<scripting>',
    choice3: '<js>',
    choice4: '<h1>',
    answer: 1,

    },

    {
    question: 'Javascript is a ___-side programming language',
    choice1: 'client',
    choice2: 'both',
    choice3: 'server',
    choice4: 'all',
    answer: 2,
    
    },
    {
    question: 'Which of the variables are visible throughout your code',
    choice1: 'local variable',
    choice2: 'global variable',
    choice3: 'none',
    choice4: 'both',
    answer: 2,
        
    },
    {
    question: 'What is the correct way to write a comment in Javascript',
    choice1: '{#...#}',
     choice2: '<!--- .... ---!>',
    choice3: '//..',
    choice4: '/*..*/',
    answer: 3,
    }



]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availabeQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availabeQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/end.html')

        
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width =  `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availabeQuestions.length)
    currentQuestion = availabeQuestions[questionsIndex]
    question.innerText = currentQuestion.question

choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availabeQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers)return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'
        if (classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

            selectedChoice.parentElement.classList.add(classToApply)

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()

            }, 1000)

        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()