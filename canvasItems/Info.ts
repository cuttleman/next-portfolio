import User from "./User";

export default class Info {
  private _wInfo: number;
  private _hInfo: number;
  private _ctxInfo: CanvasRenderingContext2D | null;
  private _userInfo: User | null;
  private _textInfoEl: HTMLElement | null;
  private _textPointX: number;
  private _textPointY: number;
  private _justify: "flex-start" | "flex-end";
  private _align: "flex-start" | "flex-end";
  protected _isVisible: boolean;

  constructor() {
    this._wInfo = 0;
    this._hInfo = 0;
    this._ctxInfo = null;
    this._userInfo = null;
    this._textInfoEl = null;
    this._textPointX = 0;
    this._textPointY = 0;
    this._justify = "flex-start";
    this._align = "flex-start";
    this._isVisible = false;
    this._drawInfo = this._drawInfo.bind(this);
    this._textPosition = this._textPosition.bind(this);
    this._updateInfo = this._updateInfo.bind(this);
    this._showInfo = this._showInfo.bind(this);
    this._hideInfo = this._hideInfo.bind(this);
    this._initInfo = this._initInfo.bind(this);
  }

  private _drawInfo() {
    if (this._textInfoEl) {
      if (this._isVisible) {
        this._textInfoEl.style.display = "flex";
        this._textInfoEl.style.top = `${this._textPointY}px`;
        this._textInfoEl.style.left = `${this._textPointX}px`;
        this._textInfoEl.style.width = `${Math.abs(this._wInfo)}px`;
        this._textInfoEl.style.height = `${Math.abs(this._hInfo)}px`;
        this._textInfoEl.style.justifyContent = `${this._justify}`;
        this._textInfoEl.style.alignItems = `${this._align}`;
      } else {
        this._textInfoEl.style.display = "none";
      }
    }
  }

  private _textPosition() {
    if (this._userInfo && this._ctxInfo) {
      const currentX = this._userInfo.getState().x;
      const currentY =
        this._userInfo.getState().y - this._userInfo.getState().viewport.y;
      const screenXCenter =
        this._userInfo.getState().viewport.x < 0
          ? this._userInfo.getState().viewport.x / 2
          : this._userInfo.getState().viewport.x +
            this._ctxInfo.canvas.width / 2;
      const screenYCenter = this._ctxInfo.canvas.height / 2;
      const boxSize =
        this._ctxInfo.canvas.width > this._ctxInfo.canvas.height
          ? this._ctxInfo.canvas.width / 5
          : this._ctxInfo.canvas.height / 2.5;
      const gapFromUser = this._userInfo.getState().size;

      if (currentX > screenXCenter) {
        this._wInfo = -boxSize;
        this._textPointX = currentX - gapFromUser + -boxSize;
        this._justify = "flex-end";
      } else {
        this._wInfo = boxSize;
        this._textPointX = currentX + gapFromUser;
        this._justify = "flex-start";
      }

      if (currentY > screenYCenter) {
        this._hInfo = -boxSize;
        this._textPointY = currentY - boxSize;
        this._align = "flex-end";
      } else {
        this._hInfo = boxSize;
        this._textPointY = currentY;
        this._align = "flex-start";
      }
    }
  }

  protected _updateInfo() {
    this._textPosition();
    this._drawInfo();
  }

  protected _showInfo() {
    this._isVisible = true;
  }

  protected _hideInfo() {
    this._isVisible = false;
  }

  protected _initInfo(
    user: User,
    ctx: CanvasRenderingContext2D | null,
    type: string
  ) {
    this._userInfo = user;
    this._ctxInfo = ctx;
    this._textInfoEl = document.getElementById(`${type}Info`);
  }
}
