class Square {
    constructor(x, y, status){
        this.x = x
        this.y = y
        this.status = status
    }
}

class Connect4{
    constructor(options){
        this.height = options.height
        this.width = options.width
        this.active = true
        this.result = 0
        this.position = []
        this.winSize = 4
        this.dev = options.dev
        this.moves = 0

        this.reset()
        this.display()
    }

    terminate(status) {
        this.active = false
        if (status === "Red") this.result = 'Win'
        if (status === "Yellow") this.result = 'Loss'
        if (status === 'Draw') this.result = 'Draw'
        console.log('FINAL POSITION')
        alert(`${this.result} is the Winner!`)
        sendResult(this.result)
        return this.respond()
    }

    reset() {
        for ( let x = 0; x < this.width; x++) {
            let column = []
            for (let y = 0; y < this.height; y++) {
                let square = new Square(x, y, 0)
                column.push(square)
            }
            this.position.push(column)
        }
    }

    check(){ ///MUST FIX
        const master = [
            {x: 0, y: 1}, //Checks veritcal columns
            {x: 1, y: 0}, //Checks horizontal rows
            {x: 1, y: 1}, //Checks bottom-left to top-right diagnol
            {x: -1, y: 1},//Checks bottom-right to top-left diagnol
        ]

        checkDirections: for(let direction = 0; direction < 4; direction++)
        {
            const matrix = master[direction]

            checkColumns: for (let column of this.position){
                checkSquares: for (let square of column){

                    if (square.x < 3 && direction === 3) continue checkSquares
                    if (square.x > this.width - this.winSize && (direction === 1 || direction === 2)) continue checkSquares
                    if (square.y > this.height - this.winSize && direction !== 1) continue checkSquares

                    if (square.status != 0)
                    {
                        checkWin: for (let length = 0; length < this.winSize; length++)
                        {
                            console.log( "Start:")
                            console.log(`${square.y} > ${this.height} - ${this.winSize} && ${direction}`)
                            console.log(square)
                            console.log("=======")
                            let next = this.position[square.x + matrix.x * length][square.y + matrix.y * length]
                            console.log( "Next:")
                            console.log(next)
                            console.log("=======")

                            if (next.status !== square.status){
                                continue checkSquares
                            }
                        }
                        return square.status
                    }
                }
            }        
        }
        return false
    }

    respond() {
        let response = {
            result: this.result,
            board: []
        }
        for (let column of this.position)
        {
            let status_column = []
            for (let square of column)
            {
                let status_char = square.status
                status_column.push(status_char)
            }
            response.board.push(status_column)
        }
        return response
    }

    //Column # ONLY
    //Square {x: , y: n/a, status: status}
    move(input){
        if (!this.active) return
        this.moves++

        for (let square of this.position[input.x]){
            if (square.status != 0) continue
            square.status = input.status

            this.display()
            return this.respond()
        }
    }

    submit(square)
    {
        this.move(square)
        if(this.active) this.placement()
        this.display()
    }

    placement = async function() {
        if (!this.active) return

        //Return Square {x: x, y: y, status: status}
        const placement = await fetchPlacement(this)
        let input = new Square(placement.x, placement.y, 'Yellow')
        this.move(input)
    }

    display(){
        let board = document.getElementById("gameDisplay")
        while (board.firstChild) board.removeChild(board.firstChild)

        newColumn: for(let x = 0; x < this.width; x++){
            let column = document.createElement('div')
            column.setAttribute('class', 'column')

            newSquare: for (let y = this.height - 1; y >= 0; y--){
                let square = document.createElement('div')
                square.setAttribute('id', `${x}:${y}`)
                square.setAttribute('data-column', `${x}`)
                square.setAttribute('class', 'square')

                square.addEventListener('click', (event) => {
                    let target = event.target
                    let column_id = target.getAttribute('data-column')
                    this.submit(new Square(column_id, -1, 'Red'))
                })

                let reference = this.position[x][y]
                if (reference.status !== 0) square.setAttribute('data-status', reference.status)

                if(reference.status === 'Red') square.classList.add('redCircle')
                if(reference.status === 'Yellow') square.classList.add('yellowCircle')
                column.appendChild(square)
            }        
            board.appendChild(column)
        }
        let status = this.check()
        if (status){
            this.terminate(status)
        }

        if (this.moves === this.width * this.height) this.terminate('Draw')
    }
    listen(){}
}