import styled from "styled-components";

const Container = styled.div`
  & > div {
    display: none;
    position: absolute;
    & > p {
      padding: 15px;
      color: black;
      max-width: 100%;
      max-height: 100%;
      overflow-y: auto;
      word-break: break-all;
      background-color: #ffffff;
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
      <div id="fromWorkInfo">
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
      <div id="toLectureInfo">
        <p>Lorem ipsum dolor s</p>
      </div>
      <div id="fromLectureInfo">
        <p>Lorem ipsum dolor s</p>
      </div>
      <div id="wetubeInfo">
        <p>Lorem ipsum dolor s</p>
      </div>
      <div id="popcornTimeInfo">
        <p>Lorem ipsum dolor s</p>
      </div>
      <div id="aboutInfo">
        <p>
          안녕하세요. <br />
          웹개발에 입문한지 2년차가
          <br /> 되어가는 이준오입니다
          <br /> <br /> 자바스크립트를 주력언어로 사용합니다
          <br /> <br /> Canvas에 관심이 생겨
          <br /> 유튜브 Interactive Developer님 영상과
          <br /> Cris Courses 웹사이트 강의로 공부
          <br /> 하고 있습니다
          <br /> <br /> 개인적인 공부는 Nomad Coders 강의와
          <br /> 구글링을 통해서 하고 있습니다
          <br /> <br /> 앞으로 공부하고 싶은 기술은
          <br /> GSAP, three.js, nest.js 이고,
          <br /> <br /> 주력언어를 강화시키기 위해 C++ 를 학습할
          <br />
          예정입니다
          <br /> <br /> 관심 분야는
          <br /> 교육관련 앱, 웹 개발
          <br /> 서비스 앱, 웹 개발
          <br /> 입니다
        </p>
      </div>
    </Container>
  );
}
