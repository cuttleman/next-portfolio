import styled from "styled-components";

const Container = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 30px;
  box-shadow: 0 3px 6px rgba(150, 150, 150, 0.4);
`;

const Nav = styled.nav`
  margin-right: 15px;
  ul {
    display: flex;
    li {
      margin: 0 10px;
      a {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
          sans-serif;
        font-weight: 500;
      }
    }
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Learn</a>
          </li>
          <li>
            <a href="#">Work</a>
          </li>
        </ul>
      </Nav>
    </Container>
  );
};

export default Header;
