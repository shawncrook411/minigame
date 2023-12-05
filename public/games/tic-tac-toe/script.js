


const startGame = async function (event) {
    event.preventDefault()
    let button = startButton.remove()
    const options = { length: 5, dev: true }

    const game = new Tic_Tac_Toe(options)

    const reset = function(){
        startButton.innerHTML = 'Replay?'
        startDiv.append(startButton)
        //Deprecated until fetch is set up !!!!!!!!!!!!!!!
        sendResult(game)
    }

    const start = (starting) => {
        if (!starting) {
            game.move(new Square(2, 3, 'O'))
        }


    }

}

const startDiv = document.querySelector('#startDiv')
const startButton = document.querySelector('#gameStart')
startButton.addEventListener('click', startGame)