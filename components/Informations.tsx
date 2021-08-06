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

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const Spec = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Summary = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  line-height: 1.3;
  strong {
    font-weight: 900;
  }
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
            <Icon name="ghPage" />
          </Spec>
          <Summary>
            <li>BEM 기준으로 HTML을 작성함.</li>
            <li>카카오톡 UI을 클론코딩함.</li>
            <li>첫 코딩 결과물로 내 프로그래밍 인생에 Hello World임.</li>
            <li>이 프로젝트에서 HTML, CSS의 사용법을 익힘.</li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-kakaotalk"
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
            <Icon name="webpack" />
            <Icon name="nodejs" />
            <Icon name="gcs" />
            <Icon name="mongoDB" />
            <Icon name="express" />
            <Icon name="heroku" />
          </Spec>
          <Summary>
            <li>Node + Express로 서버 구성.</li>
            <li>비디오 업로드, 삭제, 수정, 읽기로 CRUD 구현.</li>
            <li>
              MongoDB를 DB로 사용하고 사진, 비디오는 Google Cloud Storage를
              사용함.
            </li>
            <li>
              AWS S3 스토리지를 사용하다가 알게모르게 지갑에 구멍이
              생겨버림.(AWS의 무서움을 느끼게 되었다는..)
            </li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-youtube"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="nomflixInfo">
        <p>
          <Spec>
            <Icon name="reactjs" />
            <Icon name="styledComponents" />
            <Icon name="netlify" />
          </Spec>
          <Summary>
            <li>React로 만든 프로젝트.</li>
            <li>TMDB api로 데이터를 받아와서 뿌려줌.</li>
            <li>리액트에서 데이터를 다루는 방식을 배움.</li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-nomflix"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="popcornTimeInfo">
        <p>
          <Spec>
            <Icon name="rn" />
            <Icon name="styledComponents" />
            <Icon name="expo" />
            <Icon name="netlify" />
          </Spec>
          <Summary>
            <li>TMDB api를 사용함.</li>
            <li>스크린 컴포넌트들은 Container-presenter 패턴으로 작성함.</li>
            <li>Expo platform 으로 ios-android-web에서 동작하게 만듬.</li>
          </Summary>
          <GLink
            href="https://github.com/nomad-learn/clone-popcorntime"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="relationshipInfo">
        <p>
          <Title>관태기</Title>
          <Spec>
            <Icon name="pug" />
            <Icon name="sass" />
            <Icon name="javascript" />
            <Icon name="gulp" />
            <Icon name="netlify" />
          </Spec>
          <Summary>
            <li>나의 첫 외주 프로젝트.</li>
            <li>받은 디자인을 토대로 UI를 만듬.</li>
            <li>구글 애널리틱스로 트래픽 추적함.</li>
            <li>비용관리의 어려움으로 국내 호스팅업체 닷홈을 이용함.</li>
            <li>20.06 ~ 20.07 51만 트래픽을 달성함.(아주 만족했음)</li>
            <li>처음으로 도메인을 닮.</li>
          </Summary>
        </p>
      </div>
      <div id="bangguseokInfo">
        <p>
          <Title>방구석</Title>
          <Spec>
            <Icon name="pug" />
            <Icon name="sass" />
            <Icon name="javascript" />
            <Icon name="gulp" />
            <Icon name="firebase" />
          </Spec>
          <Summary>
            <li>관태기웹 흥행으로 같은 업체에서 다시 외주를 받음.</li>
            <li>
              같은 프레임으로 만든거라서 어렵진 않았지만 이미지 요소가 많아서
              반응형으로 만드는데 힘들었음.
            </li>
            <li>Firebase 서비스 이용.(hosting, firestore DB)</li>
            <li>흥행 대실패😥</li>
          </Summary>
        </p>
      </div>
      <div id="wordusinkInfo">
        <p>
          <Title>단어징어</Title>
          <Spec>
            <Icon name="rn" />
            <Icon name="typescript" />
            <Icon name="styledComponents" />
            <Icon name="expo" />
            <Icon name="graphql" />
            <Icon name="apollo" />
            <Icon name="postgresql" />
            <Icon name="heroku" />
            <Icon name="android" />
          </Spec>
          <Summary>
            <li>영어 단어장 앱.(안드로이드)</li>
            <li>
              구글 이미지, 앨범, 사진촬영등으로 단어에 맞는 이미지를 골라 저장할
              수 있음.
            </li>
            <li>미드 쉐도잉하는데 단어가 안외워져서 만들게됨.</li>
            <li>구상하고 출시하는데까지 약 6개월 걸림.</li>
            <li>간단한 구글이미지 스크랩핑 api 만듦.</li>
          </Summary>
          <GLink
            href="https://github.com/mestuss/wordusink-app"
            target="_blank"
          >
            Github link
          </GLink>
        </p>
      </div>
      <div id="cuttlefishssInfo">
        <p>
          <Title>커틀피쉬스</Title>
          <Spec>
            <Icon name="pug" />
            <Icon name="css" />
            <Icon name="gulp" />
            <Icon name="ghPage" />
          </Spec>
          <Summary>
            <li>오징어의 시작😎.</li>
            <li>Simple UI kit</li>
            <li>
              서비스 사이트에서 원하는 UI를 클릭하면 해당 HTML코드가 복사됨.
            </li>
            <li>카드, 버튼 요소를 매번 만드는게 귀찮아서 만들게 됨.</li>
            <li>
              리액트 플러그인으로 교체 예정.(리액트를 사용하다보니.. 안쓰게 됨)
            </li>
          </Summary>
          <GLink href="https://github.com/mestuss/cuttlefishss" target="_blank">
            Github link
          </GLink>
        </p>
      </div>
      <div id="catchMindInfo">
        <p>
          <Title>독심술</Title>
          <Spec>
            <Icon name="html" />
            <Icon name="css" />
            <Icon name="javascript" />
            <Icon name="express" />
            <Icon name="nodejs" />
            <Icon name="socketIo" />
            <Icon name="heroku" />
          </Spec>
          <Summary>
            <li>캐치마인드 게임.</li>
            <li>
              노마드 강의 'Node JS로 리얼타임 게임만들기' 에 추가기능을 얹음.
            </li>
            <li>socket 연결해서 canvas에 그려진 그림을 유저들끼리 공유함.</li>
            <li>채팅, 타이머, 색상선택 기능 추가</li>
            <li>NodeJS + SocketIo</li>
          </Summary>
          <GLink href="https://github.com/cuttleman/guess-mind" target="_blank">
            Github link
          </GLink>
        </p>
      </div>
      <div id="aboutInfo">
        <p>
          <Summary>
            <strong>안녕하세요.</strong>
            <br />
            웹개발에 입문한지 2년차가 되어가는 이준오입니다.
            <br />
            자바스크립트를 주력언어로 사용합니다.
            <br />
            <br />
            Canvas에 관심이 생겨 유튜버 Interactive Developer님 영상과 Cris
            Courses 웹사이트 강의로 공부 하고 있습니다.
            <br />
            개인적인 공부는 Nomad Coders 강의와 구글링을 통해서 하고 있고,
            <br />
            언어공부는 solo learn 앱으로 하고있습니다.
            <br />
            <br />
            앞으로 공부하고 싶은 기술은 GSAP, three.js, nest.js 이고,
            <br />
            컴퓨터 시스템에 대해 이해를 높이기 위해 C++ 공부하고있습니다.
            <br />
            (solo learn 앱으로 맛보는 중, 문법파트 넘어가면 '씹어먹는 C++ 강좌'
            학습할 예정)
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
