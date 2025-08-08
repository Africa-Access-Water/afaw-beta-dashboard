export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "HOME",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
      },
    ],
  },
  {
    heading: "DONATION SYSTEM",
    children: [
      {
        name: "Donations",
        icon: "solar:wallet-linear",
        id: uniqueId(),
        url: "/sample-page",
      },
      {
        name: "Donors",
        icon: "solar:users-group-rounded-outline",
        id: uniqueId(),
        url: "/sample-page",
      },
      {
        name: "Newsletters",
        icon: "solar:mailbox-outline",
        id: uniqueId(),
        url: "/sample-page",
      },
    ],
  },
  {
    heading: "TEAM MANAGEMENT",
    children: [
      {
        name: "Team & Board Members",
        icon: "solar:users-group-rounded-outline",
        id: uniqueId(),
        url: "/sample-page",
      },
    ],
  }

];

export default SidebarContent;
