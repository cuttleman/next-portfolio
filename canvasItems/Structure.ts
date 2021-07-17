import User from "./User";

export default class Structure {
  private name: string;
  private x: number; // target position x axis
  private y: number; // target position y axis
  private isContact: boolean;
  private contactColor: string;
  private size: number; // structure size
  private ctx: CanvasRenderingContext2D | null;
  private user: User;

  constructor(
    name: string,
    x: number,
    y: number,
    isContact: boolean,
    ctx: CanvasRenderingContext2D | null,
    user: User
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.isContact = isContact;
    this.contactColor = "transparent";
    this.size = 50;
    this.user = user;
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

      switch (this.name) {
        case "work":
          this.x = this.ctx.canvas.width * 0.9;
          this.y = this.ctx.canvas.height * 0.3;
          break;
        case "lecture":
          this.x = this.ctx.canvas.width * 0.1;
          this.y = this.ctx.canvas.height * 0.4;
          break;
        case "about":
          this.x = this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height * 0.9;
          break;
        case "fromWork":
          this.x = this.ctx.canvas.width + this.ctx.canvas.width * 0.1;
          this.y = this.ctx.canvas.height * 0.3;
          break;
        case "fromLecture":
          this.x = -this.ctx.canvas.width + this.ctx.canvas.width * 0.9;
          this.y = this.ctx.canvas.height * 0.4;
          break;
        case "fromAbout":
          this.x = this.ctx.canvas.width * 0.5;
          this.y = this.ctx.canvas.height + this.ctx.canvas.height * 0.1;
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
    } else {
      this.isContact = false;
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
