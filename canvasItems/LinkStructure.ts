import Structure from "./Structure";
import User from "./User";

export default class LinkStructure extends Structure {
  private _link?: string;
  private _frameImg: HTMLImageElement | null;

  constructor() {
    super();
    this._link = "";
    this._frameImg = null;
    this._draw = this._draw.bind(this);
    this.insertPage = this.insertPage.bind(this);
    this.init = this.init.bind(this);
  }

  protected _draw() {
    if (this._ctx && this._structureImg && this._frameImg) {
      let viewSize = 0;
      const pattern = this._ctx.createPattern(this._frameImg, "repeat");

      if (this._ctx.canvas.width < this._ctx.canvas.height) {
        this._size = this._ctx.canvas.width / 11;
        viewSize = this._ctx.canvas.width / 5.5;
      } else {
        this._size = this._ctx.canvas.height / 11;
        viewSize = this._ctx.canvas.height / 5.5;
      }

      // triangle ring
      this._ctx.beginPath();
      this._ctx.lineWidth = 5;
      this._ctx.lineJoin = "round";
      this._ctx.moveTo(
        this._x - this._size + viewSize / 2 - viewSize / 15,
        this._y - this._size
      );
      this._ctx.lineTo(
        this._x - this._size + viewSize / 2 + viewSize / 15,
        this._y - this._size
      );
      this._ctx.lineTo(
        this._x - this._size + viewSize / 2,
        this._y - this._size - (Math.sqrt(3) / 2) * ((viewSize / 15) * 2)
      );
      this._ctx.lineTo(
        this._x - this._size + viewSize / 2 - viewSize / 15,
        this._y - this._size
      );
      this._ctx.strokeStyle = "#aaa69d";
      this._ctx.stroke();
      this._ctx.closePath();

      // nail
      this._ctx.beginPath();
      this._ctx.lineWidth = 1;
      this._ctx.arc(
        this._x - this._size + viewSize / 2,
        this._y - this._size - (Math.sqrt(3) / 2) * ((viewSize / 15) * 2),
        viewSize / 20,
        0,
        Math.PI * 2
      );
      this._ctx.fillStyle = "#808e9b";
      this._ctx.strokeStyle = "#000000";
      this._ctx.fill();
      this._ctx.stroke();
      this._ctx.closePath();

      // photo frame
      this._ctx.beginPath();
      this._ctx.lineWidth = this._isContact ? 5 : 2;
      this._ctx.rect(
        this._x - this._size,
        this._y - this._size,
        viewSize,
        viewSize
      );
      this._ctx.fillStyle = pattern || "";
      this._ctx.fill();
      this._ctx.strokeStyle = this._isContact ? "#ffffff" : "#000000";
      this._ctx.stroke();
      this._ctx.closePath();

      // photo
      this._ctx.beginPath();
      this._ctx.lineWidth = 2;
      this._ctx.rect(
        this._x - this._size + 15,
        this._y - this._size + 15,
        viewSize - 30,
        viewSize - 30
      );
      this._ctx.fillStyle = "#000000";
      this._ctx.fill();
      this._ctx.strokeStyle = "#ffffff";
      this._ctx.stroke();
      this._ctx.drawImage(
        this._structureImg,
        this._x - this._size + 15,
        this._y - this._size + 15,
        viewSize - 30,
        viewSize - 30
      );
      this._ctx.closePath();
    }
  }

  public insertPage() {
    if (this._isContact) {
      if (this._link) {
        const params = {
          target: this._type,
          features: "",
        };
        if (this._type === "kakaoUi") {
          params.features = `width=${window.innerWidth / 4}, height=${
            window.innerHeight / 1.2
          }`;
        }
        window.open(this._link, params.target, params.features);
      }
    }
  }

  public init(
    x: number,
    y: number,
    imgId: string,
    type: string,
    ctx: CanvasRenderingContext2D | null,
    user: User,
    link?: string
  ) {
    super.init(x, y, imgId, type, ctx, user);
    this._link = link;

    this._frameImg = new Image();
    this._frameImg.src = "/frame_pattern.png";
  }
}
