import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  };
  a {
    text-decoration-line: none;
    color: rgb(0,0,0);
  }
`;

export default GlobalStyle;
