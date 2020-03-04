
export default class Orange {
  constructor(canvasWidth, canvasHeight) {
    const canvas = document.getElementById("canvas-background");
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight; 
    
    this.orangeWidth = 35;
    this.orangeHeight = 30;
    
    this.orangeX = Math.floor(Math.random() * Math.floor(750)); 
    this.orangeY = -15;
    this.now = 0;
   
    this.drawOrange = this.drawOrange.bind(this);
    this.clearOrange = this.clearOrange.bind(this);
  }

  drawOrange(ctx) {
    const img = new Image();  
    img.src = "src/images/orange.png";
    ctx.drawImage(img, this.orangeX, this.orangeY, this.orangeWidth, this.orangeHeight)
    this.fall();
  }

  fall() {
    this.orangeY += 5;
  }

  clearOrange() {
    debugger
    this.ctx.clearRect(this.orangeX, this.orangeY, (this.orangeX + this.orangeWidth), (this.orangeY + this.orangeHeight));
  }

}