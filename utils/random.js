const weighted = require('weighted');

var snakeWeights = function(snake) {
    
    position = snake.position

    let weights = []
    let indexes = []

    let y = 0;
    for (let row of position){
        y++

        let x = 0;
        for (let square of row)
        {
            x++
            //Default weight
            let weight = 1

            //Skips squares that are either a snake or already contain an apple
            if (square.status != 0) continue

            //If square is directly adjacent to edge square sets weight to 2
            if ( square.x == 2 || square.x == snake.X - 1 ||
                 square.y == 2 || square.y == snake.Y - 1) weight = 2

            //If square is directly on side of board sets weight to 5
            if ( square.x == 1 || square.x == snake.X || 
                square.y == 1 || square.y == snake.Y ) weight = 5 
                
            weights.push(weight)
            indexes.push({x: x, y: y})
        }
    }

    let result = weighted.select(indexes, weights)
    return result
}

var tic_tac_toe_Weights = function(game){

    position = game.position
    
    let weights = []
    let indexes = []
    let length = game.length

    let y = 0
    for (let row of position){
        y++

        let x = 0;
        for (let square of row)
        {
            x++
            //Default weight
            let weight = 1

            //Skips squares that have already been played
            if (square.status != 0) continue

            const CENTER_WEIGHT = 3
            const EXACT_CENTER_WEIGHT = 10

            if (square.x !== 0 && square.x !== length-1 && square.y !== 0 && square.y !== length-1){
                weight = 0
            }

            //If a square lands on the diagnols, weight of 3
            if ( square.x === square.y ) weight = CENTER_WEIGHT
            if ( square.x === game.length - (square.y + 1)) weight = CENTER_WEIGHT

            //If length is even
            if (!length % 2){
                //If in center column OR center row
                if (square.x === length/2 || square.y === length/2){
                    weight = CENTER_WEIGHT
                }

                if (square.x === length/2 && square.y === length/2){
                    weight = EXACT_CENTER_WEIGHT
                }      
            }
            else{
                if (square.x === Math.floor(length/2) || square.y === Math.floor(length/2)){
                    weight = CENTER_WEIGHT
                } 
                if (square.x === Math.floor(length/2) && square.y === Math.floor(length/2)){
                    weight = EXACT_CENTER_WEIGHT
                }                
            }
            weights.push(weight)
            indexes.push({x: x-1, y: y-1})
        }
    }
    let result = weighted.select(indexes, weights)
    return result
}

var connect4Weights = function(game){
    position = game.position
    
    let weights = []
    let indexes = []
    let height = game.height
    let width = game.width

    let x = 0
    for (let column of position){
        x++

        let y = 0;
        for (let square of column)
        {
            y++
            //Default weight
            let weight = 1

            //Skips squares that have already been played
            if (square.status != 0) continue


            const CENTER_WEIGHT = 3

            if (square.x !== 0 && square.x !== width-1 && square.y !== 0 && square.y !== height-1){
                weight = 0
            }

            //If length is even
            if (!width % 2){
                //If in center column 
                if (square.x === width/2){
                    weight = CENTER_WEIGHT
                }                    
            }
            else{
                if (square.x === Math.floor(width/2)){
                    weight = CENTER_WEIGHT
                }                               
            }

            weight = weight * square.y

            weights.push(weight)
            indexes.push({x: x-1, y: y-1})
        }
    }
    let result = weighted.select(indexes, weights)
    return result
}

module.exports = { snakeWeights, tic_tac_toe_Weights, connect4Weights }