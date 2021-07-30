import { useEffect, useRef } from "react";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import MoveStructure from "../canvasItems/MoveStructure";
import Bubble from "../canvasItems/Bubble";
import { keydownHandler, randomGenerator, resizeHandler } from "../utils";
import LinkStructure from "../canvasItems/LinkStructure";

export default function Canvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Items
  const user: User = new User();
  // Items(into)
  const toWork: Structure = new Structure();
  const toLecture: Structure = new Structure();
  const toAbout: Structure = new Structure();
  // Items(back home)
  const fromWork: Structure = new Structure();
  const fromLecture: Structure = new Structure();
  const fromAbout: Structure = new Structure();
  // Items(work link)
  const fish1: MoveStructure = new MoveStructure();
  const fish2: MoveStructure = new MoveStructure();
  const fish3: MoveStructure = new MoveStructure();
  const fish4: MoveStructure = new MoveStructure();
  const fish5: MoveStructure = new MoveStructure();
  // Items(lecture link)
  const lectureFrame1: LinkStructure = new LinkStructure();
  const lectureFrame2: LinkStructure = new LinkStructure();
  const lectureFrame3: LinkStructure = new LinkStructure();

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
      lectureFrame1.update(
        -screenXMax + (screenXMax / 5) * 1,
        (screenYMax / 3) * 1
      );
      lectureFrame2.update(
        -screenXMax + (screenXMax / 5) * 2,
        (screenYMax / 3) * 1
      );
      lectureFrame3.update(
        -screenXMax + (screenXMax / 5) * 3,
        (screenYMax / 3) * 1
      );
      fish1.update();
      fish2.update();
      fish3.update();
      fish4.update();
      fish5.update();
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
        "relationship",
        "leftFish1",
        "rightFish1",
        500,
        4,
        ctx,
        user,
        viewport,
        "https://jeokdanghi-relationship.com/"
      );
      fish2.init(
        "bangguseok",
        "leftFish2",
        "rightFish2",
        500,
        4,
        ctx,
        user,
        viewport,
        "https://bangguseokmuseum2.com/"
      );
      fish3.init(
        "wordusink",
        "leftFish3",
        "rightFish3",
        500,
        4,
        ctx,
        user,
        viewport,
        "https://play.google.com/store/apps/details?id=com.mestus.wordusink"
      );
      fish4.init(
        "cuttlefishss",
        "leftFish4",
        "rightFish4",
        500,
        4,
        ctx,
        user,
        viewport,
        "https://mestuss.github.io/cuttlefishss/"
      );
      fish5.init(
        "catchMind",
        "leftFish5",
        "rightFish5",
        500,
        4,
        ctx,
        user,
        viewport,
        "https://dogsimsul-1020.herokuapp.com/"
      );
      lectureFrame1.init(
        -screenXMax + (screenXMax / 5) * 1,
        (screenYMax / 3) * 1,
        "toHome",
        "kakaoUi",
        ctx,
        user,
        "https://nomad-learn.github.io/clone-kakaotalk/friends.html"
      );
      lectureFrame2.init(
        -screenXMax + (screenXMax / 5) * 2,
        (screenYMax / 3) * 1,
        "toHome",
        "wetube",
        ctx,
        user,
        "https://clonewetube.herokuapp.com/"
      );
      lectureFrame3.init(
        -screenXMax + (screenXMax / 5) * 3,
        (screenYMax / 3) * 1,
        "toHome",
        "popcornTime",
        ctx,
        user,
        "https://determined-hypatia-502a08.netlify.app/"
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
        fish3,
        fish4,
        fish5,
        lectureFrame1,
        lectureFrame2,
        lectureFrame3,
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
          fish3,
          fish4,
          fish5,
          lectureFrame1,
          lectureFrame2,
          lectureFrame3,
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
