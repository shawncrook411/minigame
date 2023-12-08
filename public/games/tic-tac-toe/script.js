


const startGame = async function (event) {
    event.preventDefault()
    let button = startButton.remove()
    const options = { length: 3, dev: true }

    const game = new Tic_Tac_Toe(options)

    const reset = function(){
        startButton.innerHTML = 'Replay?'
        startDiv.append(startButton)
        sendResult(game)
    }

    const start = (starting) => {
        if (!starting) {
            game.placement()
        }
    }
}

const startDiv = document.querySelector('#startDiv')
const startButton = document.querySelector('#gameStart')
startButton.addEventListener('click', startGame)