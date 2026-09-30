import { NavGroup } from "@/types";
import { JOB_PATHS, TEAM_PATHS } from "./paths.config";

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/overview",
        icon: "dashboard",
        isActive: false,
        shortcut: ["d", "d"],
        items: [],
      },
      {
        title: "Workspaces",
        url: "/dashboard/workspaces",
        icon: "workspace",
        isActive: false,
        items: [],
      },
      {
        title: "Teams",
        url: TEAM_PATHS.TEAMS,
        icon: "teams",
        isActive: false,
        items: [],
        access: { requireOrg: true },
      },
      {
        title: "Product",
        url: "/dashboard/product",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Jobs",
        url: JOB_PATHS.JOBS,
        icon: "post",
        isActive: true,
        items: [],
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: "teams",
        shortcut: ["u", "u"],
        isActive: false,
        items: [],
      },
      {
        title: "Kanban",
        url: "/dashboard/kanban",
        icon: "kanban",
        shortcut: ["k", "k"],
        isActive: false,
        items: [],
      },
      {
        title: "Chat",
        url: "/dashboard/chat",
        icon: "chat",
        shortcut: ["c", "c"],
        isActive: false,
        items: [],
      },
    ],
  },
];
