import { Common } from "myTypes";
import Head from "next/head";

const Helmet: React.FC<Common.HelmetProps> = ({ title }) => (
  <Head>
    <link
      href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <title>{title} | Under the Sea</title>
    <meta name="description" content="my portfolio" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Helmet;
