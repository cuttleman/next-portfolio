import { CanvasState } from "myTypes";
import { randomGenerator } from "../utils";
import User from "./User";

export default class MoveStructure {
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
  private _type: string;
  private _ctx: CanvasRenderingContext2D | null;
  private _user: User | null;
  private _link: string;
  private _viewport: { x: number; y: number }; // screen visibled user

  constructor() {
    this._type = "";
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
    this._ctx = null;
    this._link = "";
    this._user = null;
    this._viewport = { x: 0, y: 0 };
    this._reachedEdge = this._reachedEdge.bind(this);
    this._getDistance = this._getDistance.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.insertPage = this.insertPage.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.init = this.init.bind(this);
  }

  private _reachedEdge() {
    if (this._ctx) {
      if (
        this._x - this._size <
        (this._viewport.x <= 0 ? this._ctx.canvas.width : this._viewport.x)
      ) {
        this._dx = 1;
      } else if (
        this._x + this._size >
        (this._viewport.x <= 0 ? this._ctx.canvas.width : this._viewport.x) * 2
      ) {
        this._dx = -1;
      } else if (this._y - this._size < 0) {
        this._dy = 0.5;
      } else if (this._y + this._size > this._ctx.canvas.height) {
        this._dy = -0.5;
      }
    }
  }

  private _getDistance() {
    if (this._user) {
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

  public insertPage() {
    if (this._isContact) {
      if (this._ctx && this._link) {
        window.open(this._link);
      }
    }
  }

  public moreInfo() {
    if (this._isContact) {
      console.log(this);
    }
  }

  public init(
    type: string,
    ctx: CanvasRenderingContext2D | null,
    user: User,
    viewport: CanvasState.GetViewport,
    link: string
  ) {
    if (ctx) {
      this._x = randomGenerator(ctx.canvas.width, ctx.canvas.width * 2);
      this._y = randomGenerator(0, ctx.canvas.height);
    }
    this._img = document.getElementById(`leftFish${this._type.slice(-1)}`);
    this._type = type;
    this._ctx = ctx;
    this._user = user;
    this._link = link;
    this._viewport = viewport;
  }
}
