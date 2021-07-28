import { useEffect, useRef } from "react";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import MoveStructure from "../canvasItems/MoveStructure";
import Bubble from "../canvasItems/Bubble";
import { randomGenerator } from "../utils";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // Items
    const user: User = new User();
    // Items(into)
    const toWork: Structure = new Structure();
    const toLecture: Structure = new Structure();
    const toAbout: Structure = new Structure();
    // Items(link)
    const fish1: MoveStructure = new MoveStructure();
    const fish2: MoveStructure = new MoveStructure();
    // Items(back home)
    const fromWork: Structure = new Structure();
    const fromLecture: Structure = new Structure();
    const fromAbout: Structure = new Structure();

    // Variables
    let animateId: number;
    let bubbles: Bubble[];
    let viewport = { x: 0, y: 0 };
    let screenSizeX = 0;
    let screenSizeY = 0;

    const animate = () => {
      if (ctx) {
        animateId = window.requestAnimationFrame(animate);

        ctx.clearRect(
          viewport.x,
          viewport.y,
          ctx.canvas.width,
          ctx.canvas.height
        );

        // main method
        toWork.update(screenSizeX * 0.9, screenSizeY * 0.3);
        toLecture.update(screenSizeX * 0.1, screenSizeY * 0.6);
        toAbout.update(screenSizeX * 0.5, screenSizeY * 0.9);
        fromWork.update(screenSizeX + screenSizeX * 0.1, screenSizeY * 0.3);
        fromLecture.update(-screenSizeX + screenSizeX * 0.9, screenSizeY * 0.6);
        fromAbout.update(screenSizeX * 0.5, screenSizeY + screenSizeY * 0.1);
        fish1.update();
        fish2.update();
        user.update();
        bubbles.forEach((bubble) => bubble.update());
      }
    };

    const init = () => {
      bubbles = [];
      if (canvas && ctx) {
        if (viewport.x <= 0) {
          screenSizeX = canvas.width;
        } else {
          screenSizeX = viewport.x;
        }

        if (viewport.y === 0) {
          screenSizeY = canvas.height;
        } else if (viewport.y > 0) {
          screenSizeY = viewport.y;
        }
        user.init(canvas.width / 2, canvas.height / 2, ctx, viewport);
        toWork.init(
          screenSizeX * 0.9,
          screenSizeY * 0.3,
          "toWork",
          "toWork",
          ctx,
          user
        );
        toLecture.init(
          screenSizeX * 0.1,
          screenSizeY * 0.6,
          "toLecture",
          "toLecture",
          ctx,
          user
        );
        toAbout.init(
          screenSizeX * 0.5,
          screenSizeY * 0.9,
          "toAbout",
          "toAbout",
          ctx,
          user
        );
        fromWork.init(
          screenSizeX + screenSizeX * 0.1,
          screenSizeY * 0.3,
          "toHome",
          "fromWork",
          ctx,
          user
        );
        fromLecture.init(
          -screenSizeX + screenSizeX * 0.9,
          screenSizeY * 0.6,
          "toHome",
          "fromLecture",
          ctx,
          user
        );
        fromAbout.init(
          screenSizeX * 0.5,
          screenSizeY + screenSizeY * 0.1,
          "toHome",
          "fromAbout",
          ctx,
          user
        );

        fish1.init(
          "fish1",
          ctx,
          user,
          viewport,
          "https://jeokdanghi-relationship.com/"
        );
        fish2.init(
          "fish2",
          ctx,
          user,
          viewport,
          "https://jeokdanghi-relationship.com/"
        );
        console.log(
          viewport.x,
          viewport.x < 0 ? 0 : viewport.x > 0 ? screenSizeX * 2 : screenSizeX
        );
        for (let i = 0; i < 40; i++) {
          const x = randomGenerator(
            viewport.x,
            viewport.x < 0 ? 0 : viewport.x > 0 ? screenSizeX * 2 : screenSizeX
          );
          const y = screenSizeY - 50;
          const dy = randomGenerator(1, 3);
          const size = randomGenerator(2, canvas.height / 25);
          bubbles.push(new Bubble(x, y, dy, size, ctx, user));
        }
      }
    };

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.background =
        "url(/home_background.png) center/cover no-repeat fixed";
      init();
      animate();
    }

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      user.directionControl(e);
      const { code } = e;
      if (code === "Enter") {
        [
          toWork,
          toLecture,
          toAbout,
          fish1,
          fish2,
          fromWork,
          fromLecture,
          fromAbout,
        ].forEach((target) => target.insertPage());
      } else if (code === "Space") {
        [
          toWork,
          toLecture,
          toAbout,
          fish1,
          fish2,
          fromWork,
          fromLecture,
          fromAbout,
        ].forEach((target) => target.moreInfo());
      }
    });

    window.addEventListener("resize", () => {
      if (canvas && ctx) {
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

        init();
      }
    });

    return () => window.cancelAnimationFrame(animateId);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}
