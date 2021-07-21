import { useEffect, useRef, useState } from "react";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import useWindowSize from "../hooks/useWindowSize";
import { insertTarget, positionManipulator } from "../utils";

export default function Canvas(props: any) {
  const windowSize = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [spriteImg, setSpriteImg] = useState<{
    myImg?: HTMLElement | null;
    workImg?: HTMLElement | null;
    lectureImg?: HTMLElement | null;
    aboutImg?: HTMLElement | null;
    homeImg?: HTMLElement | null;
  }>({});

  // Items
  const user: User = new User(
    spriteImg?.myImg,
    windowSize.width / 2,
    windowSize.height / 2,
    ctx
  );
  // into
  const work: Structure = new Structure("work", spriteImg?.workImg, ctx, user);
  const lecture: Structure = new Structure(
    "lecture",
    spriteImg?.lectureImg,
    ctx,
    user
  );
  const about: Structure = new Structure(
    "about",
    spriteImg?.aboutImg,
    ctx,
    user
  );
  // back home
  const fromWork: Structure = new Structure(
    "fromWork",
    spriteImg?.homeImg,
    ctx,
    user
  );
  const fromLecture: Structure = new Structure(
    "fromLecture",
    spriteImg?.homeImg,
    ctx,
    user
  );
  const fromAbout: Structure = new Structure(
    "fromAbout",
    spriteImg?.homeImg,
    ctx,
    user
  );

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
    work.update();
    lecture.update();
    about.update();
    fromWork.update();
    fromLecture.update();
    fromAbout.update();
    user.update();

    // behavior method
    work.getDistance();
    lecture.getDistance();
    about.getDistance();
    fromWork.getDistance();
    fromLecture.getDistance();
    fromAbout.getDistance();
  };

  useEffect(() => {
    const myImg = document.getElementById("myImg_left");
    const workImg = document.getElementById("work");
    const lectureImg = document.getElementById("lecture");
    const aboutImg = document.getElementById("about");
    const homeImg = document.getElementById("home");
    setSpriteImg({ myImg, workImg, lectureImg, aboutImg, homeImg });
  }, []);

  useEffect(() => {
    animate();
    positionManipulator(user);
    insertTarget([work, lecture, about, fromWork, fromLecture, fromAbout]);
    return () => window.cancelAnimationFrame(animateId);
  }, [ctx]);

  useEffect(() => {
    if (canvas) {
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
      canvas.style.background =
        "url(/background.png) center/cover no-repeat fixed";
      setCtx(canvas.getContext("2d"));
    }
  }, [windowSize]);

  return <canvas ref={canvasRef} {...props} />;
}
