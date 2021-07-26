import User from "./User";

export default class Structure {
  private _x: number; // target position x axis
  private _y: number; // target position y axis
  private _structureImg: any;
  private _imgId: string;
  private _isContact: boolean;
  private _size: number; // structure size
  private _type: string;
  private _ctx: CanvasRenderingContext2D | null;
  private _user: User | null;

  constructor() {
    this._type = "";
    this._x = 0;
    this._y = 0;
    this._ctx = null;
    this._isContact = false;
    this._size = 0;
    this._user = null;
    this._imgId = "";
    this._structureImg = null;
  }

  private draw() {
    if (this._ctx && this._structureImg) {
      this._ctx.beginPath();
      if (this._ctx.canvas.width < this._ctx.canvas.height) {
        this._size = this._ctx.canvas.width / 11;
        this._ctx.drawImage(
          this._structureImg,
          0,
          0,
          500,
          500,
          this._x - this._size,
          this._y - this._size,
          this._ctx.canvas.width / 5.5,
          this._ctx.canvas.width / 5.5
        );
      } else {
        this._size = this._ctx.canvas.height / 11;
        this._ctx.drawImage(
          this._structureImg,
          0,
          0,
          500,
          500,
          this._x - this._size,
          this._y - this._size,
          this._ctx.canvas.height / 5.5,
          this._ctx.canvas.height / 5.5
        );
      }
      this._ctx.closePath();
    }
  }

  public update(x: number, y: number) {
    if (this._ctx) {
      const newX = Math.ceil(x);
      const newY = Math.ceil(y);
      const oldX = Math.ceil(this._x);
      const oldY = Math.ceil(this._y);
      if (this._type !== "fromLecture") {
        if (oldX < newX) {
          this._x += 1;
        } else if (oldX > newX) {
          this._x -= 1;
        } else if (oldY < newY) {
          this._y += 1;
        } else if (oldY > newY) {
          this._y -= 1;
        }
      } else {
        if (oldX < newX) {
          this._x += 1;
        } else if (oldX > newX) {
          this._x -= 1;
        } else if (oldY < newY) {
          this._y += 1;
        } else if (oldY > newY) {
          this._y -= 1;
        }
      }

      // this._y = y;
      this.draw();
      this.getDistance();
    }
  }

  private getDistance() {
    if (this._user) {
      const targetDistance = Math.sqrt(
        Math.pow(this._user.getState().x - this._x, 2) +
          Math.pow(this._user.getState().y - this._y, 2)
      );
      if (targetDistance <= this._user.getState().size + this._size) {
        this._isContact = true;
        this._structureImg = document.getElementById(`${this._imgId}Focus`);
      } else {
        this._isContact = false;
        this._structureImg = document.getElementById(`${this._imgId}`);
      }
    }
  }

  public insertPage() {
    if (this._isContact) {
      if (this._ctx && this._user) {
        const XDISTANCE = this._ctx.canvas.width;
        const YDISTANCE = this._ctx.canvas.height;
        switch (this._type) {
          case "toWork":
            this._user.moveViewport(-XDISTANCE, 0, "work_background");
            break;
          case "toLecture":
            this._user.moveViewport(XDISTANCE, 0, "lecture_background");
            break;
          case "toAbout":
            this._user.moveViewport(0, -YDISTANCE, "about_background");
            break;
          case "fromWork":
            this._user.moveViewport(XDISTANCE, 0, "home_background");
            break;
          case "fromLecture":
            this._user.moveViewport(-XDISTANCE, 0, "home_background");
            break;
          case "fromAbout":
            this._user.moveViewport(0, YDISTANCE, "home_background");
            break;
          default:
            break;
        }
      }
    }
  }

  public init(
    x: number,
    y: number,
    imgId: string,
    type: string,
    ctx: CanvasRenderingContext2D | null,
    user: User
  ) {
    this._x = x;
    this._y = y;
    this._imgId = imgId;
    this._type = type;
    this._ctx = ctx;
    this._user = user;
  }

  public moreInfo() {
    if (this._isContact) {
      console.log(this);
    }
  }
}
