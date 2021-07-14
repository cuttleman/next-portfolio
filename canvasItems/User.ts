export default class User {
  public x: number; // x axis position
  public y: number; // y axis position
  private size: number; // target size;
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
    this.update = this.update.bind(this);
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
      if (this.x - this.size < 0) {
        this.x = this.size;
      } else if (this.x + this.size > this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.size;
      } else if (this.y - this.size < 0) {
        this.y = this.size;
      } else if (this.y + this.size > this.ctx.canvas.height) {
        this.y = this.ctx.canvas.height - this.size;
      }
      this.draw();
    }
  }
}
