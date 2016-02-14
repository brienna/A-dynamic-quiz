
var url = 'questions.json';

var allQuestions,
	index = -1;

$.getJSON(url, function(result) {
	allQuestions = result;
});



var quiz = {
	element: document.getElementById('quiz'),
	nextButton: document.getElementById('nextButton'),
	backButton: document.getElementById('backButton'),
	nameChangeButton: document.getElementById('nameChangeButton'),

	checkName: function(name) {
		// check if localStorage exists
		// check localStorage for valid name
		// if valid name exists, welcome user
		// else, ask user for name
		if (localStorage) {
			var name = localStorage.getItem('name');
			if (name != null && name.trim()) {
				quiz.welcome(name);
			} else {
				quiz.askForName();
			}
		}
	},

	welcome: function(name) {
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

	showChoices: function() {
		// create choices as radio inputs
		for (var i = 0; i < allQuestions[index]["choices"].length; i++) {
			choice = document.createElement('input');
			choice.type = 'radio';
			choice.name = 'choices';
			choice.value = i;

			// if user has chosen current choice as answer, mark current choice
			if ('answer' in allQuestions[index] && choice.value == allQuestions[index]['answer']) {
				choice.checked = "checked";
			}

			// append current choice to quiz
			quiz.element.appendChild(choice);
			quiz.element.appendChild(document.createTextNode(allQuestions[index]['choices'][i]));
			quiz.element.appendChild(document.createElement('br'));
		}
	},

	next: function() {
		quiz.nameChangeButton.style.display = 'none';
		quiz.nextButton.style.display = 'inline';

		if (index > -1 && quiz.answered(index)) {
			quiz.backButton.style.display = 'inline';
		}

		// prevent user from proceeding without answering
		if (index > -1) {
			if (!quiz.answered(index)) {
				return;
			}
		}

		index += 1;
		console.log(index);

		// show scores if index equals last object's index in all Questions array
		if (index == allQuestions.length) {
			quiz.showScores(); // send index as argument? 
		} else {  // else show question
			quiz.element.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";
			quiz.showChoices();
		}
	},

	back: function() {
		index -= 1;
		console.log(index);

		// hide backButton if cannot go further back
		if (index == 0) {
			quiz.backButton.style.display = 'none';
		} else {
			quiz.element.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";
			quiz.showChoices();
		}
	},

	showScores: function() {
		quiz.clearQuiz();
		quiz.element.innerHTML = "SCORE: ";

		var total = allQuestions.length;
		var correct = 0;
		for (var question = 0; question < allQuestions.length; question++) {
			if (allQuestions[question]["answer"] == allQuestions[question]["correctAnswer"]) {
				correct += 1;
			}
		}

		quiz.element.innerHTML += correct + "/" + total;
	},

	clearQuiz: function() {
		quiz.nameChangeButton.style.display = 'none';
		quiz.nextButton.style.display = 'none';
		while (quiz.element.firstChild) {
			quiz.element.removeChild(quiz.element.firstChild);
		}
	}, 

	// client-side data validation:
	// return a Boolean after checking whether question has been answered
	answered: function(index) {
		if (allQuestions) {
			if ('answer' in allQuestions[index]) {
				return true;
				console.log('Answered');
			} else {
				return false;
			}
		}
	}
};


// assigns value of chosen radio button to answer property 
// on current question object in allQuestions array
quiz.element.addEventListener('click', function(e) {
	if (e.target.tagName.toUpperCase() === "INPUT") {
		var value = e.target.value;
		allQuestions[index]['answer'] = value;		
	}
});

quiz.nextButton.addEventListener('click', quiz.next);
quiz.backButton.addEventListener('click', quiz.back);


// check username to then either welcome user or ask user for name
quiz.checkName();










