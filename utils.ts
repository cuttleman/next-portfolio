import Structure from "./canvasItems/Structure";
import User from "./canvasItems/User";

export const positionManipulator = (target: User) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const { code } = e;
    if (code === "ArrowDown") {
      target.y += 30;
    } else if (code === "ArrowUp") {
      target.y -= 30;
    } else if (code === "ArrowRight") {
      target.x += 30;
    } else if (code === "ArrowLeft") {
      target.x -= 30;
    }
  });
};

export const insertTarget = (target: Structure) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const { code } = e;
    if (code === "Enter") {
      if (target.isContact) {
        window.open(target.url);
        console.log(`${target.url} enter!`);
        // insert page!
      }
    }
  });
};

export const getDistance = (
  ownX: number,
  ownY: number,
  targetX: number,
  targetY: number
) => {
  return Math.sqrt(Math.pow(ownX - targetX, 2) + Math.pow(ownY - targetY, 2));
};
