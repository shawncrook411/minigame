// const weighted = require("weighted");
// const { snakeWeights } = require('../../utils/random')
const gameControl = querySelector("../../dist/controller.js");
class Game {
  constructor(options) {
    this.options = options;
    this.board = [];
    this.position = [];
  }

  respond() {
    response = "response object";
    return response;
  }
}

class Options {
  constructor(sizeX, sizeY, dev) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.dev = dev;
  }
}

class Square {
  constructor(x, y, status) {
    (this.x = x), (this.y = y);
    this.status = 0;
  }
}

class Snake extends Game {
  constructor(options) {
    super(options);
    this.X = options.sizeX;
    this.Y = options.sizeY;
    this.active = true;
    this.result = 0; //0 : In progress, 1 : Win, -1: Loss
    this.head = { x: 1, y: 1 }; //Will be stored as an array of coordinates for where the head is
    this.size = 10; //Default starting size is 3
    this.score = 0;
    this.direction = 2;

    this.reset();
    this.display();
  }

  table() {
    console.table(this.respond().board);
  }

  terminate() {
    this.active = false;
    console.log("FINAL POSITION");

    this.table();
    return this.respond();
  }

  //Initialize new position
  reset() {
    for (let i = 0; i < this.Y; i++) {
      //Creates a horizontal row, and goes top to bottom. Coord 0, 0 is top left square
      let row = [];
      for (let j = 0; j < this.X; j++) {
        //Creates a new square and sets it to empty to begin
        let square = new Square(j, i, 0);
        row.push(square);
      }
      this.position.push(row);
    }
    this.position[0][0].status = this.size;

    if (!this.options.dev) this.seed();
    console.log("INITIAL POSITION");
    this.table();
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
      score: this.score,
      active: this.active,
      result: this.result,
    };

    for (let row of this.position) {
      let status_row = [];
      for (let square of row) {
        let status_char = square.status;
        status_row.push(status_char);
      }
      response.board.push(status_row);
    }
    return response;
  }

  move(direction) {
    if (!this.active) return;

    //1 = UP        //2 = RIGHT        //3 = DOWN        //4 = LEFT
    if (direction) this.direction = direction;
    else console.log(`Continued moving ${this.direction}`);

    let matrix;
    switch (this.direction) {
      case 1:
      case "UP":
        matrix = { x: 0, y: -1 };
        this.direction = "UP";
        break;
      case 2:
      case "RIGHT":
        matrix = { x: 1, y: 0 };
        this.direction = "RIGHT";
        break;
      case 3:
      case "DOWN":
        matrix = { x: 0, y: 1 };
        this.direction = "DOWN";
        break;
      case 4:
      case "LEFT":
        matrix = { x: -1, y: 0 };
        this.direction = "LEFT";
        break;
    }

    //Set check square
    let check = { x: this.head.x + matrix.x, y: this.head.y + matrix.y };

    //Checks for collision into wall / out-of-bounds
    //Cant use next reference in case index fails
    if (check.x > this.X || check.y > this.Y || check.x < 1 || check.y < 1) {
      console.log("OUT OF BOUNDS! Snake died");
      this.terminate();
      return this.respond();
    }

    let next = this.position[this.head.y + matrix.y - 1][
      this.head.x + matrix.x - 1
    ];

    //Checks if colliding with itself
    if (next.status > 1) {
      console.log(
        `TRIED TO MOVE ${this.direction} & COLLIDED WITH SELF! Snake died`
      );
      this.terminate();
      return this.respond();
    }

    //Checks the status of the of square to see if it contains an Apple before the snake moves
    //If eating apple, increase size
    if (next.status === -1) {
      this.size++;
      this.seed();
    }

    checkSquares: for (let row of this.position) {
      for (let place of row) {
        //Deprecates all snakebody by one, will remove the furthest tail of the snake unless eating
        if (place.status > 0 && next.status != -1) place.status--;

        //Sets the square that the head is moving to the current size
        if (place.x == next.x && place.y == next.y) {
          console.log(`Successfully moved to: ${check.x - 1}, ${check.y - 1}`);
          place.status = this.size;
        }
      }
    }

    this.head = check;
    this.display();

    if (this.options.dev) this.table();
    return this.respond();
  }

  seed() {
    if (!this.active) return;

    //Returns a random weighted empty square
    let apple = snakeWeights(this.options, this.position);
    //Sets the status to -1 (indicated it has an apple)

    console.log(`Apple placed at: ${apple.x} , ${apple.y}`);

    // -1 adjustment because coord's are 1-indexed while array's are 0-indexed
    this.position[apple.y - 1][apple.x - 1].status = -1;

    if (this.options.dev) this.table();
    return this.respond();
  }

  forceSeed(square) {
    this.position[square.y - 1][square.x - 1].status = -1;
    console.log(`Apple placed at: ${square.x} , ${square.y}`);

    if (this.options.dev) this.table();
    return this.respond();
  }

  display() {
    let board = document.getElementById("snakeDisplay");
    while (board.firstChild) board.removeChild(board.firstChild);

    newRow: for (let i = 0; i < this.Y; i++) {
      let row = document.createElement("div");
      row.setAttribute("class", "row");

      newSquare: for (let j = 0; j < this.X; j++) {
        let square = document.createElement("div");
        square.setAttribute("id", `${j}:${i}`);
        square.setAttribute("class", "square");

        let reference = this.position[i][j];
        square.setAttribute("data-status", reference.status);

        row.appendChild(square);
      }
      board.appendChild(row);
    }

    // for (let row of this.position)
    // {
    //     let status_row = []
    //     for (let square of row)
    //     {
    //         let status_char = square.status
    //         status_row.push(status_char)
    //     }
    //     response.board.push(status_row)
    // }
    // return response
  }
}

gameControl.on("connect", (gamepad) => {
  console.log("A new gamepad was connected!");
});
