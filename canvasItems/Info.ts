import User from "./User";

export default class Info {
  private _xInfo: number;
  private _yInfo: number;
  private _ctxInfo: CanvasRenderingContext2D | null;
  private _userInfo: User | null;
  protected _isVisible: boolean;

  constructor() {
    this._xInfo = 0;
    this._yInfo = 0;
    this._ctxInfo = null;
    this._userInfo = null;
    this._isVisible = false;
    this._drawInfo = this._drawInfo.bind(this);
    this._updateInfo = this._updateInfo.bind(this);
    this._showInfo = this._showInfo.bind(this);
    this._hideInfo = this._hideInfo.bind(this);
    this._initInfo = this._initInfo.bind(this);
  }

  private _drawInfo() {
    // need to position reactive && redesign
    if (this._ctxInfo) {
      this._ctxInfo.beginPath();
      this._ctxInfo.fillStyle = "#ffffff";
      this._ctxInfo.fill();
      this._ctxInfo.fillRect(this._xInfo, this._yInfo, 200, 200);
      this._ctxInfo.closePath();
    }
  }

  protected _updateInfo() {
    if (this._isVisible && this._userInfo) {
      this._xInfo = this._userInfo.getState().x;
      this._yInfo = this._userInfo.getState().y;
      this._drawInfo();
    }
  }

  protected _showInfo() {
    this._isVisible = true;
  }

  protected _hideInfo() {
    this._isVisible = false;
  }

  protected _initInfo(user: User, ctx: CanvasRenderingContext2D | null) {
    this._userInfo = user;
    this._ctxInfo = ctx;
  }
}
