import { CanvasState } from "myTypes";
import MoveStructure from "./canvasItems/MoveStructure";
import Structure from "./canvasItems/Structure";
import User from "./canvasItems/User";

export const keydownHandler = (
  user: User,
  targets: (MoveStructure | Structure)[]
) => {
  return function (e: KeyboardEvent) {
    const { code } = e;
    user.directionControl(e);
    if (code === "Enter") {
      targets.forEach((target) => target.insertPage());
    } else if (code === "Space") {
      targets.forEach((target) => target.moreInfo());
    }
  };
};

export const resizeHandler = (
  canvas: HTMLCanvasElement | null,
  viewport: CanvasState.GetViewport,
  initFunc: () => void
) => {
  return function (e: UIEvent) {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (viewport.x > 0) {
        viewport.x = window.innerWidth;
      } else if (viewport.x < 0) {
        viewport.x = -window.innerWidth;
      } else if (viewport.x === 0) {
        viewport.x = 0;
      }

      if (viewport.y > 0) {
        viewport.y = window.innerHeight;
      } else if (viewport.y === 0) {
        viewport.y = 0;
      }

      initFunc();
    }
  };
};

export const randomGenerator = (min: number, max: number) => {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.floor(min)) + Math.floor(min)
  );
};
