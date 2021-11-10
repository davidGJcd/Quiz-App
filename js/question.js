const questions = [
    {
        question: "When javaScript invented?",
        optionA: "1920",
        optionB: "1960",
        optionC: "1945",
        optionD: "1995",
        correctOption: "optionD"
    },

    {
        question: "Who invented javaScript?",
        optionA: "Rossum Eric",
        optionB: "Brendan Eich",
        optionC: "John Robert",
        optionD: "George peter",
        correctOption: "optionB"
    },

    {
        question: "What percentage of Internet sites use JavaScript?",
        optionA: "95.02%",
        optionB: "75.25%",
        optionC: "85.20%",
        optionD: "95.2%",
        correctOption: "optionD"
    },

    {
        question: "What language is javaScript?",
        optionA: "programing",
        optionB: "hybertext",
        optionC: "scripting",
        optionD: "none",
        correctOption: "optionC"
    },

    {
        question: "What company first introduced JavaScript?",
        optionA: "apple",
        optionB: "facebook",
        optionC: "google",
        optionD: "Netscape",
        correctOption: "optionD"
    },

    {
        question: "What is the original name of JavaScript??",
        optionA: "Mocha",
        optionB: "Logo",
        optionC: "Mocinka",
        optionD: "Mokia",
        correctOption: "optionA"
    },

    {
        question: "Who is the father of JavaScript??",
        optionA: "Peter, jhon",
        optionB: "Joe, smith",
        optionC: "Eich,Brendan",
        optionD: "Alexander, paul",
        correctOption: "optionC"
    },

    {
        question: "Which is the most popular programming language ?",
        optionA: "JavaScript",
        optionB: "Python",
        optionC: "Ruby",
        optionD: "Mern",
        correctOption: "optionA"
    },

    {
        question: "Why is Javascript unique? ?",
        optionA: "It for both front-end and back-end",
        optionB: "It disapear",
        optionC: "It has Node.Js",
        optionD: "A nad C",
        correctOption: "optionD"
    },

    {
        question: "How long did it take to create javaScript ?",
        optionA: "30 months",
        optionB: "10 Years",
        optionC: "10 days",
        optionD: "30 days",
        correctOption: "optionC"
    },

]


let shuffledQuestions = [] 

function handleQuestions() { 

//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question


function nextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
        
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            nextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    nextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

