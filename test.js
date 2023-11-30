const { Snake } = require('./games/snake')
const { Game, Options, Square } = require('./games/game')

let options = new Options(5, 5) 

const testGame = new Snake(options)

testGame.respond()

testGame.move(2)

console.log(testGame.respond())

