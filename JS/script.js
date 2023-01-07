/*Here is all my code for my JavaScript portion*/
    
    var greeting = document.querySelector("#greeting"); 
    var BeginBtn = document.querySelector("#begin_button");
    var launchPage =document.querySelector("#launch_page"); 
    
    var inquirePage = document.querySelector("#inquire_page"); 
    var interrogateQuestion = document.querySelector("#interrogate_question");
    
    var replyButtons = document.querySelectorAll(".choices");
    var inquireBtn1 = document.querySelector("#inquire_btn1");
    var inquireBtn2 = document.querySelector("#inquire_btn2");
    var inquireBtn3 = document.querySelector("#inquire_btn3");
    var inquireBtn4 = document.querySelector("#inquire_btn4");
    
    var callLine = document.querySelector("#call_line");
    var display = document.querySelector("#display_page");
    var finalresult = document.querySelector("#final_result");
    var userAbbreviation =document.querySelector("#user_abbreviation");
    
    var suggestedBtn =document.querySelector("#suggested_btn");
    var enterData =document.querySelector("#enter_data");
    var score =document.querySelector("#score_check");
    var completed =document.querySelector("#completed");
    var finalResultsPage =document.querySelector("#finalresults_page");
    
    var returnBtn =document.querySelector("#return_btn");
    var removeBtn=document.querySelector("#remove_btn");
    
    // this section will be all the questions i want to ask for my quiz // 
    var questions = [
        {
            question: "String values must be enclosed within _____ .",
            choices: ["a) pizza", "b) spongebob", "c) quotes", "d) parenthesis"],
            answer: "c"
        },
        {
            question: "Data types that are regularly used  DO NOT include  what ? :",
            choices: ["a. patrick star", "b. flys", "c. alerts", "d. numbers"],
            answer: "c"
        },
        {
            question: "in the language JavaScript how is a function even created ?",
            choices: ["a) apple pie ", "b. function myFunction()", "c) squidward ", "d) Sandy Cheeks"],
            answer: "b"
        },
        {
            question: " in order to varify if two variables should be  equal what should you do  ____.",
            choices: ["a)14", "b. ==", "c) 'google it '", "d) just throw in the towel"],
            answer: "b"
        },
        
    ];

    
    
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 40;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    /*Functions*/
    // this is where i created the start button and i added a timer too //

    function timer() { 
            
            var timer = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timer);
                    timeLeft.textContent = "Time is up!"; 
                    // if time is up, show on score board content show "Time is up! message"
                    finish.textContent = "Time is up!";
                    gameOver();
    
                } else  if(questionCount >= questionSource.length + 1) {
                    clearInterval(timer); 
                    gameOver();
                    } 
        }, 1000);
    }
    
    // this function will clearly start the quiz 
    function commenceQuiz () {
            introPage.style.display = "none";
            questionPage.style.display = "block";
            questionNumber = 0
            countdown();
            displayQuestion(questionNumber);
          
    }
    // this will display all of the following questions
    function displayQuestion (n) {
            askQuestion.textContent = questionSource[n].question;
            answerBtn1.textContent = questionSource[n].choices[0];
            answerBtn2.textContent = questionSource[n].choices[1];
            answerBtn3.textContent = questionSource[n].choices[2];
            answerBtn4.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    
    // this will show if the  answer is correct or not
    function examineAnswer(event) {
        event.preventDefault();
        checkLine.style.display = "inline";
        setTimeout(function () {
            checkLine.style.display = 'none';
        }, 1000); 
    
        
        if (questionSource[questionNumber].answer == event.target.value) {
            checkLine.textContent = "good!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 5;
            checkLine.textContent = "Wrong answer sorry! " + questionSource[questionNumber].answer + ".";
        }
        
        if (questionNumber < questionSource.length - 1 ) {

            displayQuestion(questionNumber + 1); 
        } else {
        gameOver();
    }
    questionCount++;
    }
    // if all questions are answered the final score will show
    function gameOver() {
    
            questionPage.style.display = "none";
            scoreBoard.style.display = "inline";
            console.log(scoreBoard);
            // show final score
            finalScore.textContent = "Final Score: " + totalScore;
            // clearInterval(timerInterval);  
            timeLeft.style.display = "none"; 
    };
    
    // this part is using local storage
    function summonScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            latestList = JSON.parse(currentList);
            return latestList;
        } else {
            latestList = [];
        }
        return latestList;
    };
    
    
    // this part will show the score board 
    function displayScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
        // Slice high score array to only show the top five scores
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];
        // Show the score list on score board
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    
    // Sorts score and ranking the high score list
    function group () {
        var unsortedList = displayScore();
        if (getScore == null ){
            return;
        } else {
        unsortedList.group(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    
    // Pushes new score and initials to local storage
    function attachItem (n) {
        var addedList = displayScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        displayScore();
    }
    
    /* Adds event listeners*/
    // startbtn to start the quiz
    BeginBtn.addEventListener("click", commenceQuiz); 
    
    // Go to the next question 
    replyButtons.forEach(function(click){
    
        click.addEventListener("click", examineAnswer); 
    });
    
    // this part will save information 
    suggestedBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block"; 
        questionPage.style.display ="none";
        saveScore();
    });
    
    // this part will check for the high score
    score.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        displayScore(); 
    });
    
    // this will take me back to the main page
    returnBtn.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            introPage.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload(); 
    });
    
    
    removeBtn.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        displayScore();
    }); 