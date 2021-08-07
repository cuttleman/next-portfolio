import React from "react";
import Canvas from "../components/Canvas";
import Informations from "../components/Informations";
import KeyBoard from "../components/KeyBoard";
import PreLoad from "../components/PreLoad";

export default function Main() {
  return (
    <>
      <PreLoad />
      <Canvas />
      <KeyBoard />
      <Informations />
    </>
  );
}
