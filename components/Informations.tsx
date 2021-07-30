import styled from "styled-components";

const Container = styled.div`
  & > div {
    display: none;
    position: absolute;
    & > p {
      padding: 15px;
      color: white;
      max-width: 100%;
      max-height: 100%;
      overflow-y: auto;
      word-break: break-all;
      background-color: #ffffff70;
      border-radius: 5px;
    }
  }
`;

export default function Informations() {
  return (
    <Container>
      <div id="toWorkInfo">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor maxime
          quos nulla voluptate! Hic eveniet fugiat assumenda quis. Voluptatibus,
          quas unde labore sint adipisci provident qui vel eligendi
          necessitatibus aperiam.
        </p>
      </div>
      <div id="toAboutInfo">
        <p>Lorem ipsum dolor s</p>
      </div>
    </Container>
  );
}
