import { useEffect, useRef, useState } from "react";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import useWindowSize from "../hooks/useWindowSize";
import { insertTarget, positionManipulator, randomGenerator } from "../utils";
import Bubble from "../canvasItems/Bubble";
import Fish from "../canvasItems/Fish";

export default function Canvas(props: any) {
  const windowSize = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Items
  const user: User = new User(ctx);
  // Items(into)
  const toWork: Structure = new Structure("toWork", ctx, user);
  const toLecture: Structure = new Structure("toLecture", ctx, user);
  const toAbout: Structure = new Structure("toAbout", ctx, user);
  // Items(link)
  const fish1: Fish = new Fish(
    "fish1",
    ctx,
    user,
    "https://jeokdanghi-relationship.com/"
  );
  const fish2: Fish = new Fish("fish2", ctx, user);
  // Items(back home)
  const fromWork: Structure = new Structure("fromWork", ctx, user);
  const fromLecture: Structure = new Structure("fromLecture", ctx, user);
  const fromAbout: Structure = new Structure("fromAbout", ctx, user);
  // Items(background)
  const bubbles: Bubble[] = [];

  // Variables
  let animateId: number;

  const animate = () => {
    if (ctx) {
      ctx.clearRect(
        user.getState().viewport.x,
        user.getState().viewport.y,
        ctx.canvas.width,
        ctx.canvas.height
      );
    }
    animateId = window.requestAnimationFrame(animate);

    // main method
    toWork.update();
    toLecture.update();
    toAbout.update();
    fromWork.update();
    fromLecture.update();
    fromAbout.update();
    fish1.update();
    fish2.update();
    user.update();
    bubbles.forEach((bubble) => bubble.update());
  };

  useEffect(() => {
    user.init();
    fish1.init();
    fish2.init();
    positionManipulator(user);
    insertTarget([
      toWork,
      toLecture,
      toAbout,
      fromWork,
      fromLecture,
      fromAbout,
      fish1,
      fish2,
    ]);
    if (ctx) {
      ctx.canvas.style.background =
        "url(/home_background.png) center/cover no-repeat fixed";

      for (let i = 0; i < 40; i++) {
        const x = randomGenerator(user.getState().viewport.x, ctx.canvas.width);
        const y = ctx.canvas.height;
        const dy = randomGenerator(1, 3);
        const size = randomGenerator(2, 40);
        bubbles.push(new Bubble(x, y, dy, size, ctx, user));
      }
    }
    animate();
    // return () => window.cancelAnimationFrame(animateId);
  }, [ctx]);

  useEffect(() => {
    if (canvas) {
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
      setCtx(canvas.getContext("2d"));
    }
  }, [windowSize, canvas]);

  return <canvas ref={canvasRef} {...props} />;
}
