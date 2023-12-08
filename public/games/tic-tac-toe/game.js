class Square {
    constructor(x, y, status){
        this.x = x
        this.y = y
        this.status = status
    }
}

class Tic_Tac_Toe{
    constructor(options){
        this.length = options.length
        this.active = true
        this.result = 0
        this.position = []
        this.moves = 0
        this.dev = options.dev

        this.reset()
        this.display()
    }

    terminate(status) {
        this.active = false
        if (status === "X") this.result = 'Win'
        if (status === "O") this.result = 'Loss'
        if (status === 'Draw') this.result = 'Draw'

        console.log('FINAL POSITION')
        alert(`${this.result} is the Winner!`)        
        return this.respond()
    }

    reset() {
        for (let i = 0; i < this.length; i++) {
            let row = []
            for(let j = 0; j < this.length; j++) {
                let square = new Square(j, i, 0)
                row.push(square)
            }
            this.position.push(row)
        }
    }   

    check(){

        checkDirections: for (let i = 0; i < 4; i++)
        {
            const master = [
                {x: 0, y: 1}, //Checks veritcal columns
                {x: 1, y: 0}, //Checks horizontal rows
                {x: 1, y: 1}, //Checks top-left to bottom-right diagnol
                {x: 1, y: -1},//Checks bottom-left to top-right diagnol
            ]

            const nextMatrix = [ //Used so that you can check the multiple rows and columns, however there are only the two individual diagnols
                {x: 1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: 0},
                {x: 0, y: 0}                
            ]

            let origin;
            const matrix = master[i]
            if (i < 3)  {origin = this.position[0][0]}
            else        {origin = this.position[this.length-1][0]}


            checkMultiples: for (let k = 0; k < this.length; k++){
                let start = { }
                const next = nextMatrix[i]  
                start.x = origin.x + (next.x * k)
                start.y = origin.y + (next.y * k)   
                
                start = this.position[start.y][start.x]

                if (start.status != 0)
                {                            
                    checkSquares: for (let j = 1; j < this.length; j++) {

                        let square = this.position[start.y + matrix.y * j][start.x + matrix.x * j]
                        if (square.status !== start.status){
                            if (i > 1)  continue checkDirections //Only need to check the diagnols a single time
                            else        continue checkMultiples
                        }                    
                    }
                    return start.status
                }
            }
        }
        if (this.moves === this.length*this.length) this.terminate('Draw')
        return false
    }

    respond() {
        let response = {
            result: this.result,
            board: []
        }
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

    //Square {x: x, y: y, status: status}
    //Can be used as dev to force place the computer move
    move(square) {
        if (!this.active) return
        this.moves++

        let reference = this.position[square.y][square.x]
        reference.status = square.status

        this.position[square.y][square.x] = reference

        this.display()
        return this.respond()
    }

    submit(square)
    {
        this.move(square)
        this.display()
        let status = this.check()
        if(status){
            this.terminate(status)
        }  
        this.placement()
        status = this.check()
        if(status){
            this.terminate(status)
        }
    }

    placement = async function() {
        if (!this.active) return

        //Return Square {x: x, y: y, status: status}
        const placement = await fetchPlacement(this)
        console.log(placement)
        let select_square = new Square(placement.x, placement.y, 'O')
        this.move(select_square)
    }

    display(){
        let board = document.getElementById("gameDisplay")
        while (board.firstChild) board.removeChild(board.firstChild)

        newRow: for(let i = 0; i < this.length; i++){
            let row = document.createElement('div')
            row.setAttribute('class', 'row')

            newSquare: for (let j = 0; j < this.length; j++){
                let square = document.createElement('div')
                square.setAttribute('id', `${j}:${i}`)
                square.setAttribute('class', 'square')
                
                square.addEventListener('click', (event) => {
                    let target = event.target

                    if (!target.getAttribute('data-status'))
                    {
                        let id = target.getAttribute('id')
                        let split = id.split(':')
                        this.submit(new Square(split[0], split[1], 'X'))
                    } 
                })
                
                let reference = this.position[i][j]
                if (reference.status !== 0) square.setAttribute('data-status', reference.status)
                row.appendChild(square)
            }
            board.appendChild(row)
        }      
    }
    listen(){}    
}

