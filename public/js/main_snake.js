let direction = 2
let speed = .25

//Listens for key presses to send to .move method of the Snake Game
document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowLeft":
            direction = 4
            return 
        case "ArrowRight":
            direction = 2
            return 
        case "ArrowUp":
            direction = 1
            return 
        case "ArrowDown":
            console.log('down')
            direction = 3
            return    
        default:
            return 0       
    }
};

startGame = async function () {
    const options = { sizeX: 15, sizeY: 15, size: 2, dev: false} //NEED TO FIX DEV TO FALSE FOR APPLE TO APPEAR. FIX SNAKEWEIGHT
    const snake = await new Snake(options) 
    
    const start = setInterval(
        function () {  
            snake.move(direction)
            if(!snake.active){
                alert(snake.termination)
                clearInterval(start)
            }
        }, speed*1000)
}


startGame()