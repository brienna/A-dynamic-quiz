
var quiz = {
	element: document.getElementById('quiz'),

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
		var nameChangeButton = document.getElementById('nameChangeButton');
		var buttonText = "Not " + name + "?";
		nameChangeButton.textContent = buttonText;
		nameChangeButton.addEventListener('click', quiz.askForName);
		nameChangeButton.style.display = 'block';
		nextButton.style.display = 'inline';
	},

	askForName: function() {
		quiz.clearQuiz();

		var form = document.getElementById('nameForm');
		form.style.display = 'block';
		form.addEventListener('submit', function(e) {
			e.preventDefault();  // prevents actual form submission
			var name = document.getElementById('username').value;
			// save name in localStorage
			localStorage.setItem('name', name);
			form.style.display = "none";
			quiz.checkName(name);
		});
	},

	clearQuiz: function() {
		nameChangeButton.style.display = 'none';
		nextButton.style.display = 'none';
		while (quiz.element.firstChild) {
			quiz.element.removeChild(quiz.element.firstChild);
		}
	},
};

// check username to then either welcome user or ask user for name
quiz.checkName();

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


var url = 'questions.json';

$.getJSON(url, function(result) {
	allQuestions = result;
});

var allQuestions,
	index = -1;

// assigns value of chosen radio button to answer property on current question object in allQuestions array
quiz.element.addEventListener('click', function(e) {
	if (e.target.tagName.toUpperCase() === "INPUT") {
		var value = e.target.value;
		allQuestions[index]['answer'] = value;		
	}
});


// on button click, quiz.element div innerHTML receives info from next object in allQuestions array
var next = function() {
	quiz.clearQuiz();
	nextButton.style.display = 'inline';

	// toggle backButton visibility
	if (index > -1 && answered()) {
		backButton.style.display = 'inline';
	}

	// prevents user from proceeding without answering
	if (index > -1) {
		if (!answered()) {
			return;
		}
	}

	index += 1;
	console.log(index);

	// if index equals last object's index in all Questions array, show scores
	if (index == allQuestions.length) {
		showScores(index);
	} else {  // else show question
		quiz.element.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";
		showChoices();
	}
};


// on backButton click, quiz.element div iterates backward from current allQuestions object to previous 
// and selects the button with the same index number as the answer 
var back = function() {
	index -= 1;
	console.log(index);

	// hide backButton if cannot go further back
	if (index == 0) {
		backButton.style.display = 'none';
	} else {
		quiz.element.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";
		showChoices();
	}
};


function showChoices() {
	// add choices (radio inputs)
	for (var i = 0; i < allQuestions[index]["choices"].length; i++) {
		choice = document.createElement('input');
		choice.type = 'radio';
		choice.name = 'choices';
		choice.value = i;

		if ('answer' in allQuestions[index] && choice.value == allQuestions[index]['answer']) {
			choice.checked = "checked";
		}
		
		quiz.element.appendChild(choice);
		quiz.element.appendChild(document.createTextNode(allQuestions[index]['choices'][i]));
		quiz.element.appendChild(document.createElement('br'));
	}
}


// shows score sheet after the end of allQuestions iteration
var showScores = function(i) {
	nextButton.remove();
	backButton.remove();
	quiz.element.innerHTML = "SCORE:  ";

	var total = allQuestions.length;
	var correct = 0;
	for (var question = 0; question < allQuestions.length; question++) {
		if (allQuestions[question]["answer"] == allQuestions[question]["correctAnswer"]) {
			correct += 1;
		}
	}

	quiz.element.innerHTML += correct + "/" + total;
};

nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', next);

backButton = document.getElementById('backButton');
backButton.addEventListener('click', back);


// client-side data validation:
// returns a Boolean after checking whether question has been answered
// by checking whether current question object in allQuestions array contains 'answer' key
var answered = function () {
	if (allQuestions) {
		if ('answer' in allQuestions[index]) {
			return true;
			console.log('Answered');
		} else {
			return false;
		}
	}
}















