import Cupid from './cupid';

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        canvas.width = 760;
        canvas.height = 502;
        const dimensions = { width: canvas.width, height: canvas.height};
        
        this.cupid = new Cupid(dimensions);
        this.play();
    }; 

    play() {
        this.cupid.drawCupid();
        // this.cupid.moveCupid();
    }

}

// module.exports = Game;