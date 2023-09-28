function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Global variables
let colors = ["green", "red", "yellow", "blue"];
let seq = [];
let level = 1;
let currentPlay = 0;
let globalVolume = 0.5;
let hasStarted = false;

// Change volume
$(".slider > input").on("input", function (e) {
  globalVolume = e.target.value / 100;
  console.log(globalVolume);
});

// Animate the last in the sequence
function animateLast() {
  $(`#${seq[seq.length - 1]}`)
    .animate({ opacity: "0.5" }, "fast")
    .animate({ opacity: "1" }, "fast");
}

// Animate when button is clicked
function animateButton(color) {
  $(`#${color}`)
    .animate({ opacity: "0.5" }, "fast")
    .animate({ opacity: "1" }, "fast");
}

function playAudio(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.volume = globalVolume;
  audio.play();
}

function nextSequence() {
  $("h1").text(`Level ${level++}`);

  let randomColor = colors[randomInt(0, 4)];
  seq.push(randomColor);

  animateLast();
  playAudio(randomColor);
}

$(document).keydown(function () {
  if (!hasStarted) {
    hasStarted = true;
    nextSequence();
  }
});

function gameOverScreen() {
  // Background animation
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 300);

  // Change header
  $("h1").html(`Game Over.<br />Press Any Key to Restart`);

  // Play sound
  let audio = new Audio("./sounds/wrong.mp3");
  audio.volume = globalVolume;
  audio.play();
}

$(".button").click(function (e) {
  if (hasStarted) {
    console.log(seq);

    let colorPlayed = e.target.id;

    playAudio(colorPlayed);
    animateButton(colorPlayed);

    if (seq[currentPlay] != colorPlayed) {
      gameOverScreen();
      seq = [];
      hasStarted = false;
      level = 1;
      currentPlay = 0;
      return;
    }
    if (++currentPlay == seq.length) {
      currentPlay = 0;
      setTimeout(nextSequence, 1000);
    }
  }
});
