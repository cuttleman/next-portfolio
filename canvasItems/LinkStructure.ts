import Structure from "./Structure";
import User from "./User";

export default class LinkStructure extends Structure {
  constructor(
    name: string,
    ctx: CanvasRenderingContext2D | null,
    user: User,
    private _link: string
  ) {
    super(name, ctx, user);
    this._link = _link;
  }

  protected draw() {
    if (this.ctx && this.structureImg) {
      this.ctx.save();
      this.ctx.beginPath();
      if (this.ctx.canvas.width < this.ctx.canvas.height) {
        this.size = this.ctx.canvas.width / 11;
        this.ctx.fillRect(
          this.x - this.size,
          this.y - this.size,
          this.ctx.canvas.width / 5.5,
          this.ctx.canvas.width / 5.5
        );
        this.ctx.drawImage(
          this.structureImg,
          0,
          0,
          500,
          500,
          this.x - this.size,
          this.y - this.size,
          this.ctx.canvas.width / 5.5,
          this.ctx.canvas.width / 5.5
        );
      } else {
        this.size = this.ctx.canvas.height / 11;
        this.ctx.fillRect(
          this.x - this.size,
          this.y - this.size,
          this.ctx.canvas.height / 5.5,
          this.ctx.canvas.height / 5.5
        );
        this.ctx.drawImage(
          this.structureImg,
          0,
          0,
          500,
          500,
          this.x - this.size,
          this.y - this.size,
          this.ctx.canvas.height / 5.5,
          this.ctx.canvas.height / 5.5
        );
      }
      this.ctx.restore();
    }
  }

  public update() {
    if (this.ctx) {
      switch (this.name) {
        case "work1":
          this.x = this.ctx.canvas.width + this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height * 0.5;
          break;
        case "work2":
          this.x = -this.ctx.canvas.width + this.ctx.canvas.width * 0.9;
          this.y = this.ctx.canvas.height * 0.6;
          break;
        case "lecture1":
          this.x = this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height + this.ctx.canvas.height * 0.15;
          break;
        case "lecture2":
          this.x = this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height + this.ctx.canvas.height * 0.15;
          break;
        default:
          break;
      }
    }
    this.draw();
  }

  protected getDistance() {
    const targetDistance = Math.sqrt(
      Math.pow(this.user.getState().x - this.x, 2) +
        Math.pow(this.user.getState().y - this.y, 2)
    );
    if (targetDistance <= this.user.getState().size + this.size) {
      this.isContact = true;
      this.structureImg = document.getElementById(`toHomeFocus`);
    } else {
      this.isContact = false;
      this.structureImg = document.getElementById(`toHome`);
    }
  }

  public insertPage() {
    if (this.isContact) {
      if (this.ctx) {
        window.open(this._link);
      }
    }
  }
}
