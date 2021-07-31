import User from "./User";

export default class Rock {
  private _x: number;
  private _y: number;
  private _dx: number;
  private _dy: number;
  private _ctx: CanvasRenderingContext2D | null;
  private _user: User | null;

  constructor() {
    this._x = 0;
    this._y = 0;
    this._dx = 0;
    this._dy = 3;
    this._ctx = null;
    this._user = null;
    this._vibration = this._vibration.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
  }

  private _vibration() {
    if (this._dx <= 0) {
      this._dx = 6;
    } else {
      this._dx = -6;
    }
  }

  private _draw() {
    if (this._ctx) {
      const img = new Image();
      img.src = "/me.png";
      this._ctx.beginPath();
      this._ctx.fillRect(
        this._x,
        this._y,
        this._ctx.canvas.width / 4,
        this._ctx.canvas.height / 1.3
      );
      this._ctx.fill();
      // this._ctx.drawImage(
      //   img,
      //   this._x,
      //   this._y,
      //   this._ctx.canvas.width / 4,
      //   this._ctx.canvas.height / 2
      // );
      this._ctx.closePath();
    }
  }

  public update() {
    if (this._ctx && this._user) {
      if (this._user.getState().viewport.y > 0) {
        // is trigger for 'rock' showing
        this._vibration();
        if (
          this._y >
          this._user?.getState().viewport.y + this._ctx.canvas.height / 4
        ) {
          this._y -= this._dy;
          this._x += this._dx;
        }
        this._draw();
      } else {
        this._y = this._ctx.canvas.height * 2;
      }
    }
  }

  public init(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D | null,
    user: User
  ) {
    this._x = x;
    this._y = y;
    this._ctx = ctx;
    this._user = user;
  }
}
