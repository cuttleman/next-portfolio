import styled from "styled-components";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";
import { Common } from "myTypes";

const RootContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

const Layout: React.FC<Common.LayoutProps> = ({ children }) => {
  return (
    <RootContainer>
      <GlobalStyle />
      <Header />
      {children}
    </RootContainer>
  );
};

export default Layout;
