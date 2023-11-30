const weighted = require('weighted');

var snakeWeights = function(options, position) {

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
            if ( square.position.x == 2 || square.position.x == options.sizeX - 1 ||
                 square.position.y == 2 || square.position.y == options.sizeY - 1) weight = 2

            //If square is directly on side of board sets weight to 5
            if ( square.position.x == 1 || square.position.x == options.sizeX || 
                square.position.y == 1 || square.position.y == options.sizeY ) weight = 5 
                
            weights.push(weight)
            indexes.push({x: x, y: y})
        }
    }

    let result = weighted.select(indexes, weights)
    return result
}

module.exports = { snakeWeights }