
var allQuestions = [{question: "What is the capital of the Czech Republic?", 
					choices: ["Skopje", "Budapest", "Prague", "Bucharest"], 
					correctAnswer: 1},

					{question: "When was the Declaration of Independence signed?",
					choices: ["1492", "1776", "1812", "1791"],
					correctAnswer: 1},

					{question: "How many wives did King Henry VIII have?",
					choices: ["8", "2", "0", "6"],
					correctAnswer: 3},

					{question: "Who was the first man in space?",
					choices: ["John Glenn", "Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin"],
					correctAnswer: 1},

					{question: "",
					choices: [""],
					correctAnswer: 0}];

var quiz = document.getElementById("quiz");



// on click, button adds 1 to index in allQuestions[index]
var index = 0;
var next = function() {
	quiz.innerHTML = "<h1>" + allQuestions[index]["question"] + "</h1>";

	// buttons
	for (var i = 0; i < allQuestions[index]["choices"].length; i++) {
		quiz.innerHTML += "<input type='radio' name='choices' value='" +i+ "'> " + allQuestions[index]["choices"][i] + '<br>';
	}

	index += 1;  
}




// logic for checking whether answer is correct:
// when button is pressed, add that button's number as a property: answer: 1
// this button's number is its value
// then compare allQuestions[index]["answer"] == allQuestions[index]["correctAnswer"]