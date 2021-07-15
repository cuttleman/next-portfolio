import Structure from "./canvasItems/Structure";
import User from "./canvasItems/User";

export const positionManipulator = (target: User) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    target.directionControl(e);
  });
};

export const insertTarget = (targets: Structure[]) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const { code } = e;
    if (code === "Enter") {
      targets.forEach((target) => target.insertPage());
    }
  });
};
