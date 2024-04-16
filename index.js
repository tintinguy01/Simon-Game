
// Variables 

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

// Functions

function nextSequence() {
    
    userClickedPattern = [];

    // Random pattern
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    
    // Game level

    level++;

    $('h1').text('Level ' + level);

}

function handler() {
    
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

}

function playSound(key) {

    var innerButton = key;

    switch (innerButton) {
        case 'red':
            var audioRed = new Audio('sounds/red.mp3');
            audioRed.volume = 0.3;
            audioRed.play();
            break;

        case 'blue':
            var audioBlue = new Audio('sounds/blue.mp3');
            audioBlue.volume = 0.2;
            audioBlue.play();
            break;

        case 'green':
            var audioGreen = new Audio('sounds/green.mp3');
            audioGreen.volume = 0.2;
            audioGreen.play();
            break;

        case 'yellow':
        var audioYellow = new Audio('sounds/yellow.mp3');
        audioYellow.volume = 0.3;
        audioYellow.play();
        break;
    
        default:
            break;
    }

}

function animatePress(currentColour) {

    $('.' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('.' + currentColour).removeClass('pressed')
    }, 100);

}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(nextSequence, 1000);

        }
        
    }

    else {
        
        var audioWrong = new Audio('sounds/wrong.mp3');
        audioWrong.volume = 0.2;
        audioWrong.play();

        $('body').addClass('game-over');
        setTimeout(function() {
        $('body').removeClass('game-over')
    }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();

    }
    
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
}

// Codes

$(document).on('keydown', nextSequence);

$(".btn").click(handler);