let direction = 2 //STARTING DIRECTION -> RIGHT
let speed = 50 //CURRENT SPEED , MAY BE CHANGED (10 fps)

//Listens for key presses to send to .move method of the Snake Game
document.onkeydown = function(e) {
    switch (e.code) {
        case "ArrowUp":
            direction = 1
            return 
        case "ArrowRight":
            direction = 2
            return 
        case "ArrowDown":
            direction = 3
            return    
        case "ArrowLeft":
            direction = 4
            return      
        case "Space":
            startGame()
            return
    }
};


const startGame = async function (event) {
    if (event) event.preventDefault()
    let button = startSnakeButton.remove()
    const options = { sizeX: 15, sizeY: 15, size: 10, dev: false}
    const snake = new Snake(options) 
    
    const reset = function(){
        startSnakeButton.innerHTML = 'Replay?'
        startDiv.append(startSnakeButton)
        sendResult(snake)
        clearInterval(start)
    }

    const start = setInterval(
        function () {  
            //Master loop
            snake.move(direction)

            if(snake.size > ((snake.X * snake.Y) - 1))
            {
                snake.active === false
                alert("You've won!")
                reset()
            }
            
            if(!snake.active){
                alert(snake.termination)
                reset()
            }
        }, speed)
}

const startDiv = document.querySelector('#startDiv')
const startSnakeButton = document.querySelector('#snakeStart')
startSnakeButton.addEventListener('click', startGame)