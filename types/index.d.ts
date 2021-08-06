import { Dispatch, SetStateAction } from "react";

declare module "myTypes" {
  namespace Common {
    interface LayoutProps {
      children: React.ReactNode;
    }
    interface HelmetProps {
      title: string;
    }
  }

  namespace Hooks {
    interface WindowSizeS {
      width: number;
      height: number;
    }
  }

  namespace CanvasState {
    type Title = "Home" | "Work" | "Lecture" | "About";
    type setTitleFn = (title: Title) => void;
    interface GetViewport {
      x: number;
      y: number;
    }
  }
}
