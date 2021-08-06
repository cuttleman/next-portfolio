import Canvas from "../components/Canvas";
import Informations from "../components/Informations";
import KeyBoard from "../components/KeyBoard";
import PreLoad from "../components/PreLoad";

export default function Home() {
  return (
    <>
      <KeyBoard />
      <Canvas />
      <PreLoad />
      <Informations />
    </>
  );
}
