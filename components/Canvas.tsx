import { useEffect, useRef } from "react";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import MoveStructure from "../canvasItems/MoveStructure";
import Bubble from "../canvasItems/Bubble";
import { keydownHandler, randomGenerator, resizeHandler } from "../utils";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  let canvas: HTMLCanvasElement | null;
  let ctx: CanvasRenderingContext2D | null | undefined;
  let bubbles: Bubble[];
  let viewport = { x: 0, y: 0 };
  let screenXMax = 0;
  let screenYMax = 0;

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
      toWork.update(screenXMax * 0.9, screenYMax * 0.3);
      toLecture.update(screenXMax * 0.1, screenYMax * 0.6);
      toAbout.update(screenXMax * 0.5, screenYMax * 0.9);
      fromWork.update(screenXMax + screenXMax * 0.1, screenYMax * 0.3);
      fromLecture.update(-screenXMax + screenXMax * 0.9, screenYMax * 0.6);
      fromAbout.update(screenXMax * 0.5, screenYMax + screenYMax * 0.1);
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
        screenXMax = canvas.width;
      } else {
        screenXMax = viewport.x;
      }

      if (viewport.y === 0) {
        screenYMax = canvas.height;
      } else if (viewport.y > 0) {
        screenYMax = viewport.y;
      }

      user.init(
        viewport.x > 0
          ? screenXMax + screenXMax / 2
          : viewport.x < 0
          ? -screenXMax / 2
          : screenXMax / 2,
        viewport.y <= 0 ? screenYMax / 2 : screenYMax + screenYMax / 2,
        ctx,
        viewport
      );
      toWork.init(
        screenXMax * 0.9,
        screenYMax * 0.3,
        "toWork",
        "toWork",
        ctx,
        user
      );
      toLecture.init(
        screenXMax * 0.1,
        screenYMax * 0.6,
        "toLecture",
        "toLecture",
        ctx,
        user
      );
      toAbout.init(
        screenXMax * 0.5,
        screenYMax * 0.9,
        "toAbout",
        "toAbout",
        ctx,
        user
      );
      fromWork.init(
        screenXMax + screenXMax * 0.1,
        screenYMax * 0.3,
        "toHome",
        "fromWork",
        ctx,
        user
      );
      fromLecture.init(
        -screenXMax + screenXMax * 0.9,
        screenYMax * 0.6,
        "toHome",
        "fromLecture",
        ctx,
        user
      );
      fromAbout.init(
        screenXMax * 0.5,
        screenYMax + screenYMax * 0.1,
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
      for (let i = 0; i < 40; i++) {
        const x = randomGenerator(
          viewport.x,
          viewport.x < 0 ? 0 : viewport.x > 0 ? screenXMax * 2 : screenXMax
        );
        const y = randomGenerator(screenYMax / 1.05, screenYMax / 1.2);
        const dy = randomGenerator(1, 3);
        const initSize = randomGenerator(2, canvas.height / 25);
        bubbles.push(new Bubble(x, y, dy, initSize, ctx, user));
      }
    }
  };

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.background =
        "url(/home_background.png) center/cover no-repeat fixed";
      init();
      animate();
    }

    document.addEventListener(
      "keydown",
      keydownHandler(user, [
        toWork,
        toLecture,
        toAbout,
        fromWork,
        fromLecture,
        fromAbout,
        fish1,
        fish2,
      ])
    );

    window.addEventListener("resize", resizeHandler(canvas, viewport, init));

    return () => {
      window.cancelAnimationFrame(animateId);
      document.removeEventListener(
        "keydown",
        keydownHandler(user, [
          toWork,
          toLecture,
          toAbout,
          fromWork,
          fromLecture,
          fromAbout,
          fish1,
          fish2,
        ])
      );

      window.removeEventListener(
        "resize",
        resizeHandler(canvas, viewport, init)
      );
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}
