//game counters
var counter = 0;
var correctCounter = 0;
var wrongCounter = 0;

//create questions
console.log("Questions asked: " + counter);

var questions =
[
  {
  //question 1
  question: "On the surface, the world portrayed in this novel is perfect: however, it's probably the most nightmarish scenario  imaginable.",
  choices: ['The Sleeper Awakes', 'WE', '1984', 'Brave New World'],
  answer: 0,
  answerText: "Brave New World",
  image: '<img src="assets/images/bravenewworld.jpg"/>',
  },
  {
  //question 2
  question: "What anti-hero was sent into a super-max prison to rescue the President from a warlord?",
  choices: ['Snake Plissken', 'John Preston', 'Bernard Marx', 'Professor Cavor'],
  answer: 2,
  answerText: "Snake Plissken",
  image: '<img src="assets/images/snake.jpg"/>',
  },
  {
  //question 3
  question: "What bleak satire of Stalinism takes place in a glass city state and happens 1000 yrs after the 200 year war?",
  choices: ['WE', 'THX 1138', 'Equilibrium', 'The Time Machine'],
  answer: 2,
  answerText: "WE", 
  image: '<img src="assets/images/we.jpg"/>',
  },
  {
  //question 4
  question: "The protagoinst of this film escaped from prison in a sterile underground city.",
  choices: ['THX 1138', 'LUH 3417', 'Bernard Marx', 'John Savage'],
  answer: 3,
  answerText: "THX 1138",
  image: '<img src="assets/images/thx1138.jpg"/>',
  },
  {
  //question 5
  question: "What post WWIII society was brought down by a high ranking secret police agent.",
  choices: ['Libria', 'One State', 'Metropolis', 'Mega City One'],
  answer: 0,
  answerText: "Libria",
  image: '<img src="assets/images/preston.jpg"/>',
  },
  {
  //question 6
  question: "What Eastern European play coined the colloquial term for mass produced, artificially intelligent beings .",
  choices: ['Rossums Universal Robots', 'Metropolis', 'Do Androids Dream of Electric Sheep', 'Animal Farm'],
  answer: 1,
  answerText: "Rossums Universal Robots",
  image: '<img src="assets/images/rur.jpg"/>',
  },
];
//timer object
var timer =
{
  start: 30,
  reset: function(){
    timer.start = 30
    clearInterval(countDown);
    $('#timer').html('Time Remaining: ' + timer.start + ' seconds');
  },
  run: function()
  {
    countDown = setInterval(timer.increment, 1000);
    // $('#timer').append(counter);
  },
  increment: function()
  {
    timer.start--;
    $('#timer').html('Time Remaining: ' + timer.start + ' seconds');
    if (timer.start === 0) 
    {
      clearInterval(countDown);
    };
  },
  stop: function()
  {
      clearInterval(countDown);
      countDown = setInterval(timer.increment, 1000);
  },
};
//start game function - used only once, after clicking the start button
$('#startGame').click(function(){
      $('#startGame').hide();
      createQuestion();
 });

//creates each trivia question & answers
function createQuestion() {
  timer.run();

  // hides unused button
  $('.continueButton').hide();
  //shows  buttons being
  $('#question').show();
  $('.answerButton').show();

  $('#question').html(questions[counter].question);

  //for loop to get the answers for each question
  for(var i = 0; i < questions[counter].choices.length; i++) {
    $('#answer' + i).html(questions[counter].choices[i]);
  };
};
//continue button
var continueButton = {
  buttonText: 'Continue...',
  createButton: function(){
    $('.continueButton').html(continueButton.buttonText);
  },
  buttonClick: $('.continueButton').click(function (){
    $('.rightWrong').hide();
    $('.correctAnswerIs').hide();
    $('.images').hide();
    $('.continueButton').hide();
    timer.stop();
    timer.reset();
  //createQuestion function stops when the counter # gets to 6
    if(counter === 6){
      finalPage()
    }else {
      createQuestion()
    };
  }),

};

//onclick function for answers
$('.answerButton').click(function()
{
  $('#question').hide();
  $('.answerButton').hide();

  $('.rightWrong').show();
  $('.correctAnswerIs').show();
  $('.images').show();


  var buttonClickedText = this.textContent;
  console.log("Answer picked: " + buttonClickedText);

  timer.stop();

  if (this.textContent === (questions[counter].answerText)) {
    correctCounter++;
    console.log('Number of games won: ' + correctCounter);
    $('.rightWrong').html("Correct!");
    $('.images').html(questions[counter].image);
    counter++;
      console.log('Questions: ' + counter);
      $('.continueButton').show();
      continueButton.createButton();
  } else {
    wrongCounter++;
    console.log('Number of games lost: ' + wrongCounter);
    $('.rightWrong').html("Wrong answer!");
    $('.correctAnswerIs').html("The correct answer is: " + questions[counter].answerText);
      $('.images').html(questions[counter].image);
      counter++;
      console.log('Questions: ' + counter);
    $('.continueButton').show();
      continueButton.createButton();
  }
});


//startOver 
var restartButton = {
  buttonText: 'Start Over!',
  createButton: function(){
    $('#startOver').html(restartButton.buttonText);
  },
  buttonClick: $('#startOver').click(function (){
    timer.stop();
    timer.reset();
    createQuestion();
  }),

};
//final score 
function finalPage() {
  $('.answerButton').hide();
  if (correctCounter > 4){
    $('.endTitle').html("Finished");
    $('#endSubText').html("Well done!!!");
  }else if((correctCounter = 3) || (correctCounter = 4)){
    $('.endTitle').html("Satisfactory");
    $('#endSubText').html("Sub-par");
  }else{
    $('.endTitle').html("VERY DISAPPOINTING...");
    $('#endSubText').html("No excuse")
  };

  $('#rightQuestions').html("You got " + correctCounter + " questions right!");
  $('#wrongQuestions').html("You got " + wrongCounter + " questions wrong!");
  restartButton.createButton();

};