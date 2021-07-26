import MoveStructure from "./canvasItems/MoveStructure";
import Structure from "./canvasItems/Structure";
import User from "./canvasItems/User";

export const positionManipulator = (target: User) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    target.directionControl(e);
  });
  return () =>
    window.removeEventListener("keydown", (e: KeyboardEvent) => {
      target.directionControl(e);
    });
};

export const insertTarget = (targets: (Structure | MoveStructure)[]) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const { code } = e;
    if (code === "Enter") {
      targets.forEach((target) => target.insertPage());
    } else if (code === "Space") {
      targets.forEach((target) => target.moreInfo());
    }
  });
};

export const randomGenerator = (min: number, max: number) => {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.floor(min)) + Math.floor(min)
  );
};
