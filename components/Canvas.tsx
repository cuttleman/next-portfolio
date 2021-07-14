import { useEffect, useRef, useState } from "react";
import Structure from "../canvasItems/Structure";
import User from "../canvasItems/User";
import useWindowSize from "../hooks/useWindowSize";
import { getDistance, insertTarget, positionManipulator } from "../utils";

export default function Canvas(props: any) {
  const windowSize = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Items
  const user: User = new User(
    windowSize.width / 2,
    windowSize.height / 2,
    30,
    ctx
  );
  const structure1: Structure = new Structure(
    600,
    300,
    false,
    ctx,
    "https://www.naver.com" // sample
  );
  const structure2: Structure = new Structure(
    200,
    400,
    false,
    ctx,
    "https://www.google.com" //sample
  );

  // Variables
  let animateId: number;

  const animate = () => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width);
    }
    animateId = window.requestAnimationFrame(animate);
    structure1.update();
    structure2.update();
    user.update();
    const distance1 = getDistance(user.x, user.y, structure1.x, structure1.y);
    if (distance1 < 80) {
      structure1.isContact = true;
    } else {
      structure1.isContact = false;
    }
    const distance2 = getDistance(user.x, user.y, structure2.x, structure2.y);
    if (distance2 < 80) {
      structure2.isContact = true;
    } else {
      structure2.isContact = false;
    }
  };

  useEffect(() => {
    animate();
    positionManipulator(user);
    insertTarget(structure1);
    insertTarget(structure2);
    return () => window.cancelAnimationFrame(animateId);
  }, [ctx]);

  useEffect(() => {
    if (canvas) {
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
      setCtx(canvas.getContext("2d"));
    }
  }, [windowSize]);

  return <canvas ref={canvasRef} {...props} />;
}
