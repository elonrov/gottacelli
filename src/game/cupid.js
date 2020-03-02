export default class Cupid {
    constructor(dimensions) {
        this.dimensions = dimensions; 
        const canvas = document.getElementById("canvas-background");
        this.ctx = canvas.getContext("2d");

        this.cupidX = 300; 
        this.cupidY = 20;

        this.cupidHeight = 95; 
        this.cupidWidth = 150; 

        this.drawCupid = this.drawCupid.bind(this); 
        this.moveCupid = this.moveCupid.bind(this);
        this.upPressed = false;
        this.downPressed = false; 

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
    }

    drawCupid() {
        const {cupidX, cupidY} = this;
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        const img = new Image();
        
        if (this.leftPressed) {
            img.src = "src/images/cupid-left.png"
        } else if (this.rightPressed) {
            img.src = "src/images/cupid-right.png"
        } else if (!this.leftPressed && !this.rightPressed) {
            img.src = "src/images/cupid-left.png"
        };
        
        
        // img.src = "src/images/cupid-left.png";
        img.onload = () => {
            this.ctx.drawImage(img, cupidX, cupidY, 150, 95)
        }; 
    }

    moveCupid() {
        // debugger
        if (this.rightPressed) {
            this.cupidX += 9;
            this.drawCupid();
        } else if (this.leftPressed) {
            this.cupidX -= 9;
            this.drawCupid();
        };
    }

    keyDownHandler(e) {
        e.preventDefault();
        if (e.key == "Right"  || e.key == "ArrowRight") {
            this.rightPressed = true; 
            this.moveCupid();
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true; 
            this.moveCupid();
        }
    };

    keyUpHandler(e) {
        e.preventDefault();
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    };
}



    // flyCupid() {
    //     // debugger
    //     this.velocity += this.gravity; 
    //     this.y += this.velocity;

    //     if (this.y < 0) {
    //         this.y = 0;
    //         this.velocity = 0;
    //     }

    // }


