import Canvas from "../components/Canvas";
import Helmet from "../components/Helmet";
import Informations from "../components/Informations";
import PreLoad from "../components/PreLoad";

export default function Home() {
  return (
    <>
      <Helmet title="Home" />
      <Canvas />
      <PreLoad />
      <Informations />
    </>
  );
}
