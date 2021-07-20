import User from "./User";

export default class Structure {
  private name: string;
  private structureImg: any;
  private x: number; // target position x axis
  private y: number; // target position y axis
  private isContact: boolean;
  private size: number; // structure size
  private ctx: CanvasRenderingContext2D | null;
  private user: User;

  constructor(
    name: string,
    structureImg: any,
    ctx: CanvasRenderingContext2D | null,
    user: User
  ) {
    this.name = name;
    this.structureImg = structureImg;
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.isContact = false;
    this.size = 0;
    this.user = user;
    this.structureImg = null;
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.getDistance = this.getDistance.bind(this);
    this.insertPage = this.insertPage.bind(this);
  }

  private draw() {
    if (this.ctx && this.structureImg) {
      this.ctx.save();
      this.ctx.beginPath();
      if (this.ctx.canvas.width < this.ctx.canvas.height) {
        this.size = this.ctx.canvas.width / 11;
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
    if (this.ctx && this.structureImg) {
      switch (this.name) {
        case "work":
          this.x = this.ctx.canvas.width * 0.9;
          this.y = this.ctx.canvas.height * 0.3;
          break;
        case "lecture":
          this.x = this.ctx.canvas.width * 0.1;
          this.y = this.ctx.canvas.height * 0.6;
          break;
        case "about":
          this.x = this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height * 0.85;
          break;
        case "fromWork":
          this.x = this.ctx.canvas.width + this.ctx.canvas.width * 0.1;
          this.y = this.ctx.canvas.height * 0.3;
          break;
        case "fromLecture":
          this.x = -this.ctx.canvas.width + this.ctx.canvas.width * 0.9;
          this.y = this.ctx.canvas.height * 0.6;
          break;
        case "fromAbout":
          this.x = this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height + this.ctx.canvas.height * 0.15;
          break;
        default:
          break;
      }
    }
    this.draw();
  }

  public getDistance() {
    const targetDistance = Math.sqrt(
      Math.pow(this.user.getState().x - this.x, 2) +
        Math.pow(this.user.getState().y - this.y, 2)
    );
    if (targetDistance <= this.user.getState().size + this.size) {
      this.isContact = true;
      if (
        this.name !== "fromWork" &&
        this.name !== "fromLecture" &&
        this.name !== "fromAbout"
      ) {
        this.structureImg = document.getElementById(`${this.name}_focus`);
      } else {
        this.structureImg = document.getElementById(`home_focus`);
      }
    } else {
      this.isContact = false;
      if (
        this.name !== "fromWork" &&
        this.name !== "fromLecture" &&
        this.name !== "fromAbout"
      ) {
        this.structureImg = document.getElementById(`${this.name}`);
      } else {
        this.structureImg = document.getElementById(`home`);
      }
    }
  }

  public insertPage() {
    if (this.isContact) {
      if (this.ctx) {
        const XDISTANCE = this.ctx.canvas.width;
        const YDISTANCE = this.ctx.canvas.height;
        switch (this.name) {
          case "work":
            this.user.moveViewport(-XDISTANCE, 0);
            break;
          case "lecture":
            this.user.moveViewport(XDISTANCE, 0);
            break;
          case "about":
            this.user.moveViewport(0, -YDISTANCE);
            break;
          case "fromWork":
            this.user.moveViewport(XDISTANCE, 0);
            break;
          case "fromLecture":
            this.user.moveViewport(-XDISTANCE, 0);
            break;
          case "fromAbout":
            this.user.moveViewport(0, YDISTANCE);
            break;
          default:
            break;
        }
        // this.ctx.canvas.style.backgroundImage =
        //   "url(https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg)";
      }
    }
  }
}
