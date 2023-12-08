let direction = 2; //STARTING DIRECTION -> RIGHT
let speed = 75; //CURRENT SPEED , MAY BE CHANGED (10 fps)

let controllerIndex = null;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let startButton = false;
//Listens for key presses to send to .move method of the Snake Game

document.onkeydown = function(e) {
  switch (e.code) {
    case "ArrowUp":
      direction = 1;
      return;
    case "ArrowRight":
      direction = 2;
      return;
    case "ArrowDown":
      direction = 3;
      return;
    case "ArrowLeft":
      direction = 4;
      return;
    case "Space":
      startGame();
      return;
  }
};
//sets controller index to null on disconnect
window.addEventListener("gamepaddisconnected", (event) => {
  console.log("disconnected");
  controllerIndex = null;
});
//listens for controller input in intervals
window.addEventListener("gamepadconnected", (event) => {
  controllerIndex = event.gamepad.index;
  console.log("connected");
  setInterval(function() {
    var gp = navigator.getGamepads()[event.gamepad.index];
    var buttons = gp.buttons;
    upPressed = buttons[12].pressed;
    downPressed = buttons[13].pressed;
    leftPressed = buttons[14].pressed;
    rightPressed = buttons[15].pressed;
    startButton = buttons[9].pressed;
    if (upPressed) {
      direction = 1;
    }
    if (downPressed) {
      direction = 3;
    }
    if (leftPressed) {
      direction = 4;
    }
    if (rightPressed) {
      direction = 2;
    }
    if (startButton) {
      startGame();
    }
  }, 50);
});

const startGame = async function(event) {
  if (event) event.preventDefault();
  let button = startSnakeButton.remove();
  const options = { sizeX: 15, sizeY: 15, size: 10, dev: false };
  const snake = new Snake(options);

  const reset = function(score) {
    direction = 2
    startSnakeButton.innerHTML = "Replay?";
    let board = document.getElementById("snakeDisplay");
    while (board.firstChild) board.removeChild(board.firstChild);
    startDiv.append(startSnakeButton);
    sendResult(score);
    clearInterval(start);
  };
  

  const start = setInterval(function() {
    //Master loop
    snake.move(direction);

    if (snake.size > snake.X * snake.Y - 1) {
      snake.active === false;
      alert("You've won!");
      reset(snake.score);
    }

    if (!snake.active) {
      alert(snake.termination);
      reset(snake.score);
    }
  }, speed);
};

const startDiv = document.querySelector("#startDiv");
const startSnakeButton = document.querySelector("#snakeStart");
startSnakeButton.addEventListener("click", startGame);
