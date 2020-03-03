import Cupid from './cupid';

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.cupid = new Cupid(this.canvasWidth, this.canvasHeight);

        this.play();

        this.gameUpdate = this.gameUpdate.bind(this);
        this.gameUpdate();
    };

    play() {
        this.cupid.drawCupid(this.ctx);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };

    gameUpdate() {
        this.clear();
        this.cupid.newPos();
        this.cupid.drawCupid(this.ctx);
        requestAnimationFrame(this.gameUpdate);
    }

}
