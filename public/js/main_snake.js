let direction = 2 //STARTING DIRECTION -> RIGHT
let speed = .1 //CURRENT SPEED , MAY BE CHANGED (4 fps)

//Listens for key presses to send to .move method of the Snake Game
document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowUp":
            direction = 1
            return 
        case "ArrowRight":
            direction = 2
            return 
        case "ArrowDown":
            direction = 3
            return    
            default:
        case "ArrowLeft":
            direction = 4
            return       
    }
};

const startGame = async function (event) {
    event.preventDefault()
    let button = startSnakeButton.remove()
    const options = { sizeX: 15, sizeY: 15, size: 2, dev: false}
    const snake = await new Snake(options) 
    
    const start = setInterval(
        function () {  
            snake.move(direction)
            if(!snake.active){
                startSnakeButton.innerHTML = 'Replay?'
                startDiv.append(startSnakeButton)
                alert(snake.termination)
                clearInterval(start)
            }
        }, speed*1000)
}

const startDiv = document.querySelector('#startDiv')
const startSnakeButton = document.querySelector('#snakeStart')
startSnakeButton.addEventListener('click', startGame)