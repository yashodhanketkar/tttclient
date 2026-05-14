import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavMenuStore } from "@/store/menustate";
import { useAuth } from "@/store/query/auth";

import { menu_config } from "./menu";

export const NavBar = () => {
  const { activeMenu, setActiveMenu } = useNavMenuStore();
  const { useMeQuery } = useAuth();

  const { data: user, isLoading, isError } = useMeQuery;

  if (isLoading) return <></>;
  if (isError) return <></>;

  const sections = user?.id ? menu_config.auth : menu_config.guest;

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
            <NavigationMenuContent>
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
      <div>
        <NavLink
          id={`nav-menu-item-${id + 1}`}
          to={to}
          className="flex flex-col gap-1 text-sm w-[10vw] p-2 hover:bg-accent"
        >
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">
            {description}
          </div>
        </NavLink>
      </div>
    }
  />
);
