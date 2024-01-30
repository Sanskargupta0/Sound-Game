var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  // console.log(userClickedPattern);
  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  // console.log(userClickedPattern.length);
});

function nextSequence() {

  userClickedPattern = [];

  level += 1;

  $("h1").text(`Level ${level}`);
  
  //dummyNum is just to store the random number generated
  var dummyNum = Math.floor(Math.random() * 4);

  var randomChosenColor;

  randomChosenColor = buttonColors[dummyNum];
  // console.log(randomChosenColor);

  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);
  $("#" + randomChosenColor)
    .fadeOut(50)
    .fadeIn(50)
    .fadeOut(50)
    .fadeIn(50);

  playSound(randomChosenColor);
}

function playSound(sound) {

  var audio = new Audio(`sounds/${sound}.mp3`);

  audio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//You can use the jQuery one() method to only execute the event once per element.
// $j("#regfname").one("keypress", function () {
//     alert('Handler for .keypress() called.');
// });

$(document).keypress(function () {

  if (!started) {
    $("#level-title").text("Level"+level);
    nextSequence();
    started = true;
  }

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      
      setTimeout(function(){
        nextSequence();
      }, 1000);
    
    }

  }

  else{
    playSound("wrong");

    console.log("Wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    
    $("h1").text("Game Over, Press Any Key to Restart");

    if(level < 5){
      $("#result").addClass("result").html(`<p>You are at level ${level}, <br> you can do better, Better Luck Next time!!`);
    }
    else if(level >= 5 && level < 10){
      $("#result").addClass("result").html(`<p>You are at level ${level}, <br> Impressive !!!`);
    }
    else if(level >= 10 && level < 20){
      $("#result").addClass("result").html(`<p>You are at level ${level}, <br> Awesome !!!`);
    }
    else{
      $("#result").addClass("result").html(`<p>You are at level ${level}, <br> Out Of this Universe !!!`);
    }

    startOver();

  }

}

function startOver(){

  level = 0;

  gamePattern = [];

  started = false;

}
