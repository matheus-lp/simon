const buttonColors = ["red", "blue", "green", "yellow"];

var delay = 800;

var audios = {
    red: new Audio("sounds/red.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    green: new Audio("sounds/green.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    wrong: new Audio("sounds/wrong.mp3"),
};

// establishes the starter round

$(document).on("keypress", function () {
    $(`#${randomChosenColor}`).fadeOut(80).fadeIn(80);
    let selectedAudio = audios[randomChosenColor];
    selectedAudio.play();
    $("h1").text(`Round ${gamePattern.length}`);
});

function nextSequence() {
    let randomNumber = Math.round(Math.random() * 3);
    return randomNumber;
};

let randomChosenColor = buttonColors[nextSequence()];

var gamePattern = [];
gamePattern.push(randomChosenColor);

// establishes buttons behavior
var pressedButtons = [];

$(".btn").click(function () {
    pressedButtons.push($(this).attr("id"));
    $(this).fadeOut(80).fadeIn(80);
    if (pressedButtons.length < gamePattern.length) {
        for (i = 0; i < pressedButtons.length; i++)
            if (pressedButtons[i] == gamePattern[i]) {
                let selectedButton = audios[$(this).attr("id")];
                selectedButton.play();
            } else {
                wrongButton();
            }
    } else if (areEqual(pressedButtons, gamePattern)) {
        let selectedButton = audios[$(this).attr("id")];
        selectedButton.play();
        setTimeout(playSequence, delay);
    } else {
        wrongButton();
    }
});

function playSequence() {
    pressedButtons = [];
    nextSequence()
    let randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);
    $("h1").text(`Round ${gamePattern.length}`);
    function wait(millisec) {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, millisec);
        });
    };
    async function loopWait() {
        for (i = 0; i < gamePattern.length; i++) {
            await wait(delay);
            $(`#${gamePattern[i]}`).fadeOut(80).fadeIn(80);
            let selectedAudio = audios[gamePattern[i]];
            selectedAudio.play();
        };
    };
    loopWait()
};

function changeBodyColor() {
    if ($("body").css("background-color") == "rgb(1, 31, 63)") {
        $("body").css("background-color", "red");
    } else {
        $("body").css("background-color", "rgb(1, 31, 63)");
    };
};

function wrongButton() {
    audios.wrong.play();
    changeBodyColor();
    setTimeout(changeBodyColor, delay);
    pressedButtons = [];
    gamePattern = [];
    $("h1").text("Refresh the page to start again")
};

function areEqual(array1, array2) {
    if (array1.length === array2.length) {
        return array1.every((element, index) => {
            if (element === array2[index]) {
                return true;
            };
            return false;
        });
    };
    return false;
};

