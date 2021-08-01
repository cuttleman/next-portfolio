import Canvas from "../components/Canvas";
import Helmet from "../components/Helmet";
import Informations from "../components/Informations";
import KeyBoard from "../components/KeyBoard";
import PreLoad from "../components/PreLoad";

export default function Home() {
  return (
    <>
      <Helmet title="Home" />
      <KeyBoard />
      <Canvas />
      <PreLoad />
      <Informations />
    </>
  );
}
