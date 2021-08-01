import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30%;
  height: 20%;
  background-color: #00000090;
  border-top-right-radius: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
  margin: 0 10px;
  & > div {
    cursor: pointer;
    border-radius: 5px;
    padding: 5px;
    border: 2px solid #00000096;
  }
`;

const SpaceEnter = styled.div<{ isPressed: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isPressed ? "#ffffff80" : "#ffffff")};
  text-align: center;
  &:first-child {
    grid-column: 2 / span 2;
    grid-row: 1;
  }
  &:last-child {
    grid-column: 1 / span 3;
    grid-row: 2;
  }
`;

const Arrow = styled.div<{ isPressed: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isPressed ? "#ffffff80" : "#ffffff")};
  text-align: center;
  &:nth-child(1) {
    grid-column: 1;
    grid-row: 2;
  }
  &:nth-child(2) {
    grid-column: 3 / 4;
    grid-row: 2;
  }
  &:nth-child(3) {
    grid-column: 2 / span 1;
    grid-row: 1;
  }
  &:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 2;
  }
`;

export default function KeyBoard() {
  const initValue = {
    space: false,
    enter: false,
    left: false,
    right: false,
    bottom: false,
    top: false,
  };
  const [pressed, setPressed] = useState(initValue);

  useEffect(() => {
    window.addEventListener("keyup", () => {
      setPressed(initValue);
    });
    window.addEventListener("keydown", (e) => {
      const { code } = e;
      switch (code) {
        case "Enter":
          setPressed(() => ({ ...initValue, enter: true }));
          break;
        case "Space":
          setPressed(() => ({ ...initValue, space: true }));
          break;
        case "ArrowLeft":
          setPressed(() => ({ ...initValue, left: true }));
          break;
        case "ArrowRight":
          setPressed(() => ({ ...initValue, right: true }));
          break;
        case "ArrowUp":
          setPressed(() => ({ ...initValue, top: true }));
          break;
        case "ArrowDown":
          setPressed(() => ({ ...initValue, bottom: true }));
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <Container>
      <Content>
        <SpaceEnter isPressed={pressed.enter}>Enter</SpaceEnter>
        <SpaceEnter isPressed={pressed.space}>Space</SpaceEnter>
      </Content>
      <Content>
        <Arrow isPressed={pressed.left}>←</Arrow>
        <Arrow isPressed={pressed.right}>→</Arrow>
        <Arrow isPressed={pressed.top}>↑</Arrow>
        <Arrow isPressed={pressed.bottom}>↓</Arrow>
      </Content>
    </Container>
  );
}
