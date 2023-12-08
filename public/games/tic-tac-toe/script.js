const startGame = async function(event) {
  event.preventDefault();
  let button = startButton.remove();
  const options = { length: 3, dev: true };

  const game = new Tic_Tac_Toe(options);

  const reset = function() {
    startButton.innerHTML = "Replay?";
    startDiv.append(startButton);
    let board = document.getElementById("gameDisplay");
    while (board.firstChild) board.removeChild(board.firstChild);
    clearInterval(resetCheck);
  };

  const start = (starting) => {
    if (!starting) {
      game.placement();
    }
  };
  const resetCheck = setInterval(function() {
    if (!game.active) {
      reset(game.score);
    }
  }, 75);
};

const startDiv = document.querySelector("#startDiv");
const startButton = document.querySelector("#gameStart");
startButton.addEventListener("click", startGame);
