import { Common } from "myTypes";
import Head from "next/head";

const Helmet: React.FC<Common.HelmetProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content="my portfolio" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Helmet;
