$(document).ready(function() {
	var q1, q2, q3, q4, q5, q6, q7, q8, q9, q10;
	var questions;

	function triviaQuestion(question, answers, correct) {
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correct;
		this.answerSelected = false;
		this.answeredCorrectly = false;

	}

	function gameSetup() {
		q1 = new triviaQuestion("this question", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q2 = new triviaQuestion("this is question", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q3 = new triviaQuestion("question???", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q4 = new triviaQuestion("this ???question", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q5 = new triviaQuestion("a question", ["this wrong", "this wrong too", "this one also","this right"], "this right");
		q6 = new triviaQuestion("an question", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q7 = new triviaQuestion("another question", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q8 = new triviaQuestion("last question", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q9 = new triviaQuestion("jk", ["this wrong", "this wrong too", "this one also", "this right"], "this right");
		q10 = new triviaQuestion("real last question", ["this wrong", "this wrong too", "this one also","this right"], "this right");

		questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

		placeQuestions();

	}

	function placeQuestions() {
		for (var i = 0; i < questions.length; i++) {
			var current = questions[i];
			var questionDiv = $("<div class = 'trivia-question'>");
			var answersDiv = $("<div class= 'answers'>");
			questionDiv.text(current.question);
			answersDiv.append(answerList(current));
			$("#questions").append(questionDiv).append(answersDiv);

		}
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
			var currentAnswer = question.answers[i];

			ul.append($("<li>").html(currentAnswer).addClass("answer"));
		}

		return ul;
	}

	function select(choice) {
		choice.css("color", "blue");
		choice.attr("id", "selection");
	}

	function deselect(choice) {
		choice.removeAttr("id", "selection");
		choice.css("color", "black");
	}

	gameSetup();

	$(".answer").on("click", function(event) {
		if (answerSelected = false) {
			select($(this));
			answerSelected = true;

		} else {
			deselect($("#selection"));
			select($(this));
		}
	});

})