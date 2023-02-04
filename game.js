var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Event handler when user clicks on a button
$(".btn").click(function() {
    // 'this' works in jQuery btw
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

var isStarted = false;
// Detects keypress
$(document).keypress(() => {
    if (!isStarted) {
        $("h1").text(`Level 0`);
        nextSequence();
        isStarted = true;
    }
})

// checking answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("fail");
        var audio = new Audio(`sounds/wrong.mp3`);
        audio.play();

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Restarts game
function startOver() {
    level = 0;
    gamePattern = [];
    isStarted = false;
    userClickedPattern = [];
}

// generates next colour in sequence
function nextSequence() {
    // Adding next colour to sequence
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flashing the next button + playing sound
    $(`#${randomChosenColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${randomChosenColour}`).removeClass("pressed");
    }, 100);
    playSound(randomChosenColour);

    level++;
    $("h1").text(`Level ${level}`);
}

// Plays a sound
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Animates button press on click
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}
