$(document).ready(function() {
	var q1, q2, q3, q4, q5, q6, q7, q8, q9, q10;
	var questions, counter, currentQuestion, currentAnswer, numberCorrect;

	function triviaQuestion(question, answers, correct, img) {
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correct;
		this.image = img;
		this.answerSelected = false;
		this.answeredCorrectly = false;

	}

	function gameSetup() {
		q1 = new triviaQuestion("What is the name of Link's horse?", ["Zelda", "Tatl", "Saria", "Epona"], "Epona", "assets/images/epona.png");
		q2 = new triviaQuestion("What is the name of this boss?", ["Diababa", "Jalhalla", "Morpha", "Barinade"], "Barinade","assets/images/boss.png");
		q3 = new triviaQuestion("This Twilight Princess character's name is derived from the names of the three Golden Goddesses: ", ["Renado", "Queen Rutela", "Midna", "Madame Fanadi"], "Madame Fanadi", "assets/images/goddess.png");
		q4 = new triviaQuestion("Which of these is not one of the masks Link obtains in Majora's Mask?", ["Bremen Mask", "Mask of Truth", "Postman's Hat", "Gorman's Mask"], "Gorman's Mask", "assets/images/mask.png");
		q5 = new triviaQuestion("a question", ["this wrong", "this wrong too", "this one also","this right"], "this right","");
		q6 = new triviaQuestion("an question", ["this wrong", "this wrong too", "this one also", "this right"], "this right","");
		q7 = new triviaQuestion("another question", ["this wrong", "this wrong too", "this one also", "this right"], "this right","");
		q8 = new triviaQuestion("last question", ["this wrong", "this wrong too", "this one also", "this right"], "this right","");
		q9 = new triviaQuestion("jk", ["this wrong", "this wrong too", "this one also", "this right"], "this right","");
		q10 = new triviaQuestion("real last question", ["this wrong", "this wrong too", "this one also","this right"], "this right","");

		questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
		counter = 0;
		numberCorrect = 0;

		renderQuestion(counter);

	}

	function renderQuestion(questionNumber) {
		var questionDiv = $("<div class = 'trivia-question'>");
		var answersDiv = $("<div class= 'answers'>");

		currentQuestion = questions[questionNumber];

		$("#questions").html("<img class='question-img' src=" + currentQuestion.image + ">");
		questionDiv.html(currentQuestion.question);
		answersDiv.html(answerList(currentQuestion));
		$("#questions").append(questionDiv).append(answersDiv);
		counter++

	}

	function scrambleArray(array) {
    	var length = array.length;

    	while (length > 0) {
       	 	var index = Math.floor(Math.random() * length);
        	length--;
        	//swaps randomly chosen element with the element at current end index
	        var temp = array[length];
	        array[length] = array[index];
	        array[index] = temp;
   		 }

	    return array;
	}
	
	function answerList(question) {
		//returns list of scrambled answers from triviaQuestion object
		var scrambledAnswers = scrambleArray(question.answers);
		var ul = $("<ul>");

		for (var i = 0; i < question.answers.length; i++) {
			var current = question.answers[i];

			ul.append($("<li>").html(current).addClass("answer"));
		}

		return ul;
	}

	function select(choice) {
		choice.css("color", "blue");
		choice.attr("id", "selection");
		//check for correct
		console.log(choice.html());
		currentQuestion.answeredCorrectly = isCorrect();

	}

	function deselect(choice) {
		choice.removeAttr("id", "selection");
		choice.css("color", "black");
	}

	function isCorrect() {
		if (currentQuestion.correctAnswer === currentAnswer.html()) {
			return true;

		} 
		return false;
	}

	function endGame() {
		var score = (numberCorrect/questions.length)*100;
		var endGameText = "You completed the quiz! Your score is " + score + "%.";
		$("#questions").empty().html(endGameText);
	}

	gameSetup();

//todo: select parent of element clicked and change answerSelected property of that object
	$(document).on("click", ".answer", function(event) {
		
		currentAnswer = $(this);
		if (currentQuestion.answerSelected === false) {
			select(currentAnswer);
			console.log(currentQuestion.answerSelected);
			currentQuestion.answerSelected = true;
			$('#next').prop('disabled', false);

		} else {
			deselect($("#selection"));
			console.log(currentQuestion.answerSelected);
			select(currentAnswer);
		}
	});

	$("#next").on("click", function(event) {
		if (currentQuestion.answerSelected && counter < questions.length ) {
			//log correct/incorrect for prev question
			//display correct/incorrect
			if (isCorrect(currentQuestion.correctAnswer)) {
				numberCorrect++;
			}

			renderQuestion(counter);

		} else if (currentQuestion.answerSelected && counter === questions.length) {
			if (isCorrect(currentQuestion.correctAnswer)) {
				numberCorrect++;
			}
			
			endGame();
		}
		console.log(numberCorrect);

		$('#next').prop('disabled', true);
	})

})