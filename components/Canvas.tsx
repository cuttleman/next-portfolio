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

  // Items
  const user: User = new User(
    windowSize.width / 2,
    windowSize.height / 2,
    30,
    ctx
  );
  const structure1: Structure = new Structure(
    "sample1",
    600,
    300,
    false,
    ctx,
    user
  );
  const structure2: Structure = new Structure(
    "sample2",
    200,
    400,
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
    structure1.update();
    structure2.update();
    user.update();

    // behavior method
    structure1.getDistance();
    structure2.getDistance();
  };

  useEffect(() => {
    animate();
    positionManipulator(user);
    insertTarget([structure1, structure2]);
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
