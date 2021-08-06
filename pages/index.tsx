import { useState } from "react";
import Canvas from "../components/Canvas";
import Informations from "../components/Informations";
import KeyBoard from "../components/KeyBoard";
import Loading from "../components/Loading";
import PreLoad from "../components/PreLoad";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <>
      <Loading />
      {/* {loading ? <Loading /> : <Canvas />} */}
      <KeyBoard />
      <PreLoad />
      <Informations />
    </>
  );
}
