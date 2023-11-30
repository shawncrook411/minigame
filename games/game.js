
class Game {
    constructor(options) {
        this.options = options;
        this.board = []
        this.position = []
    }

    respond() {
        response = "response object";
        return response;
    }



}
    
class Options {
    constructor(sizeX, sizeY,)
    {
        this.sizeX = sizeX
        this.sizeY = sizeY
    }
}

class Square {
  constructor(x, y, status) {
    this.position = {x: x, y: y};
    this.status = 0;
  }
}



module.exports = { Game, Options, Square }