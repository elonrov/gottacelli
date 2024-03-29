

export default class Cupid {
    constructor(canvasWidth, canvasHeight) {
        const canvas = document.getElementById("canvas-background");
        this.ctx = canvas.getContext("2d");

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.cupidWidth = 128;
        this.cupidHeight = 80.75;

        this.cupidX = 250;
        this.cupidY = 20;
        this.dirX = 0;
        this.dirY = 0;

        this.health = 270;
        this.score = 0;

        this.imgSrc = "src/images/cupid-left.png";

        this.drawCupid = this.drawCupid.bind(this);
        this.moveCupid = this.moveCupid.bind(this);

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);

        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
    }

    drawCupid(ctx) {
        const img = new Image();
        img.src = this.imgSrc
        ctx.drawImage(img, this.cupidX, this.cupidY, this.cupidWidth, this.cupidHeight)
    }

    moveCupid(direction) {
        switch (direction) {
            case "none":
                this.dirX = 0;
                break;
            case "left":
                this.dirX = -5;
                this.imgSrc = "src/images/cupid-left.png"
                break;
            case "right":
                this.dirX = 5;
                this.imgSrc = "src/images/cupid-right.png"
                break;
            case "up":
                this.dirY = -10;
                break
            case "gravity":
                this.dirY = 4;
                break;
        }
    };
    
    keyDownHandler(e) {
        e.preventDefault();
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.moveCupid("right");
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.moveCupid("left");
        } else if (e.key == "Up" || e.key == "ArrowUp") {
            this.moveCupid("up");
        }
    };

    keyUpHandler(e) {
        e.preventDefault();
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.moveCupid("none");
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.moveCupid("none");
        } else if (e.key == "Up" || e.key == "ArrowUp") {
            this.moveCupid("gravity");
        };
    };

    newPos() {
        this.cupidX += this.dirX;
        this.cupidY += this.dirY;
        this.detectBorders();
    };

    detectBorders() {
        if (this.cupidX < -100) {
            this.cupidX = 600;
        }
        if (this.cupidX + this.cupidWidth > this.canvasWidth + 100) {
            this.cupidX = -50;
        }
        if (this.cupidY < -100) {
            this.cupidY = -90;
        }
    };
    
};
