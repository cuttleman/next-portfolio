import React, { useState } from "react";
import Loading from "../components/Loading";
import dynamic from "next/dynamic";

const DynamicMain = dynamic(() => import("./Main"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  const handleSetLoading = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading setLoading={handleSetLoading} />}
      <DynamicMain />
    </>
  );
}
