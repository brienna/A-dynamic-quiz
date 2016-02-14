
var quiz = {
	index: -1,
	url_questions: 'questions.json',
	allQuestions: [],
	element: document.getElementById('quiz'),
	nextButton: document.getElementById('nextButton'),
	backButton: document.getElementById('backButton'),
	nameChangeButton: document.getElementById('nameChangeButton'),

	getQuestions: function(callback) {
  		$.getJSON(quiz.url_questions, callback);
	},

	checkName: function(name) {
		// if localStorage exists, retrieve name
		// if name is valid, welcome user, else ask user for name
		if (localStorage) {
			var name = localStorage.getItem('name');
			if (name != null && name.trim()) {
				quiz.welcome(name);
			} else {
				quiz.askForName();
			}
		} else {
			// fallback action if localStorage doesn't exist
		}
	},

	welcome: function(name) {
		// display welcome greeting for user
		quiz.clearQuiz();
		var greeting = document.createTextNode('Hello ' + name + '!');
		quiz.element.appendChild(greeting);
		var buttonText = "Not " + name + "?";
		quiz.nameChangeButton.textContent = buttonText;
		quiz.nameChangeButton.addEventListener('click', quiz.askForName);
		quiz.nameChangeButton.style.display = 'block';
		quiz.nextButton.style.display = 'inline';
	},

	askForName: function() {
		quiz.clearQuiz();
		var form = document.getElementById('nameForm');
		form.style.display = 'block';
		form.addEventListener('submit', function(e) {
			e.preventDefault();  // prevents actual form submission
			var name = document.getElementById('username').value;
			localStorage.setItem('name', name);
			form.style.display = "none";
			quiz.checkName(name);
		});
	},

	showQuestion: function() {
		quiz.element.innerHTML = "<h1>" + quiz.allQuestions[quiz.index]["question"] + "</h1>";

		// create choices as radio inputs
		for (var i = 0; i < quiz.allQuestions[quiz.index]["choices"].length; i++) {
			choice = document.createElement('input');
			choice.type = 'radio';
			choice.name = 'choices';
			choice.value = i;

			// if user has chosen current choice as answer, mark current choice
			if ('answer' in quiz.allQuestions[quiz.index] && choice.value == quiz.allQuestions[quiz.index]['answer']) {
				choice.checked = "checked";
			}

			// append current choice to quiz
			quiz.element.appendChild(choice);
			quiz.element.appendChild(document.createTextNode(quiz.allQuestions[quiz.index]['choices'][i]));
			quiz.element.appendChild(document.createElement('br'));
		}

		console.log(quiz.index);

		// show backButton if after first question, else hide
		if (quiz.index > 0) {  
			quiz.backButton.style.display = 'inline';
		} else { 
			quiz.backButton.style.display = 'none';
		}

		// always show nextButton
		quiz.nextButton.style.display = 'inline';
	},

	next: function() {
		// prevent user from proceeding without answering
		if (quiz.index > -1) {
			if (!quiz.answered()) {
				return;
			}
		}

		quiz.clearQuiz();
		quiz.index += 1;

		// if last question is currently showing, show scores
		if (quiz.index == quiz.allQuestions.length) {
			quiz.showScores(); 
		} else {  
			quiz.showQuestion();
		}
	},

	back: function() {
		quiz.index -= 1;
		quiz.showQuestion();
	},

	showScores: function() {
		quiz.clearQuiz();
		quiz.element.innerHTML = "SCORE: ";

		var total = quiz.allQuestions.length;
		var correct = 0;
		for (var question = 0; question < quiz.allQuestions.length; question++) {
			if (quiz.allQuestions[question]["answer"] == quiz.allQuestions[question]["correctAnswer"]) {
				correct += 1;
			}
		}

		quiz.element.innerHTML += correct + "/" + total;
	},

	clearQuiz: function() {
		quiz.nameChangeButton.style.display = 'none';
		quiz.nextButton.style.display = 'none';
		quiz.backButton.style.display = 'none';
		while (quiz.element.firstChild) {
			quiz.element.removeChild(quiz.element.firstChild);
		}
	},

	// client-side data validation:
	// check whether question has been answered and return a Boolean
	answered: function() {
		if (quiz.allQuestions) {
			if ('answer' in quiz.allQuestions[quiz.index]) {
				return true;
				console.log('Answered');
			} else {
				return false;
			}
		}
	}
};



// callback function
quiz.getQuestions(function(questions) {
	quiz.allQuestions = questions;
});

// assigns value of chosen radio button to answer property 
// on current question object in allQuestions array
quiz.element.addEventListener('click', function(e) {
	if (e.target.tagName.toUpperCase() === "INPUT") {
		var value = e.target.value;
		quiz.allQuestions[quiz.index]['answer'] = value;		
	}
});

quiz.nextButton.addEventListener('click', quiz.next);
quiz.backButton.addEventListener('click', quiz.back);

// check username to then either welcome user or ask user for name
quiz.checkName();







