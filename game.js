var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var randomChosenColour = "";
var start = false;
var count = 0;
$(document).keypress(function(){
  if(!start){
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }
});
$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(userClickedPattern.length==level){
    checkAnswer(level-1);
  }
  // console.log("level:"+level);
});
function nextSequence(){
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut(500).fadeIn(500);
  playSound(randomChosenColour);
  userClickedPattern = [];
}

function playSound(name){
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  for(i=0;i<=currentLevel;i++){
    if(userClickedPattern[i] === gamePattern[i]){
      console.log(111);
      if(i===currentLevel){
        setTimeout(nextSequence(),10000);
        console.log(true);
      }
    }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}
