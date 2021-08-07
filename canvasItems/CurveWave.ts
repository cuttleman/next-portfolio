interface Coordinate {
  x: number;
  y: number;
}

export default class CurveLine {
  private _gY: number;
  private _start: Coordinate;
  private _middle: Coordinate;
  private _end: Coordinate;
  private _p1: Coordinate;
  private _p2: Coordinate;
  private _dy: number;
  private _color: string;
  private _pullUp: number;
  private _initDY: number;
  private _maxY: number;
  private _opacity: number;
  private _ctx: CanvasRenderingContext2D | null;
  private _setLoading?: () => void;

  constructor() {
    this._gY = 0;
    this._start = { x: 0, y: 0 };
    this._middle = { x: 0, y: 0 };
    this._end = { x: 0, y: 0 };
    this._p1 = { x: 0, y: 0 };
    this._p2 = { x: 0, y: 0 };
    this._dy = 0;
    this._initDY = 0;
    this._maxY = 0;
    this._opacity = 1;
    this._color = "";
    this._pullUp = -3;
    this._ctx = null;
    this._reachedTop = this._reachedTop.bind(this);
    this._movePoint = this._movePoint.bind(this);
    this._drawLine = this._drawLine.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
  }

  private _movePoint() {
    if (this._ctx) {
      this._start.y += this._pullUp;
      this._end.y += this._pullUp;
      this._p1.y += this._dy + this._pullUp;
      this._p2.y -= this._dy - this._pullUp;
    }
  }

  private _drawLine() {
    if (this._ctx) {
      this._ctx.canvas.style.opacity = `${this._opacity}`;
      this._ctx.beginPath();
      this._ctx.moveTo(this._start.x, this._start.y);
      this._ctx.bezierCurveTo(
        this._p1.x,
        this._p1.y,
        this._p2.x,
        this._p2.y,
        this._end.x,
        this._end.y
      );
      this._ctx.lineTo(this._ctx.canvas.width, this._ctx.canvas.height);
      this._ctx.lineTo(0, this._ctx.canvas.height);
      this._ctx.fillStyle = this._color;
      this._ctx.fill();
      this._ctx.closePath();
    }
  }

  private _reachedTop() {
    if (this._gY < -50) {
      this._pullUp = 0;
      if (this._opacity > 0) {
        this._opacity -= 0.03;
      } else {
        if (this._setLoading) {
          this._setLoading();
        }
      }
    }
  }

  public update() {
    if (this._p1.y - this._pullUp - 5 < this._gY - this._maxY) {
      this._dy = +this._initDY;
    } else if (this._p1.y - this._pullUp + 5 > this._gY + this._maxY) {
      this._dy = -this._initDY;
    }
    this._gY += this._pullUp;

    this._reachedTop();
    this._movePoint();
    this._drawLine();
  }

  public init(
    initGY: number,
    maxY: number,
    initDy: number,
    color: string,
    ctx: CanvasRenderingContext2D | null,
    setLoading?: () => void
  ) {
    this._ctx = ctx;
    this._maxY = maxY;
    this._initDY = initDy;
    this._gY = initGY;
    this._dy = initDy;
    this._color = color;
    this._setLoading = setLoading;
    if (ctx) {
      this._start = { x: 0, y: this._gY };
      this._middle = { x: ctx.canvas.width / 2, y: this._gY };
      this._end = { x: ctx.canvas.width, y: this._gY };
      this._p1 = { x: (ctx.canvas.width / 3) * 1, y: this._gY };
      this._p2 = { x: (ctx.canvas.width / 3) * 2, y: this._gY };
    }
  }
}
