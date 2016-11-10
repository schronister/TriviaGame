var questions = [
	{"id": 1,
	"text":"Who said it: 'One does not simply walk into Mordor.'",
	"choices": ["Frodo", "Legolas", "Aragorn", "Boromir"],
	"keys":[1,2,3,4],
	"answer": 4,
	"image": "https://m.popkey.co/dc1b4c/kdkbw.gif"
	},
	{"id": 2,
	"text":"What name does Gollum use to refer to the Ring?",
	"choices": ["Tasty", "Precious", "Filthy Bagginses", "Smeagol"],
	"keys":[1,2,3,4],
	"answer": 2,
	"image": "https://67.media.tumblr.com/dedae984489a24466c5c7701abd4e115/tumblr_nt6qz2VSn11sjpemmo1_500.gif"
	},
	{"id": 3,
	"text":"At the beginning of the trilogy, who is the king of Rohan?",
	"choices": ["Faramir", "Eomer", "Theoden", "Grima Wormtongue"],
	"keys":[1,2,3,4],
	"answer": 3,
	"image": "http://68.media.tumblr.com/df9bb741ef3fe2fdf929b5908edb5e21/tumblr_oe1299HP6N1rormy4o2_540.gif"
	},
	{"id": 4,
	"text":"What ancient fiery demon does Gandalf fight?",
	"choices": ["Balrog", "Nazgul", "Saruman", "Ugluk"],
	"keys":[1,2,3,4],
	"answer": 1,
	"image": "http://68.media.tumblr.com/4aa4f0365579753fb0c9aaf00a66f13c/tumblr_ofzjfhofNP1tnv6ito4_250.gif"
	},
	{"id": 5,
	"text":"What ruined city of Gondor was previously the Kingdom's capital?",
	"choices": ["Barad-dur", "Edoras", "Minas Tirith", "Osgiliath"],
	"keys":[1,2,3,4],
	"answer": 4,
	"image": "http://67.media.tumblr.com/93a4d2edd3e81b729d74653029000b54/tumblr_of7rgm8bbz1vsvl4bo3_r1_400.gif"
	},
	{"id": 6,
	"text":"The Fellowship finds the tomb of what Dwarf while in Moria?",
	"choices": ["Balin", "Dwalin", "Thorin", "Gimli"],
	"keys":[1,2,3,4],
	"answer": 1,
	"image": "http://68.media.tumblr.com/41660602a1f16155418305ebf4ca6c90/tumblr_n8wz1ajQY11qblbqbo6_250.gif"
	},
	{"id": 7,
	"text":"Which of these is a meal that hobbits do not partake in daily?",
	"choices": ["Second Breakfast", "Dinner", "Supper", "Third Breakfast"],
	"keys":[1,2,3,4],
	"answer": 4,
	"image": "http://68.media.tumblr.com/c99c1ebf521f8d84539e446b1a7b1c85/tumblr_nrzygin3PA1siyog0o10_r1_250.gif"
	},
	{"id": 8,
	"text":"What's the name of Gandalf's horse?",
	"choices": ["Brego", "Shadowfax", "Silver", "Arnold"],
	"keys":[1,2,3,4],
	"answer": 2,
	"image": "http://68.media.tumblr.com/11e90b62fecb6fe3476811879889ed78/tumblr_o3b2znmC2S1rrecxqo3_500.gif"
	}
]
var questionCounter = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var timer = 10;
var interval;
var lastOneRight;
var rank;
var rankImg;

$(document).ready(function(){
	$("#start").on("click", loadQuestion);
});


function loadQuestion(){
	//clear the playing area
	$("#playingArea").empty();
	//load the timer
	timer=10;
	$("#playingArea").append("<h3 id='timer'>Time Left: "+ timer+"</h3>");
	runGameTimer();

	//load question and choices
	for (var i = 0; i < questions.length; i++){
		if (i === questionCounter){
			$("#playingArea").append("<div id=question></div>");
			$("#question").append("<p>"+questions[i].text+"</p>");
			for (var j = 0; j < questions[i].choices.length; j++){
				//assign an id and class to each choice
				$("#question").append("<p class='choices' id='" +questions[i].keys[j]+"'>"+questions[i].choices[j]+"</p>");
			}
		}
	}
	//checking answer
	$(".choices").on("click",function(event){
		//correct answer 
		if(this.id === questions[questionCounter].answer.toString()){
			//stop the timer
			stopTimer();
			//highlight right/wrong answers
			highlightAnswers();
			//increment correctAnswers
			correctAnswers++;
			lastOneRight = true;
			transition();
		//incorrect answer
		} else{
			//stop timer
			stopTimer();
			//highlight answers
			highlightAnswers();
			//increment incorrectAnswers
			incorrectAnswers++;
			lastOneRight = false;
			transition();
		}
	});



};
//running the timer
function runGameTimer(){
	interval = setInterval(decrement,1000);
}
//function for decrementing the timer
function decrement(){
	timer--;
	$("#timer").html("Time Left: " +timer);
	//if time runs out, question is incorrect
	if (timer === 0){
		stopTimer();
		incorrectAnswers++;
		highlightAnswers();
		transition();
	}
}
//function for stopping the timer
function stopTimer(){
	clearInterval(interval);
}
//highlight the right and wrong answers
function highlightAnswers(){
	for (var i= 1; i <=questions[questionCounter].choices.length; i++){
		if (questions[questionCounter].keys[i-1] === questions[questionCounter].answer){
			$("#"+i).addClass("correct");
		} else{
			$("#"+i).addClass("wrong");
		}
	}
}

//function to transition slides (shows gif and counts down)
function transition(){
	//remove listener on choices
	$(".choices").off("click");
	//add message and image
	$("#playingArea").append("<div id='imageArea'></div");
	if (lastOneRight === true){
		$("#imageArea").append("<p>Correct! The answer was "+ questions[questionCounter].choices[questions[questionCounter].answer-1]+".");
	} else{
		$("#imageArea").append("<p>Sorry, the answer was "+ questions[questionCounter].choices[questions[questionCounter].answer-1]+".");
	}
	$("#imageArea").append("<img src='"+ questions[questionCounter].image + "'>");
	questionCounter++;
	//if there are more questions, prepare to load the next
	if(questionCounter <questions.length){
		$("#imageArea").append("<p class='loadMessage'>Next question is loading...</p>");
		setTimeout(loadQuestion,5000);
	} else{
		//if out of questions, proceed to gameOver function
		$("#imageArea").append("<p class='loadMessage'>Calculating your final score...</p>");
		setTimeout(gameOver,5000);
	}



}
//showing the final score and rank
function gameOver(){
	//get rid of timer
	$("#timer").empty();
	$("#playingArea").empty();
	$("#playingArea").append("<div id= 'finalScore'></div>");
	$("#finalScore").append("<h2>Final Score</h2>");
	//display score
	$("#finalScore").append("<h3>You answered " + correctAnswers + "/" + incorrectAnswers +" questions correctly.</h3>");
	//calculate a rank
	if (correctAnswers === questions.length){
		rank = "Wizard";
		rankImg = "http://vignette2.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest?cb=20121110131754"
	} else if (correctAnswers > 7){
		rank = "Elf";
		rankImg = "http://vignette1.wikia.nocookie.net/lotr/images/6/69/Elrond11.jpg/revision/latest?cb=20060310082451";
	} else if (correctAnswers > 5 ){
		rank = "Dwarf";
		rankImg = "http://vignette1.wikia.nocookie.net/lotr/images/4/43/Gimli.jpg/revision/latest?cb=20080318220808";
	} else if (correctAnswers > 3) {
		rank = "Hobbit";
		rankImg = "https://pbs.twimg.com/media/Blqq9XbCMAADyBD.jpg"
	} else{
		rank = "Gollum";
		rankImg = "http://i3.kym-cdn.com/entries/icons/original/000/019/367/gollum_395_394.jpg"
	}
	$("#finalScore").append("<h3>Your rank is: "+ rank + "</h3>");
	$("#finalScore").append("<img id = 'rankImg' src='" + rankImg + "'>");


	//play again button
	$("#finalScore").append("<br>");
	$("#finalScore").append("<p>Want to play again?</p>");
	$("#finalScore").append("<button id='playAgain'>Play Again</button>");
	$("#playAgain").on("click",function(){
		//reset variables
		questionCounter = 0;
		correctAnswers = 0;
		incorrectAnswers = 0;
		loadQuestion();
	})
}