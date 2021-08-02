import User from "./User";
import Structure from "./Structure";

export default class Rock extends Structure {
  private _dx: number;
  private _dy: number;
  private _link?: string;

  constructor() {
    super();
    this._dx = 0;
    this._dy = 3;
    this._link = "";
    this._vibration = this._vibration.bind(this);
    this._getDistance = this._getDistance.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
  }

  private _vibration() {
    if (this._dx >= 0) {
      this._dx = -6;
    } else {
      this._dx = 6;
    }
  }

  protected _getDistance() {
    if (this._user && this._ctx) {
      const targetDistance = Math.sqrt(
        Math.pow(this._user.getState().x - this._ctx.canvas.width * 0.25, 2) +
          Math.pow(this._user.getState().y - this._ctx.canvas.height * 2, 2)
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
      this._ctx.drawImage(
        this._structureImg,
        0,
        0,
        2000,
        1000,
        this._x,
        this._y,
        this._ctx.canvas.width,
        this._ctx.canvas.width / 2
      );
      this._ctx.closePath();
    }
  }

  public update() {
    if (this._ctx && this._user) {
      this._size = this._ctx.canvas.height / 2;
      if (this._user.getState().viewport.y > 0) {
        // is trigger for 'mountain' showing
        this._vibration();
        if (
          this._y >
          this._ctx.canvas.height +
            this._ctx.canvas.height -
            this._ctx.canvas.width / 2
        ) {
          this._y -= this._dy;
          this._x += this._dx;
        }
        this._draw();
        this._getDistance();
        this._updateInfo();
      } else {
        this._y = this._ctx.canvas.height * 2;
      }
    }
  }

  public insertPage() {
    if (this._isContact) {
      if (this._link) {
        window.open(this._link);
      }
    }
  }

  public init(
    x: number,
    y: number,
    imgId: string,
    type: string,
    ctx: CanvasRenderingContext2D | null,
    user: User,
    link?: string
  ) {
    super.init(x, y, imgId, type, ctx, user);
    this._link = link;
    console.log(y);
  }
}
