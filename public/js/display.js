
class Display{
    constructor(response)
    {
        this.options = response
        this.position = response.position
        // this.time_WHITE = response.players[0].time
        // this.time_BLACK = response.players[1].time
        this.displayBOARD()
    }

    displayBOARD(){
        //Row decreases, generate top to bottom rows
        newRow: for(let i = this.options.height; i > 0; i--)
        {
            let column = document.createElement('div')
            column.setAttribute('class', 'column')
            newSquare: for (let j = 0; j < this.options.width; j++)
            {
                let square = document.createElement('div')
                square.setAttribute('id',  `${String.fromCharCode(8 - i + 65).toUpperCase()}${j+1}`,  )            

                if( (j+i) % 2 == 0){ square.setAttribute('class', 'square primary_square') }
                else { square.setAttribute('class', 'square secondary_square')}

                column.appendChild(square);
            }

            let board = document.getElementById("snakeDisplay")
            board.appendChild(column)
        }

        // displayPieces_row: for (let i = 0; i < this.options.height; i++)
        // {
        //     displayPieces_checkSquare: for (let j = 0; j < this.options.width; j++)
        //     {
        //         let char = this.position.placement[7 - i][j]
        //         if (char !== '-')
        //         {
        //             let color = 'b'
        //             if(char !== char.toLowerCase()) { color = 'w'}

                    
        //             let source = `${DATA.piecelink}/${DATA.style}/${color}${char.toUpperCase()}.svg`

        //             let anchor = document.createElement('a')
        //             let image = document.createElement('img')

        //             image.setAttribute('src', source)

        //             let square = document.getElementById(`${String.fromCharCode(j+65).toUpperCase()}${i+1}`)

        //             square.appendChild(anchor)
        //             anchor.appendChild(image)
        //         }                
        //     }
        // }
    }
}
