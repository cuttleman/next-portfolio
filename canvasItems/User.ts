export default class User {
  private myImg: any;
  private x: number; // x axis position
  private y: number; // y axis position
  private size: number; // target size;
  private viewport: { x: number; y: number }; // screen visibled user
  private imgIndex: number;
  private tickPerFrame: number;
  private tickCount: number;
  private ctx: CanvasRenderingContext2D | null;

  constructor(
    myImg: any,
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D | null
  ) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.viewport = { x: 0, y: 0 };
    this.imgIndex = 0;
    this.tickPerFrame = 8;
    this.tickCount = 0;
    this.myImg = myImg;
    this.update = this.update.bind(this);
    this.directionControl = this.directionControl.bind(this);
    this.getState = this.getState.bind(this);
    this.moveViewport = this.moveViewport.bind(this);
  }

  private draw() {
    if (this.ctx && this.myImg) {
      this.size = this.ctx.canvas.height / 20;
      this.ctx.beginPath();
      // Area guide
      // this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // this.ctx.strokeStyle = "#000000";
      // this.ctx.stroke();
      this.ctx.drawImage(
        this.myImg,
        this.imgIndex,
        0,
        300,
        300,
        this.x - this.size * 1.3,
        this.y - this.size * 1.3,
        this.ctx.canvas.height / 8,
        this.ctx.canvas.height / 8
      );
    }

    // Sprite speed
    if (this.tickCount > this.tickPerFrame) {
      this.tickCount = 0;
      if (this.imgIndex >= 800) {
        this.imgIndex = 0;
      } else {
        this.imgIndex += 300;
      }
    }
    this.tickCount++;
  }

  public update() {
    if (this.ctx) {
      if (this.x - this.size < 0 + this.viewport.x) {
        this.x = this.size + this.viewport.x;
      } else if (this.x + this.size > this.ctx.canvas.width + this.viewport.x) {
        this.x = this.ctx.canvas.width + this.viewport.x - this.size;
      } else if (this.y - this.size < 0 + this.viewport.y) {
        this.y = this.size + this.viewport.y;
      } else if (
        this.y + this.size >
        this.ctx.canvas.height + this.viewport.y
      ) {
        this.y = this.ctx.canvas.height + this.viewport.y - this.size;
      }
      this.draw();
    }
  }

  public directionControl(keyEvent: KeyboardEvent) {
    const { code } = keyEvent;
    switch (code) {
      case "ArrowDown":
        this.y += 30;
        break;
      case "ArrowUp":
        this.y -= 30;
        break;
      case "ArrowRight":
        this.x += 30;
        this.myImg = document.getElementById("myImg_right");
        break;
      case "ArrowLeft":
        this.x -= 30;
        this.myImg = document.getElementById("myImg_left");
        break;
      default:
        break;
    }
  }

  public getState() {
    return { x: this.x, y: this.y, size: this.size, viewport: this.viewport };
  }

  public moveViewport(x: number, y: number) {
    if (this.ctx) {
      this.ctx.translate(x, y);
      this.viewport.x += -x;
      this.viewport.y += -y;
    }
  }
}
