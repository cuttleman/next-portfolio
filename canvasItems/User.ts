import { CanvasState } from "myTypes";

export default class User {
  private _x: number;
  private _y: number;
  private _myImg: any;
  private _size: number; // target size;
  private _viewport: { x: number; y: number }; // screen visibled user
  private _imgIndex: number;
  private _tickPerFrame: number;
  private _tickCount: number;
  private _ctx: CanvasRenderingContext2D | null;

  constructor() {
    this._x = 0;
    this._y = 0;
    this._myImg = null;
    this._size = 0;
    this._ctx = null;
    this._viewport = { x: 0, y: 0 };
    this._imgIndex = 0;
    this._tickPerFrame = 8;
    this._tickCount = 0;
    this._reachedEnd = this._reachedEnd.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.directionControl = this.directionControl.bind(this);
    this.getState = this.getState.bind(this);
    this.moveViewport = this.moveViewport.bind(this);
    this.init = this.init.bind(this);
  }

  private _reachedEnd() {
    if (this._ctx) {
      if (this._x - this._size < 0 + this._viewport.x) {
        this._x = this._size + this._viewport.x;
      } else if (
        this._x + this._size >
        this._ctx.canvas.width + this._viewport.x
      ) {
        this._x = this._ctx.canvas.width + this._viewport.x - this._size;
      } else if (this._y - this._size < 0 + this._viewport.y) {
        this._y = this._size + this._viewport.y;
      } else if (
        this._y + this._size >
        this._ctx.canvas.height + this._viewport.y
      ) {
        this._y = this._ctx.canvas.height + this._viewport.y - this._size;
      }
    }
  }

  private _draw() {
    if (this._ctx && this._myImg) {
      this._size = this._ctx.canvas.height / 20;
      this._ctx.beginPath();
      this._ctx.drawImage(
        this._myImg,
        this._imgIndex,
        0,
        300,
        300,
        this._x - this._size * 1.3,
        this._y - this._size * 1.3,
        this._ctx.canvas.height / 8,
        this._ctx.canvas.height / 8
      );
      this._ctx.closePath();
    }

    // Sprite speed
    if (this._tickCount > this._tickPerFrame) {
      this._tickCount = 0;
      if (this._imgIndex >= 800) {
        this._imgIndex = 0;
      } else {
        this._imgIndex += 300;
      }
    }
    this._tickCount++;
  }

  public update() {
    if (this._ctx) {
      this._reachedEnd();
      this._draw();
    }
  }

  public directionControl(keyEvent: KeyboardEvent) {
    const { keyCode: keycode } = keyEvent;
    switch (keycode) {
      case 40: // up
        this._y += 30;
        break;
      case 38: // down
        this._y -= 30;
        break;
      case 39: // right
        this._x += 30;
        this._myImg = document.getElementById("myImgRight");
        break;
      case 37: // left
        this._x -= 30;
        this._myImg = document.getElementById("myImgLeft");
        break;
      default:
        break;
    }
  }

  public moveViewport(x: number, y: number, bg: string) {
    if (this._ctx) {
      this._ctx.translate(x, y);
      this._viewport.x += -x;
      this._viewport.y += -y;
      this._ctx.canvas.style.background = `url(/${bg}.png) center/cover no-repeat fixed`;
    }
  }

  public getState() {
    return {
      x: this._x,
      y: this._y,
      size: this._size,
      viewport: this._viewport,
    };
  }

  public init(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D | null,
    viewport: CanvasState.GetViewport
  ) {
    this._x = x;
    this._y = y;
    this._ctx = ctx;
    this._myImg = document.getElementById("myImgLeft");
    this._viewport = viewport;
    if (ctx) {
      ctx.translate(-viewport.x, -viewport.y);
    }
  }
}
