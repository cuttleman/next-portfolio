import { CanvasState } from "myTypes";
import { randomGenerator } from "../utils";
import Info from "./Info";
import User from "./User";

export default class MoveStructure extends Info {
  private _img: any;
  private _leftImgId: string;
  private _rightImgId: string;
  private _tickCount: number;
  private _tickPerFrame: number;
  private _frameSize: number;
  private _frameDivision: number;
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
    super();
    this._type = "";
    this._x = 0;
    this._y = 0;
    this._dx = -2;
    this._dy = -0.5;
    this._size = 0;
    this._isContact = false;
    this._img = null;
    this._leftImgId = "";
    this._rightImgId = "";
    this._imgIndex = 0;
    this._tickCount = 0;
    this._tickPerFrame = 7;
    this._frameSize = 0;
    this._frameDivision = 0;
    this._ctx = null;
    this._link = "";
    this._user = null;
    this._viewport = { x: 0, y: 0 };
    this._reachedEdge = this._reachedEdge.bind(this);
    this._getRandomXY = this._getRandomXY.bind(this);
    this._getDistance = this._getDistance.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
    this.insertPage = this.insertPage.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.init = this.init.bind(this);
  }

  private _reachedEdge() {
    if (this._ctx) {
      const { randomX, randomY } = this._getRandomXY();
      if (
        this._x - (this._size + 10) <
        (this._viewport.x <= 0 ? this._ctx.canvas.width : this._viewport.x)
      ) {
        this._dx = Math.abs(randomX);
      } else if (
        this._x + (this._size + 10) >
        (this._viewport.x <= 0 ? this._ctx.canvas.width : this._viewport.x) * 2
      ) {
        this._dx = -Math.abs(randomX);
      } else if (this._y - this._size < 0) {
        this._dy = Math.abs(randomY);
      } else if (this._y + this._size > this._ctx.canvas.height) {
        this._dy = -Math.abs(randomY);
      }
    }
  }

  private _getRandomXY() {
    const rangeX = [1.5, -1.5, 2, -2, 3, -3];
    const rangeY = [0.5, -0.5, 1, -1];
    const randomX = rangeX[Math.floor(Math.random() * 6)];
    const randomY = rangeY[Math.floor(Math.random() * 4)];
    return { randomX, randomY };
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
        this._hideInfo();
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
        this._link ? (this._isContact ? this._frameSize : 0) : 0,
        this._frameSize,
        this._frameSize,
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
      if (this._imgIndex >= this._frameSize * (this._frameDivision - 1)) {
        this._imgIndex = 0;
      } else {
        this._imgIndex += this._frameSize;
      }
    }
    this._tickCount++;
  }

  public update() {
    this._x += this._dx;
    this._y += this._dy;

    if (this._dx > 0) {
      this._img = document.getElementById(this._rightImgId);
    } else {
      this._img = document.getElementById(this._leftImgId);
    }
    this._draw();
    this._getDistance();
    this._reachedEdge();
    this._updateInfo();
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
      const { randomX, randomY } = this._getRandomXY();
      this._dx = this._dx === 0 ? randomX : 0;
      this._dy = this._dy === 0 ? randomY : 0;
      this._showInfo();

      const conditionForFree = setInterval(() => {
        if (this._dx === 0 && !this._isContact) {
          this._dx = randomX;
          this._dy = randomY;
          clearInterval(conditionForFree);
        } else if (this._dx !== 0) {
          clearInterval(conditionForFree);
        }
      }, 3000);
    }
  }

  public init(
    type: string,
    leftImgId: string,
    rightImgId: string,
    frameSize: number,
    frameDivision: number,
    ctx: CanvasRenderingContext2D | null,
    user: User,
    viewport: CanvasState.GetViewport,
    link: string
  ) {
    if (ctx) {
      this._x = randomGenerator(ctx.canvas.width, ctx.canvas.width * 2);
      this._y = randomGenerator(0, ctx.canvas.height);
    }
    const { randomX, randomY } = this._getRandomXY();
    this._dx = randomX;
    this._dy = randomY;
    this._type = type;
    this._leftImgId = leftImgId;
    this._rightImgId = rightImgId;
    this._frameSize = frameSize;
    this._frameDivision = frameDivision;
    this._ctx = ctx;
    this._user = user;
    this._link = link;
    this._viewport = viewport;
    this._initInfo(user, ctx, type);
  }
}
