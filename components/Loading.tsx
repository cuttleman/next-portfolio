import React, { useEffect, useRef } from "react";
import CurveLine from "../canvasItems/CurveLine";

export default function Loading() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvas: HTMLCanvasElement | null;
  let ctx: CanvasRenderingContext2D | null | undefined;
  let animationId: number;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas?.getContext("2d");

    const curve = new CurveLine();

    function animate() {
      animationId = window.requestAnimationFrame(animate);
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        curve.update();
      }
    }

    function init() {
      if (ctx) {
        curve.init(50, ctx);
      }
    }

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.backgroundColor = "green";
      init();
      animate();
    }

    return () => {
      console.log("close");
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", zIndex: 999 }} />;
}
