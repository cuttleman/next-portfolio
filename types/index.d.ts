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
    interface GetViewport {
      x: number;
      y: number;
    }
    type SetViewport = (x: number, y: number) => void;
  }
}
