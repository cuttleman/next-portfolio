import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #00000090;
  border-top-left-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 3;
`;

const Content = styled.div`
  margin: 3px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Key = styled.div<{ isPressed: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  border: 3px solid ${(props) => (props.isPressed ? "white" : "gray")};
  background-color: transparent;
  color: ${(props) => (props.isPressed ? "white" : "gray")};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  color: gray;
  margin-right: 5px;
  &::after {
    content: " : ";
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
        <Description>???????????? / ???????????????</Description>
        <Key isPressed={pressed.enter}>En</Key>
      </Content>
      <Content>
        <Description>???????????? / ???????????????</Description>
        <Key isPressed={pressed.space}>Sp</Key>
      </Content>
      <Content>
        <Description>???????????? ??????</Description>
        <Key isPressed={pressed.left}>L</Key>
      </Content>
      <Content>
        <Description>??????????????? ??????</Description>
        <Key isPressed={pressed.right}>R</Key>
      </Content>
      <Content>
        <Description>???????????? ??????</Description>
        <Key isPressed={pressed.top}>U</Key>
      </Content>
      <Content>
        <Description>??????????????? ??????</Description>
        <Key isPressed={pressed.bottom}>D</Key>
      </Content>
    </Container>
  );
}
