import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CurveWave from "../canvasItems/CurveWave";

const CanvasS = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

export default function Loading({ setLoading }: { setLoading: any }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvas: HTMLCanvasElement | null;
  let ctx: CanvasRenderingContext2D | null | undefined;
  let animationId: number;
  const BUBBLE = "#EEEEEE";
  const DARKSEA = "#002366";
  const LIGHTSEA = "#0F52BA";
  const SAND = "#E0C097";
  const WETSAND = "#B85C38";

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas?.getContext("2d");

    const wetSand = new CurveWave();
    const bubble = new CurveWave();
    const darkSea = new CurveWave();
    const lightSea = new CurveWave();

    function animate() {
      animationId = window.requestAnimationFrame(animate);
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.fillStyle = SAND;
        ctx.fill();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();

        wetSand.update();
        bubble.update();
        darkSea.update();
        lightSea.update();

        ctx.beginPath();
        ctx.font = "30px Nanum Gothic";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
          "Loading...",
          ctx.canvas.width / 2 - 60,
          ctx.canvas.height / 2,
          120
        );
        ctx.closePath();
      }
    }

    function init() {
      if (ctx) {
        wetSand.init(ctx.canvas.height / 1.5 - 15, 70, 1, WETSAND, ctx);
        bubble.init(ctx.canvas.height / 1.5 - 8, 80, 3, BUBBLE, ctx);
        darkSea.init(ctx.canvas.height / 1.5 - 3, 130, 3, DARKSEA, ctx);
        lightSea.init(
          ctx.canvas.height / 1.5,
          90,
          2,
          LIGHTSEA,
          ctx,
          setLoading
        );
      }
    }

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      init();
      animate();
    }

    window.addEventListener("resize", () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      init();
    });

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        init();
      });
    };
  }, []);

  return <CanvasS ref={canvasRef} />;
}
