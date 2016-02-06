
// welcome the user to the quiz!
welcome();

function askForName() {
	// checks for localStorage support
	if (localStorage) {
		// add event listener for form submission
		quiz.innerHTML = "";
		var form = document.getElementById('credentials');
		form.style.display = 'block';
		form.addEventListener('submit', function(e) {
			// prevents actual form submission
			e.preventDefault();
			// get value of username field
			var username = document.getElementById('username').value;
			// save name in localStorage
			localStorage.setItem('username', username);
			form.style.display = "none";
			welcome();
		});
	} 
}

function welcome() {
	var username = localStorage.getItem('username');
	if (username != "undefined" && username != null) {
		quiz.innerHTML = "Hello " + username + '!';
		changeName = document.createElement('button');
		changeName.style.display = 'inline';
		quiz.appendChild(changeName);
		changeName.textContent = "change Name";
		changeName.addEventListener('click', askForName);
		// show button for Next
		nextButton.style.display = 'inline';
	} else {
		askForName();
	}
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


var url = 'questions.json';

$.getJSON(url, function(result) {
	allQuestions = result;
});


var allQuestions,
	index = -1;
	quiz = document.getElementById("quiz");

// assigns value of chosen radio button to answer property on current question object in allQuestions array
quiz.addEventListener('click', function(e) {
	if (e.target.tagName.toUpperCase() === "INPUT") {
		var value = e.target.value;
		allQuestions[index]['answer'] = value;		
	}
});


// on button click, quiz div innerHTML receives info from next object in allQuestions array
var next = function() {
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
			quiz.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";

		// add choices (radio inputs)
		for (var i = 0; i < allQuestions[index]["choices"].length; i++) {
			choice = document.createElement('input');
			choice.type = 'radio';
			choice.name = 'choices';
			choice.value = i;

			if ('answer' in allQuestions[index] && choice.value == allQuestions[index]['answer']) {
				choice.checked = "checked";
			}
			
			quiz.appendChild(choice);
			quiz.appendChild(document.createTextNode(allQuestions[index]['choices'][i]));
			quiz.appendChild(document.createElement('br'));
		}
	}
};


// on backButton click, quiz div iterates backward from current allQuestions object to previous 
// and selects the button with the same index number as the answer 
var back = function() {
	index -= 1;
	console.log(index);

	// hide backButton if cannot go further back
	if (index == 0) {
		backButton.style.display = 'none';
	}

	quiz.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";

	// add choices (radio inputs)
	for (var i = 0; i < allQuestions[index]["choices"].length; i++) {
		choice = document.createElement('input');
		choice.type = 'radio';
		choice.name = 'choices';
		choice.value = i;

		if ('answer' in allQuestions[index] && choice.value == allQuestions[index]['answer']) {
			choice.checked = "checked";
		}
		
		quiz.appendChild(choice);
		quiz.appendChild(document.createTextNode(allQuestions[index]['choices'][i]));
		quiz.appendChild(document.createElement('br'));
	}

	
	
};


// shows score sheet after the end of allQuestions iteration
var showScores = function(i) {
	nextButton.remove();
	backButton.remove();
	quiz.innerHTML = "SCORE:  ";

	var total = allQuestions.length;
	var correct = 0;
	for (var question = 0; question < allQuestions.length; question++) {
		if (allQuestions[question]["answer"] == allQuestions[question]["correctAnswer"]) {
			correct += 1;
		}
	}

	quiz.innerHTML += correct + "/" + total;
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















