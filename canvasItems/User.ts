export default class User {
  private x: number; // x axis position
  private y: number; // y axis position
  private size: number; // target size;
  private viewport: { x: number; y: number }; // screen visibled user
  private ctx: CanvasRenderingContext2D | null;

  constructor(
    x: number,
    y: number,
    size: number,
    ctx: CanvasRenderingContext2D | null
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.viewport = { x: 0, y: 0 };
    this.update = this.update.bind(this);
    this.directionControl = this.directionControl.bind(this);
  }

  private draw() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fillStyle = "#000000";
      this.ctx.fill();
    }
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
        break;
      case "ArrowLeft":
        this.x -= 30;
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
