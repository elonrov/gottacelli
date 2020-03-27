![](src/readmeAssets/title.png)


Gottacelli Botticelli is a game based on the painting "Primavera" by Sandro Botticelli. Fly cupid around the orange grove, avoiding the lingering winter clouds, being careful not to touch the ground. Score points by catching falling oranges. While Mercury fails to protect Flora from the winter chill, Cupid must help her make the most of the last days of spring.

Fly around using the arrow keys. Press "enter" to start and "m" to mute.  

Gottacelli was built using JavaScript's CanvasJS charting library. 

![](src/readmeAssets/instructions3.png)

Moving Cupid: 
An event listener is set up for keydown and keyup on all four arrow keys. The image source is flipped from left-facing to right-facing depending on the direction the user wants to fly. 

![](src/readmeAssets/gameplay.gif)

```JavaScript
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
```

Spinning 'museum panels': 
The CSS transform property was used to rotate two images simultaneously on the Y-axis. The backface-visibility property is used to display the front or back of the card as the user hovers or un-hovers over the card.

![](src/readmeAssets/transform.gif) 

```JavaScript 
.flip-card-inner {
  position: relative; 
  width: auto; 
  height: 191px; 
  text-align: center; 
  transition: transform 0.8s; 
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  width: auto;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
```
