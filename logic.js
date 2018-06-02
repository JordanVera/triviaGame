// HAUNTED TRIVIA QUIZ GAME
// PLAY AT YOUR OWN RISK
// ---------------------------------------------------------------------------------


// Question object

const quizQuestions = [
{
question: "What was the actual name of Ghostface's costume in 'Scream'?",
answers: ['Father Death', 'Ghostface Killer', 'Brother Death', 'Casper'],
correct: 'Father Death'
}, 
{
question: 'What is Michael Myer\'s middle name?',
answers: ['Audrey', 'Thomas', 'Anthony', 'William'],
correct: 'Audrey'	
},
{
question: 'In the \'Friday the 13th\' films, which state houses Camp Crystal Lake',
answers: ['New Jersey', 'New Mexico', 'New York', 'New Hampshire'],
correct: 'New Jersey'
},
{
question: 'Which horror movie direct by the late Wes Craven made the most money in the United States?',
answers: ['Scream', 'Scream 2', 'Scream 3', 'Nightmare on Elm Street'],
correct: 'Scream'
},
]

// Global Variables
const mainSection = document.querySelector('#mainSection'),
	  question = document.querySelector('#question'),
	  answersContainer = document.querySelector('#answers'),
	  scoreContainer = document.querySelector('#score'),
	  submit = document.querySelector('#submit');	
	  
let currentQuestion = 0,
	score = 0,
	askingQuestion = true;
	
// Create a f(x) that asks the user a question
function askQuestion() {
	let answers = quizQuestions[currentQuestion].answers;
	let answersHtml = '';
	
// Create a loops through the answers
for (var i = 0; i < answers.length; i++) {
    answersHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + answers[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + answers[i] + "</label><br>";
  }
  
  // Generate question and answers into HTML
  question.textContent = `Q${currentQuestion + 1}.  ` + `${quizQuestions[currentQuestion].question}`;
  
  answersContainer.innerHTML = answersHtml;
  
// Initialize
if (currentQuestion === 0) {
	scoreContainer.textContent= `Score: 0 right answers out of ${quizQuestions.length} possible.`
	submit.textContent = 'Submit your Guess!'
}
}

// Create a f(x) that checks the guess of the Player
function checkAnswer() {
	if (askingQuestion) {
		submit.textContent = 'Next Question'
		askingQuestion = false;
			
		// Get the guess of the player
		let playerGuess, correctIndex,
			radios = document.getElementsByName('quiz' + currentQuestion);
		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				playerGuess = radios[i].value;
			}
			
			if (radios[i].value == quizQuestions[currentQuestion].correct) {
				correctIndex = i;
			}
		}
				
			let labelStyle = document.getElementsByTagName("label")[correctIndex].style;
			labelStyle.fontWeight = 'bold';
			const audio = [new Audio('./media/sounds/femaleScream.mp3') ,new Audio('./media/sounds/nmh_scream1.mp3')];
			let randomAudio = audio[Math.floor(Math.random() * audio.length)]
			if (playerGuess == quizQuestions[currentQuestion].correct) {
				score++;
				labelStyle.color = 'green';
			} else {
				labelStyle.color = 'red';
				randomAudio.play();
				showImage('https://media.gettyimages.com/photos/halloween-brings-out-the-crazy-in-you-picture-id502130891?s=612x612', 400, 'Scary pop-up image');
			}
		
		
		scoreContainer.textContent = `Score: ${score} right answers out of ${quizQuestions.length} possible`;
	} else {
		askingQuestion = true;
		submit.textContent = 'Submit Answer';
		if (currentQuestion < quizQuestions.length - 1) {
			currentQuestion++;
			askQuestion();
		} else {
			showFinalResults();
		}
	}
}

function showImage(src, width, alt) {
	let img = document.createElement('img');
	img.src = src;
	img.width = width;
	img.alt = alt;
	
	// This next line will add the image to the body tag
	document.body.mainSection.appendChild(img);
}

function showFinalResults() {
	mainSection.innerHTML = `
	<h2>Nice Job! You passed the quiz!</h2>
	<h2> ${score} out of ${quizQuestions.length} questions</h2>
	`;
}

window.addEventListener('load', askQuestion, false);
window.setInterval(askQuestion, 30000);
submit.addEventListener('click', checkAnswer, false);



























