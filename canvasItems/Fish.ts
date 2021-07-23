import { randomGenerator } from "../utils";
import User from "./User";

export default class Fish {
  private _img: any;
  private _tickCount: number;
  private _tickPerFrame: number;
  private _imgIndex: number;
  private _isContact: boolean;
  private _size: number;
  private _x: number;
  private _y: number;
  private _dx: number;
  private _dy: number;
  constructor(
    private _type: string,
    private _ctx: CanvasRenderingContext2D | null,
    private _user: User,
    private _link?: string
  ) {
    this._type = _type;
    this._x = 0;
    this._y = 0;
    this._dx = -1;
    this._dy = -0.5;
    this._size = 0;
    this._isContact = false;
    this._img = null;
    this._imgIndex = 0;
    this._tickCount = 0;
    this._tickPerFrame = 7;
    this._ctx = _ctx;
    this._link = _link;
  }

  private _draw() {
    if (this._ctx) {
      this._size = this._ctx.canvas.height / 20;
      this._ctx.beginPath();
      this._ctx.drawImage(
        this._img,
        this._imgIndex,
        this._link ? (this._isContact ? 500 : 0) : 0,
        500,
        500,
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
        this._imgIndex += 500;
      }
    }
    this._tickCount++;
  }

  public update() {
    this._x += this._dx;
    this._y += this._dy;

    this._img = document.getElementById(
      this._type === "fish1"
        ? this._dx > 0
          ? "rightFish1"
          : "leftFish1"
        : this._dx > 0
        ? "rightFish2"
        : "leftFish2"
    );
    this._draw();
    this._getDistance();
    this._reachedEdge();
  }

  private _reachedEdge() {
    if (this._ctx) {
      if (this._x - this._size < this._ctx.canvas.width) {
        this._dx = 1;
      } else if (this._x + this._size > this._ctx.canvas.width * 2) {
        this._dx = -1;
      } else if (this._y - this._size < 0) {
        this._dy = 0.5;
      } else if (this._y + this._size > this._ctx.canvas.height) {
        this._dy = -0.5;
      }
    }
  }

  private _getDistance() {
    const targetDistance = Math.sqrt(
      Math.pow(this._user.getState().x - this._x, 2) +
        Math.pow(this._user.getState().y - this._y, 2)
    );
    if (targetDistance <= this._user.getState().size + this._size) {
      this._isContact = true;
    } else {
      this._isContact = false;
    }
  }

  public insertPage() {
    if (this._isContact) {
      if (this._ctx && this._link) {
        window.open(this._link);
      }
    }
  }

  public init() {
    if (this._ctx) {
      this._x = randomGenerator(
        this._ctx.canvas.width,
        this._ctx.canvas.width * 2
      );
      this._y = randomGenerator(0, this._ctx.canvas.height);
      this._img = document.getElementById(`leftFish${this._type.slice(-1)}`);
    }
  }
}
