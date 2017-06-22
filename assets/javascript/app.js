$(document).ready(function() {
	var q1, q2, q3, q4, q5, q6, q7, q8, q9, q10;
	var questions, counter, currentQuestion, currentAnswer, numberCorrect, intervalId;
	var endImages = [];
	var timer = {
		time: 30,

		resetTime: function() {
			timer.time = 30;
			timer.updateDisplay();
			clearInterval(intervalId);
		},

		start: function() {
			timer.updateDisplay();
			intervalId = setInterval(timer.count, 1000);
		},

		count: function() {
			timer.time--;
			var newTime = timer.convert(timer.time);

			timer.updateDisplay();

			if (timer.time === 0) {
				timeUp();
			}
		},

		updateDisplay: function() {
			$("#time-display").html(timer.convert(timer.time));
		},

		convert: function(t) {
			var minutes = Math.floor(t / 60);
    		var seconds = t - (minutes * 60);

		    if (seconds < 10) {
		      seconds = "0" + seconds;
		    }

		    if (minutes === 0) {
		      minutes = "00";
		    }

		    else if (minutes < 10) {
		      minutes = "0" + minutes;
		    }

		    return minutes + ":" + seconds;
		}
	}

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
		q5 = new triviaQuestion("In Wind Waker, the Triforce of Courage was split into how many pieces?", ["5", "3", "7","8"], "8","assets/images/triforce.png");
		q6 = new triviaQuestion("What inspired Shigeru Miyamoto to create The Legend of Zelda?", ["Reading fantasy books as a teenager", "Learning the ways of the sword in his younger days", "A visit to a carnival in Tokyo", "Exploring caves by lantern light as a child"], "Exploring caves by lantern light as a child","assets/images/miyamoto.png");
		q7 = new triviaQuestion("Which of these is not a recurring enemy in the Legend of Zelda series?", ["Blue Bubble", "Gibdo", "Leever", "Bronze Knuckle"], "Bronze Knuckle","assets/images/enemy.png");
		q8 = new triviaQuestion("In the original Legend of Zelda game, how many heart containers could Link have by the end of the game?", ["8", "20", "10", "16"], "16","assets/images/heart.png");
		q9 = new triviaQuestion("How many stray fairies are in each dungeon of Majora's Mask?", ["1", "4", "10", "15"], "15","assets/images/fairy.png");
		q10 = new triviaQuestion("After which game does the official Legend of Zelda timeline split, and into how many alternate timelines?", ["A Link to the Past; 2", "A Link to the Past; 3", "Ocarina of Time; 2","Ocarina of Time; 3"], "Ocarina of Time; 3","assets/images/link.jpg");

		questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
		counter = 0;
		numberCorrect = 0;

		renderQuestion(counter);
		$("#next").css("display", "block");

	}

	function renderQuestion(questionNumber) {
		var questionDiv = $("<div class = 'trivia-question'>");
		var answersDiv = $("<div class= 'answers'>");

		currentQuestion = questions[questionNumber];

		$("#questions").html("<img class='question-img img-responsive' src=" + currentQuestion.image + ">");
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
		choice.css({"font-size":"18pt", "background":"#bfc6b8" });
		choice.attr("id", "selection");
		currentQuestion.answeredCorrectly = isCorrect();

	}

	function deselect(choice) {
		choice.removeAttr("id", "selection");
		choice.css({"font-size":"", "background":""});
	}

	function isCorrect() {
		if (currentQuestion.correctAnswer === currentAnswer.html()) {
			return true;

		} 
		return false;
	}

	function endGame() {
		var score = (numberCorrect/questions.length)*100;
		var endGameText = "You completed the quiz! Your score is " + score + "% (" + numberCorrect + " out of " + questions.length + " questions correct).";

		$("#questions").empty().append(endGameDiv(endGameText, score));
		$("#next").hide();
	}

	function timeUp() {
		var score = (numberCorrect/questions.length)*100;
		var timeUpText = "You ran out of time! Your score is " + score + "%.";
		var endImg;

		$("#questions").empty().append(endGameDiv(timeUpText,score));

		

		clearInterval(intervalId);
		$("#next").hide();

	}

	function endGameDiv(text, score) {

		if (score >= 90) {
			endImg = "assets/images/great.gif";
		} else if (score < 90 && score >= 60) {
			endImg = "assets/images/good.gif";
		} else if (score < 60 && score >= 30) {
			endImg = "assets/images/dobetter.gif";
		} else {
			endImg = "assets/images/nope.gif";
		}

		return $("<div>").addClass("end-game").html(text)
		.append($("<img>").addClass("end-img").attr("src", endImg));

	}

	$("#start").on("click", function() {
		$("#timer").show();
		timer.start();
		gameSetup();
		$(this).hide();
	})


	$(document).on("click touchstart", ".answer", function(event) {
		
		currentAnswer = $(this);
		if (currentQuestion.answerSelected === false) {
			select(currentAnswer);
			currentQuestion.answerSelected = true;
			$('#next').prop('disabled', false);

		} else {
			deselect($("#selection"));
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
			timer.resetTime();
			timer.start();

		} else if (currentQuestion.answerSelected && counter === questions.length) {
			if (isCorrect(currentQuestion.correctAnswer)) {
				numberCorrect++;
			}
			
			clearInterval(intervalId);
			endGame();
		}

		$('#next').prop('disabled', true);
	})

})