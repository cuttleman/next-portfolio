import { useEffect, useRef, useState } from "react";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import useWindowSize from "../hooks/useWindowSize";
import { insertTarget, positionManipulator, randomGenerator } from "../utils";
import Bubble from "../canvasItems/Bubble";
import MoveStructure from "../canvasItems/MoveStructure";
import { CanvasState } from "myTypes";

export default function Canvas(props: any) {
  const [initViewport, setInitViewport] = useState<CanvasState.GetViewport>({
    x: 0,
    y: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas: HTMLCanvasElement | null = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  const windowSize = useWindowSize();

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

  const animate = () => {
    if (ctx) {
      animateId = window.requestAnimationFrame(animate);

      ctx.clearRect(
        initViewport.x,
        initViewport.y,
        ctx.canvas.width,
        ctx.canvas.height
      );

      // main method
      toWork.update(ctx.canvas.width * 0.9, ctx.canvas.height * 0.3);
      toLecture.update(ctx.canvas.width * 0.1, ctx.canvas.height * 0.6);
      toAbout.update(ctx.canvas.width * 0.5, ctx.canvas.height * 0.85);
      fromWork.update(
        ctx.canvas.width + ctx.canvas.width * 0.1,
        ctx.canvas.height * 0.3
      );
      fromLecture.update(
        -ctx.canvas.width + ctx.canvas.width * 0.9,
        ctx.canvas.height * 0.6
      );
      fromAbout.update(
        ctx.canvas.width * 0.5,
        ctx.canvas.height + ctx.canvas.height * 0.15
      );
      fish1.update();
      fish2.update();
      user.update();
      bubbles.forEach((bubble) => bubble.update());
    }
  };

  const init = () => {
    if (canvas && ctx) {
      bubbles = [];
      user.init(
        canvas.width / 2,
        canvas.height / 2,
        ctx,
        initViewport,
        setInitViewport
      );
      toWork.init(
        ctx.canvas.width * 0.9,
        ctx.canvas.height * 0.3,
        "toWork",
        "toWork",
        ctx,
        user
      );
      toLecture.init(
        ctx.canvas.width * 0.1,
        ctx.canvas.height * 0.6,
        "toLecture",
        "toLecture",
        ctx,
        user
      );
      toAbout.init(
        ctx.canvas.width * 0.5,
        ctx.canvas.height * 0.85,
        "toAbout",
        "toAbout",
        ctx,
        user
      );
      fromWork.init(
        ctx.canvas.width + ctx.canvas.width * 0.1,
        ctx.canvas.height * 0.3,
        "toHome",
        "fromWork",
        ctx,
        user
      );
      fromLecture.init(
        -ctx.canvas.width + ctx.canvas.width * 0.9,
        ctx.canvas.height * 0.6,
        "toHome",
        "fromLecture",
        ctx,
        user
      );
      fromAbout.init(
        ctx.canvas.width * 0.5,
        ctx.canvas.height + ctx.canvas.height * 0.15,
        "toHome",
        "fromAbout",
        ctx,
        user
      );
      fish1.init("fish1", ctx, user, "https://jeokdanghi-relationship.com/");
      fish2.init("fish2", ctx, user, "https://jeokdanghi-relationship.com/");

      for (let i = 0; i < 40; i++) {
        const x = randomGenerator(user.getState().viewport.x, canvas.width);
        const y = canvas.height;
        const dy = randomGenerator(1, 3);
        const size = randomGenerator(2, canvas.height / 25);
        bubbles.push(new Bubble(x, y, dy, size, ctx, user));
      }
    }
  };

  useEffect(() => {
    if (canvas) {
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

      init();
      animate();
      canvas.style.background =
        "url(/home_background.png) center/cover no-repeat fixed";
    }
  }, [canvas]);

  useEffect(() => {
    const { width, height } = windowSize;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;

      init();
    }
  }, [windowSize, canvas]);

  useEffect(() => {
    return () => window.cancelAnimationFrame(animateId);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
}
