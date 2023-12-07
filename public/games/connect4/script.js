const startGame = async function (event) {
    event.preventDefault()

    let button = startButton.remove()
    const options = { height: 5, width: 7, dev: true}

    const game = new Connect4(options)    

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

    if(!game.active) {
        alert(game.termination)
        reset(game.score)
    }
}

const startDiv = document.querySelector('#startDiv')
const startButton = document.querySelector('#gameStart')
startButton.addEventListener('click', startGame)