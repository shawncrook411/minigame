const weighted = require("weighted");
const { Game, Options, Square } = require('./game')
const { snakeWeights } = require('../utils/random')


class Snake extends Game {
    constructor(options) {
        super(options)
        this.X = options.sizeX; 
        this.Y = options.sizeY;
        this.snake = {x: 0, y: 0} //Will be stored as an array of coordinates for where the head is
        this.size = 1
        this.score = 0

        this.reset() 
    }
    
    //Initialize new position
    reset() {
        for (let i = 0; i < this.Y; i++) {
            //Creates a horizontal row, and goes top to bottom. Coord 0, 0 is top left square
            let row = []
            for (let j = 0; j < this.X; j++) {
                //Creates a new square and sets it to empty to begin
                let square = new Square(j, i, 0)
                row.push(square)
            }
            this.position.push(row)
        }
        this.position[0][0].status = 1
        // this.writeBoard()
    }

    //Creates a response object for the GET requests to display the board state:
    //Format:
    // [0, 1, 2, 3, 4, 5, 6],
    // [0, 1, 2, 3, 4, 5, 6],
    // [0, 1, 2, 3, 4, 5, 6],
    // [0, 1, 2, 3, 4, 5, 6],

    respond() {
        let response = {
            options: this.options,
            board: [],
            score: this.score
        };

        for (let row of this.position)
        {
            let status_row = []
            for (let square of row)
            {
                let status_char = square.status
                status_row.push(status_char)
            }
            response.board.push(status_row)
        }
        return response
    }

    move(direction) {
        //1 = UP        //2 = RIGHT        //3 = DOWN        //4 = LEFT
        let matrix
        switch (direction) {
            case 1:
                matrix = { x: 0, y:1 }
                break
            case 2:
                matrix = { x: 1, y:0 }
                break
            case 3:
                matrix = { x: 0, y:-1}
                break
            case 4:
                matrix = { x:-1, y:0 }
                break

            default :
                console.log('Invalid Direction Error')
                break
        }

        checkSquares: for(let row of this.position){
            for(let place of row){
                //Deprecates all squares by one, will remove the furthest tail of the snake
                if (place.status > 0) place.status--

                if (place.position.x == this.snake.x + matrix.x && 
                    place.position.y == this.snake.y + matrix.y){
                        place.status = this.size
                        this.snake.x += matrix.x
                        this.snake.y += matrix.y
                        break checkSquares
                    }
            }
        }
    }

    seed(){        
        let apple = snakeWeights(this.options, this.position)

    }
    

    }
   
    // apple() {
    //     console.log('apple')
    // }

}

module.exports = { Snake }