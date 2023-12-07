class Square {
  constructor(x, y, status) {
    (this.x = x), (this.y = y);
    this.status = 0;
    this.snake_direction = 0;
    //0 is for NOT SNAKE //1 is UP //2 is RIGHT //3 is DOWN //4 is LEFT
  }
}

class Snake {
  constructor(options) {
    this.options = options;
    this.X = options.sizeX;
    this.Y = options.sizeY;
    this.active = true;
    this.result = 0; //0 : In progress, 1 : Win, -1: Loss
    this.head = { x: 1, y: 1 }; //Will be stored as an array of coordinates for where the head is
    this.size = options.size; //Default starting size is 3
    this.score = 0;
    this.direction = 2;
    this.previousDirection = 2;
    this.position = [];

    this.reset();
    this.display();
  }

  table() {
    console.table(this.respond().board);
  }

  terminate(cause) {
    this.active = false;
    this.termination = cause;
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
    //This logic prevents the user from abruptly facing around. Must alternate vertical and horizontal directions
    if (direction && this.direction % 2 != direction % 2) {
      this.previousDirection = this.direction;
      this.direction = direction;
    } else {
      this.previousDirection = this.direction;
      console.log(`Continued moving ${this.direction}`);
    }

    let matrix;
    switch (this.direction) {
      case 1:
      case "UP":
        matrix = { x: 0, y: -1 };
        this.direction = 1;
        break;
      case 2:
      case "RIGHT":
        matrix = { x: 1, y: 0 };
        this.direction = 2;
        break;
      case 3:
      case "DOWN":
        matrix = { x: 0, y: 1 };
        this.direction = 3;
        break;
      case 4:
      case "LEFT":
        matrix = { x: -1, y: 0 };
        this.direction = 4;
        break;
    }

    //Set check square
    let check = { x: this.head.x + matrix.x, y: this.head.y + matrix.y };

    //Checks for collision into wall / out-of-bounds
    //Cant use next reference in case index fails
    if (check.x > this.X || check.y > this.Y || check.x < 1 || check.y < 1) {
      this.terminate("OUT OF BOUNDS!... Snake died");
      return this.respond();
    }

    let next = this.position[this.head.y + matrix.y - 1][
      this.head.x + matrix.x - 1
    ];

    //Checks if colliding with itself
    if (next.status > 1) {
      this.terminate(`TRIED TO MOVE & COLLIDED WITH SELF!... Snake died`);
      return this.respond();
    }

    //Checks the status of the of square to see if it contains an Apple before the snake moves
    //If eating apple, increase size
    if (next.status === -1) {
      this.size++;
      this.score++;
      this.seed();
    }

    checkSquares: for (let row of this.position) {
      for (let place of row) {
        //Sets the PREVIOUS head to the direction angles
        if (place.status === this.size)
          place.snake_direction = [this.previousDirection, this.direction];

        //Deprecates all snakebody by one, will remove the furthest tail of the snake unless eating
        if (place.status > 0 && next.status != -1) place.status--;

        //Sets the square that the head is moving to the current size
        if (place.x == next.x && place.y == next.y) {
          console.log(`Successfully moved to: ${check.x - 1}, ${check.y - 1}`);
          place.snake_direction = [this.direction, this.previousDirection];
          place.status = this.size;
        }
      }
    }

    this.head = check;
    this.display();

    if (this.options.dev) this.table();
    return this.respond();
  }

  seed = async function() {
    if (!this.active) return;

    //Returns a random weighted empty square
    const apple = await fetchApple(this);
    //Sets the status to -1 (indicated it has an apple)

    console.log(`Apple placed at: ${apple.x} , ${apple.y}`);

    // -1 adjustment because coord's are 1-indexed while array's are 0-indexed
    this.position[apple.y - 1][apple.x - 1].status = -1;

    if (this.options.dev) this.table();
    return this.respond();
  };

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

        let reference = this.position[i][j];
        switch (reference.status) {
          case 0:
            square.setAttribute("class", "square");
            break;
          case -1:
            square.setAttribute("class", "apple");
            break;
          case this.size:
            square.setAttribute("class", "head");
            square.setAttribute("data-direction", reference.snake_direction);
            break;
          default:
            square.setAttribute("class", "snake");
            square.setAttribute("data-direction", reference.snake_direction);
            break;
        }

        if (reference.x === 0) square.classList.add("left_border");
        if (reference.x === this.X - 1) square.classList.add("right_border");
        if (reference.y === 0) square.classList.add("top_border");
        if (reference.y === this.Y - 1) square.classList.add("bottom_border");

        //Must be snake
        if (reference.status > 0) {
          let d = reference.snake_direction;
          //If snake is traveling in straight line, do straight borders
          if (d[0] === d[1]) {
            if (d[1] % 2) {
              //Traveling straight up/down (1 or 3 % 2 = 1 which evalutates to true)
              square.classList.add("left_border");
              square.classList.add("right_border");
            } else {
              //Traveling straight left/right
              square.classList.add("top_border");
              square.classList.add("bottom_border");
            }
          }
          //Otherwise we need to caluclate the corners
          else {
            if (d[0] === 1) square.classList.add("top_border");
            if (d[0] === 2) square.classList.add("right_border");
            if (d[0] === 3) square.classList.add("bottom_border");
            if (d[0] === 4) square.classList.add("left_border");

            if (d[1] === 1) square.classList.add("bottom_border");
            if (d[1] === 2) square.classList.add("left_border");
            if (d[1] === 3) square.classList.add("top_border");
            if (d[1] === 4) square.classList.add("right_border");
          }

          if (reference.status === 1) {
            if (d[0] === 1) square.classList.add("bottom_border");
            if (d[0] === 2) square.classList.add("left_border");
            if (d[0] === 3) square.classList.add("top_border");
            if (d[0] === 4) square.classList.add("right_border");
          }

          if (reference.status === this.size) {
            if (d[1] === 1) square.classList.add("top_border");
            if (d[1] === 2) square.classList.add("right_border");
            if (d[1] === 3) square.classList.add("bottom_border");
            if (d[1] === 4) square.classList.add("left_border");
          }
        }

        square.setAttribute("data-status", reference.status);
        row.appendChild(square);
      }
      board.appendChild(row);
    }
  }
}
