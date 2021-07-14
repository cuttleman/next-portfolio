export default class Structure {
  public x: number; // target position x axis
  public y: number; // target position y axis
  public isContact: boolean;
  public url: string; // move to url on enter behavior
  private contactColor: string;
  private ctx: CanvasRenderingContext2D | null;

  constructor(
    x: number,
    y: number,
    isContact: boolean,
    ctx: CanvasRenderingContext2D | null,
    url: string
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.isContact = isContact;
    this.contactColor = "transparent";
    this.url = url;
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
  }

  private draw() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
      this.ctx.fillStyle = "green";
      this.ctx.fill();
      this.ctx.strokeStyle = this.contactColor;
      this.ctx.stroke();
      this.ctx.lineWidth = 5;
    }
  }

  public update() {
    if (this.ctx) {
      if (this.isContact) {
        this.contactColor = "red";
      } else {
        this.contactColor = "transparent";
      }
      this.draw();
    }
  }
}
