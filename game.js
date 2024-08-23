var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var executed = false;

$(document).keydown(function(){
    if(!executed){
        nextSequence();
        executed=true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Proceed");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over!!!");
        setTimeout(function(){
            $("h1").text("Press Any Key to Restart");
        }, 2000);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    $("h1").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

function startOver(){
    // userClickedPattern = [];
    gamePattern = [];
    level = 0;
    executed = false;
}