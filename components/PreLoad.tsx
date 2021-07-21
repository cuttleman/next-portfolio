import styled from "styled-components";

const Container = styled.div`
  visibility: hidden;
`;

export default function PreLoad() {
  return (
    <Container>
      <img id="myImgLeft" src="/user_left.png" alt="" />
      <img id="myImgRight" src="/user_right.png" alt="" />
      <img id="toAbout" src="/to_about.png" alt="" />
      <img id="toAboutFocus" src="/to_about_focus.png" alt="" />
      <img id="toLecture" src="/to_lecture.png" alt="" />
      <img id="toLectureFocus" src="/to_lecture_focus.png" alt="" />
      <img id="toWork" src="/to_work.png" alt="" />
      <img id="toWorkFocus" src="/to_work_focus.png" alt="" />
      <img id="toHome" src="/to_home.png" alt="" />
      <img id="toHomeFocus" src="/to_home_focus.png" alt="" />
      <img id="homeBg" src="/home_background.png" alt="" />
      <img id="workBg" src="/work_background.png" alt="" />
      <img id="lectureBg" src="/lecture_background.png" alt="" />
      <img id="aboutBg" src="/about_background.png" alt="" />
    </Container>
  );
}
