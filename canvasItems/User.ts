export default class User {
  private _x: number;
  private _y: number;
  private _myImg: any;
  private _size: number; // target size;
  private _viewport: { x: number; y: number }; // screen visibled user
  private _imgIndex: number;
  private _tickPerFrame: number;
  private _tickCount: number;

  constructor(private _ctx: CanvasRenderingContext2D | null) {
    this._x = 0;
    this._y = 0;
    this._myImg = null;
    this._size = 0;
    this._ctx = _ctx;
    this._viewport = { x: 0, y: 0 };
    this._imgIndex = 0;
    this._tickPerFrame = 8;
    this._tickCount = 0;
  }

  private _draw() {
    if (this._ctx && this._myImg) {
      this._size = this._ctx.canvas.height / 20;
      this._ctx.beginPath();
      // Area guide
      // this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // this.ctx.strokeStyle = "#000000";
      // this.ctx.stroke();
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
      case 27: // escape -> reload
        window.location.reload();
        break;
      default:
        break;
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

  public moveViewport(x: number, y: number) {
    if (this._ctx) {
      this._ctx.translate(x, y);
      this._viewport.x += -x;
      this._viewport.y += -y;
    }
  }

  public init() {
    if (this._ctx) {
      this._x = this._ctx.canvas.width / 2;
      this._y = this._ctx.canvas.height / 2;
      this._myImg = document.getElementById("myImgLeft");
    }
  }
}
