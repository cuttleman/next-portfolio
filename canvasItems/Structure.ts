import User from "./User";

export default class Structure {
  protected x: number; // target position x axis
  protected y: number; // target position y axis
  protected structureImg: any;
  protected isContact: boolean;
  protected size: number; // structure size

  constructor(
    protected name: string,
    protected ctx: CanvasRenderingContext2D | null,
    protected user: User
  ) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.isContact = false;
    this.size = 0;
    this.user = user;
    this.structureImg = null;
  }

  protected draw() {
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
    if (this.ctx) {
      switch (this.name) {
        case "toWork":
          this.x = this.ctx.canvas.width * 0.9;
          this.y = this.ctx.canvas.height * 0.3;
          break;
        case "toLecture":
          this.x = this.ctx.canvas.width * 0.1;
          this.y = this.ctx.canvas.height * 0.6;
          break;
        case "toAbout":
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
    this.getDistance();
  }

  protected getDistance() {
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
        this.structureImg = document.getElementById(`${this.name}Focus`);
      } else {
        this.structureImg = document.getElementById(`toHomeFocus`);
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
        this.structureImg = document.getElementById(`toHome`);
      }
    }
  }

  public insertPage() {
    if (this.isContact) {
      if (this.ctx) {
        const XDISTANCE = this.ctx.canvas.width;
        const YDISTANCE = this.ctx.canvas.height;
        switch (this.name) {
          case "toWork":
            this.user.moveViewport(-XDISTANCE, 0);
            this.ctx.canvas.style.background =
              "url(/work_background.png) center/cover no-repeat fixed";
            break;
          case "toLecture":
            this.user.moveViewport(XDISTANCE, 0);
            this.ctx.canvas.style.background =
              "url(/lecture_background.png) center/cover no-repeat fixed";
            break;
          case "toAbout":
            this.user.moveViewport(0, -YDISTANCE);
            this.ctx.canvas.style.background =
              "url(/about_background.png) center/cover no-repeat fixed";
            break;
          case "fromWork":
            this.user.moveViewport(XDISTANCE, 0);
            this.ctx.canvas.style.background =
              "url(/home_background.png) center/cover no-repeat fixed";
            break;
          case "fromLecture":
            this.user.moveViewport(-XDISTANCE, 0);
            this.ctx.canvas.style.background =
              "url(/home_background.png) center/cover no-repeat fixed";
            break;
          case "fromAbout":
            this.user.moveViewport(0, YDISTANCE);
            this.ctx.canvas.style.background =
              "url(/home_background.png) center/cover no-repeat fixed";
            break;
          default:
            break;
        }
      }
    }
  }
}
