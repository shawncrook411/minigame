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
        this.dev = options.dev

        this.reset()
        this.display()
    }

    terminate(result) {
        this.active = false
        this.result = result
        console.log('FINAL POSITION')

        
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

    check() {
        if (this.checkVERTICAL()) return true
        if (this.checkHORIZONTAL()) return true        
        if (this.checkDIAGNOL()) return true
        return false
    }

    checkVERTICAL(){
        const matrix = {x: 0, y: 1}
        let row = this.position[0]
        checkSquares: for (let square of row){          
                if (square.status != 0)
                {
                    let status = square.status
                    for (let i = 1; i < this.length; i++)
                    {
                        let next = this.position[square.y + matrix.y * i][square.x + matrix.x * i]
                        if (next.status !== square.status){
                            continue checkSquares
                        }
                    }
                    return true
                }
        } 
        return false
    }    


    checkHORIZONTAL(){
        const matrix = {x: 1, y: 0}
        checkRows: for (let row of this.position){
            let square = row[0]
                if (square.status != 0)
                {
                    let status = square.status
                    for (let i = 1; i < this.length; i++)
                    {
                        let next = this.position[square.y + matrix.y * i][square.x + matrix.x * i]
                        if (next.status !== square.status){
                            continue checkRows
                        }
                    }
                    return true
                }
        } 
        return false
    }

    checkDIAGNOL(){ 
        const matrix = {x: 1, y: 1}
        checkRows: for (let row of this.position){
            let square = row[0]
                if (square.status != 0)
                {
                    let status = square.status
                    for (let i = 1; i < this.length; i++)
                    {
                        let next = this.position[square.y + matrix.y * i][square.x + matrix.x * i]
                        if (next.status !== square.status){
                            continue checkRows
                        }
                    }
                    return true
                }
        } 
        return false}     
    
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

        let reference = this.position[square.y][square.x]
        reference.status = square.status

        this.position[square.y][square.x] = reference

        this.display()

        //Deprecated until fetch is setup
        // this.placement()

        console.log(this.check())

        return this.respond()
    }

    submit(square)
    {
        this.move(square)
        this.placement()
        this.display()
    }

    placement = async function() {
        if (!this.active) return

        //Return Square {x: x, y: y, status: status}
        // const placement = await fetchPlacement(this)

        const placement = new Square(2, 3, 'O')
        this.move(placement)
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
        // this.check()
    }
    listen(){}    
}

