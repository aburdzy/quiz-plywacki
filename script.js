let quizPage = document.querySelector('.quiz-page');
let resultPage = document.querySelector('.result-page');

let question = document.querySelector('.question');
let answers = document.querySelectorAll('.answer');;
let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let playAgain = document.querySelector('.play-again');

let pageIndicatior = document.querySelector('.page-indicator');
let result = document.querySelector('.result');

let currentQuestionIndex = 0;


//pytania do quizu
let quiz = [
  {
    q: 'Pływanie jest w programie igrzysk olimpijskich od:',
    a: [
      '1980',
      '1908',
      '1988'
    ],
    correct: 1,
  },
  {
    q: 'Temperatura wody podczas zawodów wynios:',
    a: [
      'od 25 °C do 28 °C',
      'od 18 °C do 20 °C',
      'od 28 °C do 31 °C'
    ],
    correct: 0,
  },
  {
    q: 'Pływalnia olimpijska, na której rozgrywane są zawody, ma wymiar:',
    a: [
      '25x10m',
      '40x20m',
      '50x25m'
    ],
    correct: 2,
  },
  {
    q: 'Ile istnieje stylów pływackich?',
    a: [
      '4',
      '5',
      '6'
    ],
    correct: 2,
  },
  {
    q: 'Godzina intensywnego pływania potrafi spalić:',
    a: [
      '300 kalorii',
      '450 kalorii',
      '650 kalorii'
    ],
    correct: 2,
  },
  {
    q: 'Pierwszą techniką pływacką stosowaną w starożytności był:',
    a: [
      'delfin',
      'piesek',
      'żabka'
    ],
    correct: 1,
  }, 
  {
    q: 'Czy podczas pływania pocimy się:',
    a: [
      'nie',
      'tak',
      'zależy od człowieka'
    ],
    correct: 1,
    }
];

let correctAnswers = [];
for(let i = 0; i < quiz.length; i++) {
  correctAnswers[i] = quiz[i].correct;
}

let checkedAnswers = [];
for(let questionIndex = 0; questionIndex < quiz.length; questionIndex++) {
    checkedAnswers[questionIndex] = null;
}

function showQuiz() {
  question.innerHTML = quiz[currentQuestionIndex].q;
  for(let i = 0; i < answers.length; i++) {
    answers[i].innerHTML = quiz[currentQuestionIndex].a[i];
    answers[i].setAttribute('data-index', i);
  }
  pageIndicatior.innerHTML = currentQuestionIndex + 1 + '/' + quiz.length;
}

function showResult() {
  let correct = 0;
  for(let i = 0; i < quiz.length; i++) {
    if(checkedAnswers[i] == correctAnswers[i])  
      correct++;
  }
  quizPage.classList.add('invisible');
  resultPage.classList.add('visible');
  result.innerHTML =  correct + ' / ' + quiz.length;
}

showQuiz();

for(let answer of answers) {
  answer.addEventListener('click', () => {
    let lastAnswerIndex = checkedAnswers[currentQuestionIndex];
    
    if(lastAnswerIndex != null) {
      answers[lastAnswerIndex].classList.remove('checked');
    }

    answer.classList.add('checked');
    checkedAnswers[currentQuestionIndex] = parseInt(answer.getAttribute('data-index'));
  })
}

previous.addEventListener('click', () => {
  if(currentQuestionIndex == 0)
    return;
  else {
    currentQuestionIndex--;
    showQuiz();
    for(let answer of answers) {
      if(checkedAnswers[currentQuestionIndex] == parseInt(answer.getAttribute('data-index'))) {
        answer.classList.add('checked');
      }
      else {
        answer.classList.remove('checked');
      }
    }
  }
});

next.addEventListener('click', ()=> {
  if(currentQuestionIndex == quiz.length - 1)
    showResult(); 
  else {
    currentQuestionIndex++;
    showQuiz();
    for(let answer of answers) {
      if(checkedAnswers[currentQuestionIndex] == parseInt(answer.getAttribute('data-index'))) {
        answer.classList.add('checked');
      }
      else {
        answer.classList.remove('checked');
      }
    }
  }
});

playAgain.addEventListener('click', ()=> {
  currentQuestionIndex = 0;
  quizPage.classList.remove('invisible');
  resultPage.classList.remove('visible');

  for(let i = 0; i < quiz.length; i++) {
    checkedAnswers[i] = null;
  }

  for(let i = 0; i < answers.length; i++) {
    answers[i].classList.remove('checked');
  }

  showQuiz();
});












