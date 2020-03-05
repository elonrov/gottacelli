import Sound from "./sound";

export default class Cloud {
  constructor(canvasWidth, canvasHeight) {
    const canvas = document.getElementById("canvas-background");
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.cloudWidth = 200;
    this.cloudHeight = 100;
    this.sound = new Sound("src/sounds/thunder.mp3");
    
    this.cloudX = "";
    this.dir = Math.random() < 0.5 ? "left" : "right";
    if (this.dir === "left") {
      this.cloudX = 800;
    } else if (this.dir === "right") {
      this.cloudX = -200;
    };
    this.cloudY = Math.floor(Math.random() * Math.floor(400));

    this.drawCloud = this.drawCloud.bind(this);
  }

  drawCloud(ctx) {
    const img = new Image();
    img.src = "src/images/cloud.png";
    ctx.drawImage(img, this.cloudX, this.cloudY, this.cloudWidth, this.cloudHeight)
    this.move(this.dir);
  }

  move(dir) {
    if (dir === "left") {
      this.cloudX -= 2;
    } else if (dir === "right") {
      this.cloudX += 2;
    }
  }

}