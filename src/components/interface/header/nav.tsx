import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/auth";
import { menu_config } from "./menu";

export const NavBar = () => {
  const { user } = useAuth();
  const sections = user?.id ? menu_config.auth : menu_config.guest;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {sections.map((s) => (
          <NavigationMenuItem key={s.label}>
            <NavigationMenuTrigger>{s.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              {s.items?.map((item) => (
                <ListItem key={item.to} {...item} />
              ))}
              {s.custom && <NavigationMenuLink>{s.custom}</NavigationMenuLink>}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = ({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) => (
  <NavigationMenuLink>
    <NavLink
      to={to}
      className="flex flex-col gap-1 text-sm w-[10vw] p-2 hover:bg-accent"
    >
      <div className="leading-none font-medium">{title}</div>
      <div className="line-clamp-2 text-muted-foreground">{description}</div>
    </NavLink>
  </NavigationMenuLink>
);
