
var allQuestions = [{question: "What is the capital of the Czech Republic?", 
					choices: ["Skopje", "Budapest", "Prague", "Bucharest"], 
					correctAnswer: 2},

					{question: "When was the Declaration of Independence signed?",
					choices: ["1492", "1776", "1812", "1791"],
					correctAnswer: 1},

					{question: "How many wives did King Henry VIII have?",
					choices: ["8", "2", "0", "6"],
					correctAnswer: 3},

					{question: "Who was the first man in space?",
					choices: ["John Glenn", "Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin"],
					correctAnswer: 1},

					{question: "Which star in the Carl Sagan novel 'Contact' showed signs of extraterrestrial life?",
					choices: ["Sun", "Betelguese", "Vega"],
					correctAnswer: 2}];
 
var index = -1;
var quiz = document.getElementById("quiz");

// assigns value of chosen radio button to answer property on current question object in allQuestions array
quiz.addEventListener('click', function(e) {
	if (e.target.tagName.toUpperCase() === "INPUT") {
		var value = e.target.value;
		allQuestions[index]['answer'] = value;		
	}
});


// on button click, quiz div innerHTML receives info from next object in allQuestions array

var next = function() {
	index += 1;

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
			
			quiz.appendChild(choice);
			quiz.appendChild(document.createTextNode(allQuestions[index]['choices'][i]));
			quiz.appendChild(document.createElement('br'));
		}
	}
};


// shows score sheet after the end of allQuestions iteration
var showScores = function(i) {
	button.remove();
	quiz.innerHTML = "SCORE:  ";

	var total = allQuestions.length;
	var correct = 0;
	for (var question = 0; question < allQuestions.length; question++) {
		if (allQuestions[question]["answer"] == allQuestions[question]["correctAnswer"]) {
			correct += 1;
		}
	}

	quiz.innerHTML += correct + "/" + total;

	// then compare allQuestions[index]["answer"] == allQuestions[index]["correctAnswer"]
}


button = document.getElementById('button');
button.addEventListener('click', next);






