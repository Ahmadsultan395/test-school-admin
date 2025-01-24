export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  activeIcon: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
