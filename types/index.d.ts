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
}
