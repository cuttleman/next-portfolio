import Structure from "./canvasItems/Structure";
import User from "./canvasItems/User";

export const positionManipulator = (target: User) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    target.directionControl(e);
  });
};

export const insertTarget = (targets: Structure[]) => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const { code } = e;
    if (code === "Enter") {
      targets.forEach((target) => target.insertPage());
    }
  });
};

export const preloadImages = () => {
  const body = document.querySelector("canvas");

  const myImgLeft = document.createElement("img");
  const myImgRight = document.createElement("img");
  const about = document.createElement("img");
  const aboutFocus = document.createElement("img");
  const lecture = document.createElement("img");
  const lectureFocus = document.createElement("img");
  const work = document.createElement("img");
  const workFocus = document.createElement("img");
  const home = document.createElement("img");
  const homeFocus = document.createElement("img");

  myImgLeft.src = "/left_me.png";
  myImgRight.src = "/right_me.png";
  about.src = "/about.png";
  aboutFocus.src = "/about_focus.png";
  lecture.src = "/lecture.png";
  lectureFocus.src = "/lecture_focus.png";
  work.src = "/work.png";
  workFocus.src = "/work_focus.png";
  home.src = "/home.png";
  homeFocus.src = "/home_focus.png";

  myImgLeft.id = "myImg_left";
  myImgRight.id = "myImg_right";
  about.id = "about";
  aboutFocus.id = "about_focus";
  lecture.id = "lecture";
  lectureFocus.id = "lecture_focus";
  work.id = "work";
  workFocus.id = "work_focus";
  home.id = "home";
  homeFocus.id = "home_focus";

  body?.append(myImgLeft);
  body?.append(myImgRight);
  body?.append(about);
  body?.append(aboutFocus);
  body?.append(lecture);
  body?.append(lectureFocus);
  body?.append(work);
  body?.append(workFocus);
  body?.append(home);
  body?.append(homeFocus);
};
