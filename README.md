# A Dynamic Quiz    

http://javascriptissexy.com/how-to-learn-javascript-properly/   

Build a JavaScript quiz application that meets the following conditions:

- **MET**: It is a simple quiz that has radio button choices, and it will show the user her score upon completion.

- **MET:** The quiz can show any number of questions and any number of choices. 

- **MET:** Tally the user's score and display the final score on the last page. The last page will only show the score, so remove the last question.

- **MET:** Use an array to store all the questions. Each question, along with its choices and correct answer, should be stored in an object. The array of questions should look similar to this:
            
        // Only one question is in this array, but you will add all the questions.var allQuestions = [{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0}];

- **MET**: Dynamically (with document.getElementById or jQuery) add the next question and remove the current question from the screen, when the user clicks the “Next” button. The Next button will be the only button to navigate this version of the quiz.

- **MET:** Add client-side data validation: make sure the user answers each question before proceeding to the next question.

- **MET**: Add a “Back” button to allow the user to go back and change her answer. The user can go back up to the first question. For the questions that the user has answered already, be sure to show the radio button selected, so that the user is not forced to answer the questions again, which she has completed.

- Use jQuery to add animation (fade out the current question and fade in the next question).

- Test the quiz on IE 8 and 9, and fix any bugs. This will give you a good workout 😉

- **MET**: Store the quiz questions in an external JSON file.

- Add user authentication: allow users log in, and save their login credentials to local storage (HTML5 browser storage).

- Use cookies to remember the user, and show a “Welcome, First Name” message when the user returns to the quiz.

- Use Twitter Bootstrap for the entire page layout, including the quiz elements to make it look more professional. As an added bonus, use the tabs user interface component from Twitter Bootstrap and show 4 different quizzes, one on each tab.

- Learn Handlebars.js and add Handlebars.js templating to the quiz. You should no longer have any HTML in your JavaScript code. Your quiz is getting more advanced bit by bit.

- Keep a record of all the users who take the quiz and show each user how her score ranks amongst the scores from other quiz takers.

- Later (after you have learned Backbone.js and Node.js), you will use these two technologies to refactor your quiz code and turn the same quiz into a sophisticated, single-page, modern web application built with the latest JavaScript frameworks. And you will store the users’ authentication credentials and scores in a MongoDB database.