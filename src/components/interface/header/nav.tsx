import { useAuth } from "@/hooks/auth";
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Profile } from "./profile";

export const NavBar = () => {
  const { user } = useAuth();

  if (!user.id || user.id === "") return <></>;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Games</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ListItem
              to="/stats"
              title="Stats"
              children="Statistics of your games"
            />
            <ListItem
              to="/board"
              title="Board"
              children="Manage or join a board"
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>
              <Profile />
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = ({
  to,
  title,
  children,
}: {
  to: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <NavigationMenuLink>
      <NavLink to={to}>
        <div className="flex flex-col gap-1 text-sm w-[10vw]">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavLink>
    </NavigationMenuLink>
  );
};
