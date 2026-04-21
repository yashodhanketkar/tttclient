import { Profile } from "./profile";

type MenuType = {
  [key: string]: {
    label: string;
    items?: {
      to: string;
      title: string;
      description: string;
    }[];
    custom?: React.ReactNode;
  }[];
};

export const menu_config: MenuType = {
  auth: [
    {
      label: "Games",
      items: [
        {
          to: "/stats",
          title: "Stats",
          description: "Statistics of your games",
        },
        {
          to: "/board",
          title: "Board",
          description: "Manage or join a board",
        },
      ],
    },
    {
      label: "Account",
      custom: <Profile />,
    },
  ],
  guest: [
    {
      label: "Accounts",
      items: [
        {
          to: "/login",
          title: "Login",
          description: "Login to your account",
        },
        {
          to: "/register",
          title: "Register",
          description: "Register a new account",
        },
      ],
    },
  ],
};
