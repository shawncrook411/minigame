

    

startGame = async function () {
    const options = { sizeX: 5, sizeY: 5, dev: true}
    const snake = await new Snake(options)

    const start = setInterval(
        function () {    
        if (snake.active){
            snake.move()
        }
        else {
            clearInterval(start)
        }}, 1500)
}

startGame()

