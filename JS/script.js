
    // i was instructed to declare all of my variables first // 

    var welcome = document.querySelector("#introduction");
    var CommenceBtn = document.querySelector("#start_button");
    var beggingPage =document.querySelector("#intro_page");
    
    var ConcernsPage = document.querySelector("#question_page");
    var interrogateQuestion = document.querySelector("#ask_question");
    
    var reactButtons = document.querySelectorAll(".choices");
    var answerBtn1 = document.querySelector("#answer_btn1");
    var answerBtn2 = document.querySelector("#answer_btn2");
    var answerBtn3 = document.querySelector("#answer_btn3");
    var answerBtn4 = document.querySelector("#answer_btn4");
    
    var examineLine = document.querySelector("#check_line");
    var scoreBoard = document.querySelector("#submit_page");
    var finalScore = document.querySelector("#final_score");
    var GovernmentInitials =document.querySelector("#initial");
    
    var submitBtn =document.querySelector("#submit_btn");
    var highScorePage =document.querySelector("#highscore_page");
    var scoreRecord =document.querySelector("#score_record");
    var scoreCheck =document.querySelector("#score_check");
    var finish =document.querySelector("#finish");
    
    var backBtn =document.querySelector("#back_btn");
    var clearBtn=document.querySelector("#clear_btn");
    
    // below is where i will put all of my questions 
    var questionSource = [
        {
            question: "String values must be closed within _____ ?.",
            choices: ["a. string", "b. Chocolate ", "c. quotes", "d. Penut Butter"],
            answer: "c"
        },
        {
            question: "what are the most commonly used data types ? :", 
            choices: ["a. Ballons", "b. function ", "c. Alerts", "d. ASYNC"],
            answer: "c"
        },
        {
            question: "how is a function made in JS ?",
            choices: ["a. In a bakery", "b. function myFunction()", "c. Costco", "d. Ask Google "],
            answer: "b"
        },
        {
            question: "how do you tell if one or more variable are equal in a else statement",
            choices: ["a. +", "b. ==", "c. '$'", "d. !!!"],
            answer: "b"
        },
        {
            question: "What is the command to change directories ?",
            choices: ["a. ABC ", "b. ls ", "c. cd ", "d. db "],
            answer: "c"
        },
        {
            question: "what is the concatination sign look like ? ",
            choices: ["a. !", "b. +", "c. @", "d. $"],
            answer: "b"
        },
      
      
    ];

// this is where i am going to set up my variables 
    
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    
  // this part of my code will be for the timer in my code quiz 
    function timer() {
            
            var timerInterval = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "Time is up!"; 
                    // if time is up, show on score board content show "Time is up! message"
                    finish.textContent = "Time is up!";
                    gameTerminated();
    
                } else  if(questionCount >= questionSource.length + 1) {
                    clearInterval(timerInterval);
                    gameTerminated();
                    } 
        }, 1000);
    }
    
    
    // this fucntion will start the quiz 
    function beginQuiz () {
            beggingPage.style.display = "none";
            ConcernsPage.style.display = "block";
            questionNumber = 0
            timer();
            revealQuestion(questionNumber);
          
    }
 
    // the part of my code will reveal the questions 
    function revealQuestion (n) {
            interrogateQuestion.textContent = questionSource[n].question;
            answerBtn1.textContent = questionSource[n].choices[0];
            answerBtn2.textContent = questionSource[n].choices[1];
            answerBtn3.textContent = questionSource[n].choices[2];
            answerBtn4.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    
    
    function checkReply(event) {
        event.preventDefault();
        // Display if answer is correct or incorrect
        examineLine.style.display = "block";
        setTimeout(function () {
            examineLine.style.display = 'none';
        }, 1000);
    
      
        // this portion of the code will check for the answer 
        if (questionSource[questionNumber].answer == event.target.value) {
            examineLine.textContent = "Correct!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 10;
            examineLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + ".";
        }
        
        if (questionNumber < questionSource.length - 1 ) {
        
            revealQuestion(questionNumber + 1);
        } else {
        gameTerminated();
    }
    questionCount++;
    }
  
    function gameTerminated() {
    
            ConcernsPage.style.display = "none";
            scoreBoard.style.display = "block";
            console.log(scoreBoard);
            // show final score
            finalScore.textContent = "Your final score is: " + totalScore;
            // clearInterval(timerInterval);  
            timeLeft.style.display = "none"; 
    };
    
   
    function getResults () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            latestList = JSON.parse(currentList);
            return latestList;
        } else {
            latestList = [];
        }
        return latestList;
    };
    
    
    // this part of my code will show the core on the score board 
    function renderPoints () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = group();   
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
    
    
    function group () {
        var unsortedList = getResults();
        if (getResults == null ){
            return;
        } else {
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    
 
    // the code below will add the new score to the local storage 
    function addObject (n) {
        var addedList = getResults();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveResults () {
        var scoreItem ={
            user: GovernmentInitials.value,
            score: totalScore
        }
        addObject(scoreItem);
        renderPoints();
    }
    
    /* i decided to add a  event listener to my commence BTN*/

    CommenceBtn.addEventListener("click", beginQuiz);
    

    // this part of my code will take you to the next question 
    reactButtons.forEach(function(click){
    
        click.addEventListener("click", checkReply);
    });
    
    
    // this portion of code will save  information 
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        beggingPage.style.display = "none";
        highScorePage.style.display = "block";
        ConcernsPage.style.display ="none";
        saveResults();
    });
    
    
    // this will take you the highscore ranking list 
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        beggingPage.style.display = "none";
        highScorePage.style.display = "block";
        ConcernsPage.style.display ="none";
        renderPoints();
    });
   
    // this will take you back to the main website page 
    backBtn.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            beggingPage.style.display = "block";
            highScorePage.style.display = "none";
            ConcernsPage.style.display ="none";
            location.reload();
    });
    

    // this will clear the local storage 
    clearBtn.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        renderPoints();
    });
