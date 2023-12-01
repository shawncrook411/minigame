const { Snake } = require('./games/snake')
const { Game, Options, Square } = require('./games/game')

var startSnake = function(){
    let options = new Options(5, 5, true)
    return new Snake(options)
}

const test = startSnake()

test.move('DOWN')
test.move()
test.move()
test.move()
test.move('RIGHT')
test.move('UP')
test.move()
test.move()
test.move()
test.move('LEFT')

//METHODS

//snake.move(4)                     moves right
//snake.move()                      moves the last direction
//snake.seed()                      places a random apple
//snake.forceSeed( {x: x, y: y})    places an apple at the square
//snake.table()                     displays the current position
//snake.respond()                   returns a response object for HTTP
//snake.reset()                     creates blank game