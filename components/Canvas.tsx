import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import User from "../canvasItems/User";
import Structure from "../canvasItems/Structure";
import useWindowSize from "../hooks/useWindowSize";
import { insertTarget, positionManipulator } from "../utils";

const CanvasS = styled.canvas`
  background: url("/background.png") center/cover no-repeat fixed;
`;

export default function Canvas(props: any) {
  const windowSize = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [spriteImg, setSpriteImg] = useState<HTMLImageElement | null>(null);

  // Items
  const user: User = new User(
    spriteImg,
    windowSize.width / 2,
    windowSize.height / 2,
    ctx
  );
  // into
  const work: Structure = new Structure(
    "work",
    windowSize.width * 0.9, // initial position
    windowSize.height * 0.3, // initial position
    false,
    ctx,
    user
  );
  const lecture: Structure = new Structure(
    "lecture",
    windowSize.width * 0.1, // initial position
    windowSize.height * 0.4, // initial position
    false,
    ctx,
    user
  );
  const about: Structure = new Structure(
    "about",
    windowSize.width * 0.5, // initial position
    windowSize.height * 0.9, // initial position
    false,
    ctx,
    user
  );
  // back home
  const fromWork: Structure = new Structure(
    "fromWork",
    windowSize.width + windowSize.width * 0.1, // initial position
    windowSize.height * 0.3, // initial position
    false,
    ctx,
    user
  );
  const fromLecture: Structure = new Structure(
    "fromLecture",
    -windowSize.width + windowSize.width * 0.9, // initial position
    windowSize.height * 0.4, // initial position
    false,
    ctx,
    user
  );
  const fromAbout: Structure = new Structure(
    "fromAbout",
    windowSize.width * 0.5, // initial position
    windowSize.height + windowSize.height * 0.1, // initial position
    false,
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
    const myImg = new Image();
    myImg.src = "/left_me.png";
    setSpriteImg(myImg);
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
      setCtx(canvas.getContext("2d"));
    }
  }, [windowSize]);

  return <CanvasS ref={canvasRef} {...props} />;
}
