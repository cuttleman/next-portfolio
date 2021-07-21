import styled from "styled-components";

const Container = styled.div`
  visibility: hidden;
`;

export default function PreLoad() {
  return (
    <Container>
      <img id="myImg_left" src="/left_me.png" alt="" />
      <img id="myImg_right" src="/right_me.png" alt="" />
      <img id="about" src="/about.png" alt="" />
      <img id="about_focus" src="/about_focus.png" alt="" />
      <img id="lecture" src="/lecture.png" alt="" />
      <img id="lecture_focus" src="/lecture_focus.png" alt="" />
      <img id="work" src="/work.png" alt="" />
      <img id="work_focus" src="/work_focus.png" alt="" />
      <img id="home" src="/home.png" alt="" />
      <img id="home_focus" src="/home_focus.png" alt="" />
      <img id="background" src="/background.png" alt="" />
      <img id="surface" src="/surface.png" alt="" />
      <img id="ship" src="/ship.png" alt="" />
      <img id="deep" src="/deep.png" alt="" />
    </Container>
  );
}
