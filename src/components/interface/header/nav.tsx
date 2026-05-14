import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/authState";
import { useNavMenuStore } from "@/store/menustate";

import { menu_config } from "./menu";

export const NavBar = () => {
  const { token } = useAuthStore();
  const { activeMenu, setActiveMenu } = useNavMenuStore();

  const sections = token !== "" ? menu_config.auth : menu_config.guest;

  return (
    <NavigationMenu
      value={activeMenu}
      onValueChange={setActiveMenu}
      className="ml-auto"
    >
      <NavigationMenuList>
        {sections.map((s) => (
          <NavigationMenuItem key={s.label} value={s.label}>
            <NavigationMenuTrigger id={s.label + "-trigger"}>
              {s.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[20ch]">
              {s.items?.map((item, i) => (
                <ListItem id={i} key={item.to} {...item} />
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
  id,
  to,
  title,
  description,
}: {
  id: number;
  to: string;
  title: string;
  description: string;
}) => (
  <NavigationMenuLink
    render={
      <NavLink
        id={`nav-menu-item-${id + 1}`}
        to={to}
        className="flex flex-col gap-1 text-sm p-2 hover:bg-accent w-full items-start"
      >
        <div className="leading-none font-medium">{title}</div>
        <div className="line-clamp-2 text-muted-foreground">{description}</div>
      </NavLink>
    }
  />
);
