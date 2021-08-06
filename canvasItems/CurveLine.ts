interface Coordinate {
  x: number;
  y: number;
}

export default class CurveLine {
  private _gY: number;
  private _start: Coordinate;
  private _end: Coordinate;
  private _p1: Coordinate;
  private _p2: Coordinate;
  private _p3: Coordinate;
  private _dy: number;
  private _maxY: number;
  private _ctx: CanvasRenderingContext2D | null;

  constructor() {
    this._gY = 0;
    this._start = { x: 0, y: 0 };
    this._end = { x: 0, y: 0 };
    this._p1 = { x: 0, y: 0 };
    this._p2 = { x: 0, y: 0 };
    this._p3 = { x: 0, y: 0 };
    this._dy = 1;
    this._maxY = 0;
    this._ctx = null;
    this._movePoint = this._movePoint.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
  }

  private _movePoint() {
    if (this._ctx) {
      this._start = { x: 0, y: this._gY };
      this._end = { x: this._ctx.canvas.width, y: this._gY };
      this._p1 = { ...this._p1, y: this._gY + this._dy };
      this._p2 = { ...this._p2, y: this._gY + -this._dy };
      this._p3 = { ...this._p3, y: this._gY + this._dy };
    }
  }

  private _draw() {
    if (this._ctx) {
      // start
      this._ctx.beginPath();
      this._ctx.arc(this._start.x, this._start.y, 30, 0, Math.PI * 2);
      this._ctx.fillStyle = "red";
      this._ctx.fill();
      this._ctx.closePath();

      // p1
      this._ctx.beginPath();
      this._ctx.arc(this._p1.x, this._p1.y, 30, 0, Math.PI * 2);
      this._ctx.fillStyle = "red";
      this._ctx.fill();
      this._ctx.closePath();

      // p2
      this._ctx.beginPath();
      this._ctx.arc(this._p2.x, this._p2.y, 30, 0, Math.PI * 2);
      this._ctx.fillStyle = "red";
      this._ctx.fill();
      this._ctx.closePath();

      // p3
      this._ctx.beginPath();
      this._ctx.arc(this._p3.x, this._p3.y, 30, 0, Math.PI * 2);
      this._ctx.fillStyle = "red";
      this._ctx.fill();
      this._ctx.closePath();

      // end
      this._ctx.beginPath();
      this._ctx.arc(this._end.x, this._end.y, 30, 0, Math.PI * 2);
      this._ctx.fillStyle = "red";
      this._ctx.fill();
      this._ctx.closePath();
    }
  }

  public update() {
    if (this._p1.y - 15 < this._gY - this._maxY) {
      this._dy += 1;
    } else if (this._p1.y + 15 > this._gY + this._maxY) {
      this._dy += -1;
    }
    this._movePoint();
    this._draw();
  }

  public init(maxY: number, ctx: CanvasRenderingContext2D | null) {
    this._ctx = ctx;
    this._maxY = maxY;
    if (ctx) {
      this._gY = ctx.canvas.height / 2;
      this._p1 = { x: ctx.canvas.width / 3, y: 0 };
      this._p2 = { x: ctx.canvas.width / 2, y: 0 };
      this._p3 = { x: (ctx.canvas.width / 3) * 2, y: 0 };
    }
  }
}
