
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
    constructor(sizeX, sizeY, dev)
    {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.dev = dev
    }
}

class Square {
  constructor(x, y, status) {
    this.x = x, 
    this.y = y;
    this.status = 0;
  }
}



module.exports = { Game, Options, Square }