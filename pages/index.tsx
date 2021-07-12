// import styled from "styled-components";
import Layout from "../components/Layout";
import Helmet from "../components/Helmet";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <Helmet title="Home" />
      <Image src={"/me.png"} width={300} height={270} />
    </Layout>
  );
}
