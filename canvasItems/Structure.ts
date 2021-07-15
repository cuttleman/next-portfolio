import User from "./User";

export default class Structure {
  private x: number; // target position x axis
  private y: number; // target position y axis
  private isContact: boolean;
  private url: string; // move to url on enter behavior
  private contactColor: string;
  private size: number; // structure size
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
    this.size = 50;
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.insertPage = this.insertPage.bind(this);
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

  public getDistance(target: User) {
    const targetDistance = Math.sqrt(
      Math.pow(target.x - this.x, 2) + Math.pow(target.y - this.y, 2)
    );
    if (targetDistance <= target.size + this.size) {
      this.isContact = true;
    } else {
      this.isContact = false;
    }
  }

  public insertPage() {
    if (this.isContact) {
      window.open(this.url);
      console.log(`Insert: ${this.url} !!`);
    }
  }
}
