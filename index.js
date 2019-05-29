let score = 0;
let currentQuestion = 0;
let questionCounter =0;

//sets up the welcome screen from welcomeTemplate
function showWelcomeScreen(){
    $('main').html(welcomeTemplate());  
}

//renders start of quiz screen
function welcomeScreen() {
    showWelcomeScreen();
    $('.questionScreen').hide();
    $('.showSummary').hide();
    $('.kickOffbutton').click(questionScreen);
    $('.questionCounter').text(0);
}

//render question screen 
function questionScreen() { 
    if(questionCounter < questions.length){
        questionCounter++;
        $('.questionCounter').text(questionCounter);
    }
    $('.welcomeScreen').hide();
    $('.showSummary').hide();
    $('.questionScreen').show();
    $('.buttonToGetToNextQuestion').hide();
    
    if (currentQuestion < questions.length) {
        let question = questions[currentQuestion];
        $('.questionScreen h2').text(question.title);
        const answer = $('.questionScreen ul');
        if (answer.length === 0) {
        $('.questionScreen').append('<ul></ul>');
        } 
    
        for (let i=0; i<question.answers.length; i++) {
            $('.questionScreen ul').append(`
            <input  id="${i}"  name ="answerOption" required type = "radio">
            <label for="${i}" class="answer">${question.answers[i]}</label><br>`
            );
        }
        $('.questionScreen ul').append(`<button type="submit" disabled class="submitAnswerButton">Submit</button>`);
        const selection = $('.questionScreen input[type=radio]:checked');
        setTimeout(checkAnswer, 0);
    }
    else {
    showSumary();
    restartQuiz();
    }
}

// changes the counter of questions & displays
function questionNumberCounter(){
    currentQuestion++;
    $('.questionCounter').text(currentQuestion);
}

 //this function will display result of the answers to the questions, correct and 
 //incorrect answers will have seperate screens
function checkAnswer() {
   $('.questionScreen input[type=radio]').on('click', function(e) {
        $('.submitAnswerButton').attr('disabled',false);
    });
    $('.submitAnswerButton').on('click',function(e) {
        e.preventDefault();
        let correctAnswer = questions[currentQuestion].correct;
        const isCorrect = correctAnswer === parseInt ($('input:checked').attr('id'),10);
        showResult(isCorrect);    
    });    
} 

//this func runs if statement to selct correct or incorrect screen based on user input
function showResult(isCorrect) {
    if (isCorrect) {
        correctAnswerScreen();
        currentScore();       
    } else {
        inCorrectAnswerScreen();
      } 
} 

 //adds 1 to current score
function scoreAddedTocorrectAnswer(){
    score++;
}

//takes total score and renders
function currentScore() {
    scoreAddedTocorrectAnswer();
    $('.scoreCounter').text(score);
}

//this func informs user the correct answer was submitted 
function correctAnswerScreen(){
    let correctAnswer = questions[currentQuestion].correct;
    $('.questionScreen').html( `<div class="questionResultScreen">
    <h2> You got it!!! <br>A natural baller</h2>
   <button type="button" class="buttonToGetToNextQuestion">Next Question</button> </div>`);
} 

//this func displays the correct answer when user submit is incorrect
function inCorrectAnswerScreen(){
    let q = questions[currentQuestion]; 
    let ca = q.correct;
    let displaya = q.answers[ca];
    $('.questionScreen').html(`<div class="questionResultScreen">
     <h2> Better Luck next time<br> <small>The correct answer is <i>${displaya}</i></small></h2>
     <br>
    <button type="button" class="buttonToGetToNextQuestion">Next Question</button> </div>`);
} 

//this func defines the action when next button is clicked in the question result screen
function nextQuestionButton () {
    $('main').on('click', '.buttonToGetToNextQuestion', function(e) {
        questionNumberCounter();
        questionScreen();
    });
} 

//this function will set up  the final screen if correct>=6 with
function showPassedSummary() {
    $('.welcomeScreen').hide();
    $('.showSummary').show();
    $('.questionScreen').hide();
    $('.showSummary').html(`<h2>Natural Goal Scorer</h2>
    <p>You scored ${score} out of ${questions.length} correct</p>
    <img src="images/worldcuptrophy.jpg" alt="clapping-emoji" width="10%"><br>
     <button type="button" class="retakeQ">
    Retake Quiz</button>`);  
}

//restarts quiz on the final screen by clicking button
function restartQuiz() {
    $('main').on('click', '.retakeQ',function(event){
      location.reload(); //this reloads the current doc from the $(handleSoccerQuiz);
    }); 
}

//this function will set up the final screen if correct<6
function showFailedSummary() {
    $('.welcomeScreen').hide();
    $('.showSummary').show();
    $('.questionScreen').hide();
    $('.showSummary').html(`<h2>Kick harder next time</h2>
    <p>You scored ${score} out of ${questions.length}</p>
    <img id='cat' src="images/sad-face-cat.jpg" alt="sad-cat" width="10%"><br>
    <button type="button" class="retakeQ">
    Retake Quiz</button>`);
}

//this function will render the final result 
function showSumary() {
if (score>=6) 
    showPassedSummary();
    else showFailedSummary();
}

//loads the dom
function handleSoccerQuiz(){
     welcomeScreen();
     checkAnswer();
     nextQuestionButton();
}

$(handleSoccerQuiz);



