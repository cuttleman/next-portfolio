import Info from "./Info";
import User from "./User";

export default class Structure extends Info {
  protected _x: number; // target position x axis
  protected _y: number; // target position y axis
  protected _imgId: string;
  protected _type: string;
  protected _ctx: CanvasRenderingContext2D | null;
  protected _structureImg: any;
  protected _isContact: boolean;
  protected _size: number; // structure size: ;
  private _user: User | null;

  constructor() {
    super();
    this._type = "";
    this._x = 0;
    this._y = 0;
    this._ctx = null;
    this._isContact = false;
    this._size = 0;
    this._user = null;
    this._imgId = "";
    this._structureImg = null;
    this._getDistance = this._getDistance.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.insertPage = this.insertPage.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.init = this.init.bind(this);
  }

  protected _getDistance() {
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
        this._hideInfo();
      }
    }
  }

  protected _draw() {
    if (this._ctx && this._structureImg) {
      this._ctx.beginPath();
      let viewSize = 0;
      if (this._ctx.canvas.width < this._ctx.canvas.height) {
        this._size = this._ctx.canvas.width / 11;
        viewSize = this._ctx.canvas.width / 5.5;
      } else {
        this._size = this._ctx.canvas.height / 11;
        viewSize = this._ctx.canvas.height / 5.5;
      }
      this._ctx.drawImage(
        this._structureImg,
        0,
        0,
        500,
        500,
        this._x - this._size,
        this._y - this._size,
        viewSize,
        viewSize
      );
      this._ctx.closePath();
    }
  }

  public update(x: number, y: number) {
    if (this._ctx) {
      this._x = x;
      this._y = y;
      this._draw();
      this._getDistance();
      this._updateInfo();
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

  public moreInfo() {
    if (this._isContact) {
      if (this._isVisible) {
        this._hideInfo();
      } else {
        this._showInfo();
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
    this._initInfo(user, ctx);
  }
}
