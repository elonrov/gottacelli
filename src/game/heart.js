import Sound from './sound';

export default class Heart {
  constructor(canvasWidth, canvasHeight) {
    const canvas = document.getElementById("canvas-background");
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.heartWidth = 35;
    this.heartHeight = 35;
    this.sound = new Sound("src/sounds/heart.mp3");

    this.heartX = Math.floor(Math.random() * Math.floor(650));
    this.heartY = -15;
    this.now = 0;

    this.drawHeart = this.drawHeart.bind(this);
  }

  drawHeart(ctx) {
    const img = new Image();
    img.src = "src/images/heart.png";
    ctx.drawImage(img, this.heartX, this.heartY, this.heartWidth, this.heartHeight)
    this.fall();
  }

  fall() {
    this.heartY += 6;
  }
}