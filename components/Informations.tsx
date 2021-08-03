import styled from "styled-components";
import Icon from "./Icon";

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

const Spec = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Summary = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  line-height: 1.3;
`;

const GLink = styled.a`
  font-size: 0.8rem;
  font-weight: 700;
  color: #535c68;
  text-decoration-line: underline;
  &:hover {
    color: #7ed6df;
  }
`;

export default function Informations() {
  return (
    <Container>
      <div id="toWorkInfo">
        <p>
          사이드 프로젝트 <br /> / 외주 프로젝트
        </p>
      </div>
      <div id="toAboutInfo">
        <p>어바웃 미</p>
      </div>
      <div id="toLectureInfo">
        <p>강의 결과</p>
      </div>
      <div id="fromWorkInfo">
        <p>메인 화면</p>
      </div>
      <div id="fromLectureInfo">
        <p>메인 화면</p>
      </div>
      <div id="fromAboutInfo">
        <p>메인 화면</p>
      </div>
      <div id="kakaoUiInfo">
        <p>
          <Spec>
            <Icon name="html" />
            <Icon name="css" />
          </Spec>
          <Summary>
            <li>카카오톡 UI 클론코딩으로 HTML과, CSS 사용법을 배움.</li>
            <li>첫 코딩 결과물.</li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-youtube"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="wetubeInfo">
        <p>
          <Spec>
            <Icon name="pug" />
            <Icon name="sass" />
            <Icon name="javascript" />
            <Icon name="nodejs" />
            <Icon name="mongoDB" />
            <Icon name="expressjs" />
            <Icon name="heroku" />
          </Spec>
          <Summary>
            <li>유튜브 클론코딩으로 CRUD를 구현함.</li>
            <li>Blob에 대해 부족함을 느낌.</li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-youtube"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="popcornTimeInfo">
        <p>
          <Spec>
            <Icon name="reactjs" />
            <Icon name="styled-components" />
            <Icon name="netlify" />
          </Spec>
          <Summary>
            <li>팝콘타임 클론코딩으로 SPA 프레임워크 React를 경험해봄.</li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-youtube"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="relationshipInfo">
        <p></p>
      </div>
      <div id="bangguseokInfo">
        <p></p>
      </div>
      <div id="wordusinkInfo">
        <p></p>
      </div>
      <div id="cuttlefishssInfo">
        <p></p>
      </div>
      <div id="catchMindInfo">
        <p></p>
      </div>
      <div id="aboutInfo">
        <p>
          <strong style={{ fontWeight: 900 }}>안녕하세요.</strong>
          <Summary>
            웹개발에 입문한지 2년차가 되어가는 이준오입니다.
            <br />
            자바스크립트를 주력언어로 사용합니다.
            <br />
            <br />
            Canvas에 관심이 생겨 유튜버 Interactive Developer님 영상과 Cris
            Courses 웹사이트 강의로 공부 하고 있습니다.
            <br />
            개인적인 공부는 Nomad Coders 강의와 구글링을 통해서 하고 있습니다
            <br />
            <br />
            앞으로 공부하고 싶은 기술은 GSAP, three.js, nest.js 이고,
            <br />
            학습능력을 강화시키기 위해 C++ 를 공부할 예정입니다.
            <br />
            (solo learn 앱으로 맛보는 중)
            <br />
            <br />
            관심 분야는 교육관련 앱, 웹 개발 및 소셜커머스 앱, 웹 개발 입니다.
          </Summary>
          <GLink href="https://github.com/cuttleman" target="_blank">
            My Github link
          </GLink>
        </p>
      </div>
    </Container>
  );
}
