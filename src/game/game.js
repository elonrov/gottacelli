import Cupid from './cupid';
import Orange from './orange';
import Cloud from './cloud';

export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.cupid = new Cupid(this.canvasWidth, this.canvasHeight);
        
        this.playing = false;
        this.soundOn = true;
        this.highScore = 0;

        this.oranges = [];
        let orange = new Orange;
        this.oranges.push(orange);
        this.clouds = [new Cloud, new Cloud];
        
        this.frameO = 0;
        this.frameC = 0;        
        this.frameId = null;

        this.gameOver = this.gameOver.bind(this);
        this.gameUpdate = this.gameUpdate.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.endGame = this.endGame.bind(this);

        const frame = document.getElementById("canvas-frame");
        this.ctxFrame = frame.getContext("2d");
        this.drawFrameNav = this.drawFrameNav.bind(this);
        this.drawHealthBar = this.drawHealthBar.bind(this);
        this.updateFrameNav = this.updateFrameNav.bind(this);

        document.addEventListener("keydown", this.keyHandler(), false);
    };

    keyHandler() {
        const { restartGame } = this;
        return e => {
            e.preventDefault();
            if (e.key == "Enter") {
                console.log("enter");
                this.playing = true;
                restartGame();
            } else if (e.key == "m") {
                this.soundOn = !this.soundOn;
            }
        }
    };

    endGame() {
        this.playing = false;
        document.getElementById("instructions").classList.add("visible");
        document.getElementById("canvas-background").classList.add("fade");
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.cupid = new Cupid(this.canvasWidth, this.canvasHeight);
        
        this.cupid.drawCupid(this.ctx);
    }

    restartGame() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId)
        }
        document.getElementById("instructions").classList.remove("visible");
        document.getElementById("canvas-background").classList.remove("fade");

        this.cupid.drawCupid(this.cupid.ctx);
        this.cupid.moveCupid("gravity");
        
        this.gameUpdate();
        this.updateFrameNav();
    }

    gameOver() {
        if ((this.cupid.cupidY + this.cupid.cupidHeight - 30 > this.canvasHeight) || this.cupid.health < 0) {
            if (this.cupid.score > this.highScore) {
                this.highScore = this.cupid.score;
            }
            return true;
        }
        return false;
    }

    detectOrangeCollision(orange) {
        const orangeCenterX = ((orange.orangeX + ( orange.orangeX +  orange.orangeWidth)) / 2 ); 
        const orangeCenterY = ((orange.orangeY + ( orange.orangeY +  orange.orangeHeight)) / 2 );
        const cupidTop = ((this.cupid.cupidY)); 
        const cupidBottom = ((this.cupid.cupidY + this.cupid.cupidHeight));
        const cupidLeft = ((this.cupid.cupidX)); 
        const cupidRight = ((this.cupid.cupidX + this.cupid.cupidWidth));
        if (((orangeCenterX > cupidLeft) && (orangeCenterX < cupidRight)) && 
            ((orangeCenterY > cupidTop) && (orangeCenterY < cupidBottom))) {
            if (this.soundOn) {
                orange.sound.play();
            }
            this.oranges.shift();
            this.cupid.score += 1;
            return true;
        } else if (orangeCenterY > this.canvasHeight) {
            this.oranges.shift();
        };
    }

    detectCloudCollision(cloud) {
        const cloudCenterX = ((cloud.cloudX + (cloud.cloudX + cloud.cloudWidth)) / 2);
        const cloudCenterY = ((cloud.cloudY + (cloud.cloudY + cloud.cloudHeight)) / 2);
        const cupidTop = ((this.cupid.cupidY));
        const cupidBottom = ((this.cupid.cupidY + this.cupid.cupidHeight));
        const cupidLeft = ((this.cupid.cupidX));
        const cupidRight = ((this.cupid.cupidX + this.cupid.cupidWidth));
        if (((cloudCenterX > cupidLeft) && (cloudCenterX < cupidRight)) &&
            ((cloudCenterY > cupidTop) && (cloudCenterY < cupidBottom))) {
            if (this.soundOn) {
                cloud.sound.play();
            };
            this.cupid.health -= 1.7;
        }; 
        if ((cloud.dir === "left") && (cloud.cloudX < -200)) {
            this.clouds.shift(); 
        };
    };

    gameUpdate() {
        if (this.playing === true) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            this.cupid.newPos();
            this.cupid.drawCupid(this.ctx);
            
            this.frameO += 1;
            this.frameC += 1;

            this.oranges.forEach(orange => {
                orange.drawOrange(this.ctx);
            });

            this.clouds.forEach(cloud => {
                cloud.drawCloud(this.ctx);
            })

            if (this.frameO > 100) {
                this.oranges.push(new Orange);
                this.frameO = 0;
            }; 

            if(this.frameC > 175) {
                this.clouds.push(new Cloud);
                this.frameC = 0;
            }; 

            this.oranges.forEach(orange => {
                this.detectOrangeCollision(orange);
            });

            this.clouds.forEach(cloud => {
                this.detectCloudCollision(cloud);
            });

            if (this.gameOver()) {
                console.log("Game Over! Play again.");
                this.endGame();
            }

            this.frameId = requestAnimationFrame(this.gameUpdate);
        }
    }

    drawFrameNav() {
        this.ctxFrame.clearRect(0, 0, 900, 50);
        this.ctxFrame.fillStyle = ("White");
        this.ctxFrame.font = ("bolder 38px Arial");
        // this.ctxFrame.font = ("Arial");
        this.ctxFrame.lineWidth = 2.5;
        this.ctxFrame.strokeStyle = ("Black");
        this.ctxFrame.fillText(`Score: ${this.cupid.score} | Health: `, 10, 35);
        this.ctxFrame.strokeText(`Score: ${this.cupid.score} | Health: `, 10, 35);
        this.ctxFrame.fillText(`High Score: ${this.highScore}`, 635, 32);
        this.ctxFrame.strokeText(`High Score: ${this.highScore}`, 635, 32);

    }

    drawHealthBar() {
        this.ctxFrame.beginPath(); 
        this.ctxFrame.rect(345, 10, 270, 25); 
        this.ctxFrame.strokeStyle = "#000000";
        this.ctxFrame.strokeRect(345, 10, 270, 25);
        this.ctxFrame.lineWidth = 2.25;
        this.ctxFrame.fillStyle = "#e84625";
        this.ctxFrame.fill();

        this.ctxFrame.beginPath(); 
        this.ctxFrame.rect(345, 10, this.cupid.health, 25); 
        this.ctxFrame.fillStyle = "#2c9926"; 
        this.ctxFrame.fill();
    }
    
    updateFrameNav() {
        this.drawFrameNav();
        this.drawHealthBar();
        requestAnimationFrame(this.updateFrameNav);
    }

}

