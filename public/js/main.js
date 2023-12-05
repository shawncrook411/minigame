let direction = 2

startGame = async function () {
    const options = { sizeX: 5, sizeY: 5, dev: true} //NEED TO FIX DEV TO FALSE FOR APPLE TO APPEAR. FIX SNAKEWEIGHT
    const snake = await new Snake(options)   

    const start = setInterval(
        function () {    
        if (snake.active){
            snake.move(direction)
        }
        else {
            alert('You lost')
            clearInterval(start)
        }}, 250)
}

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

startGame()