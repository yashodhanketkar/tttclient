import { LogoutButton } from "@/components/buttons/logout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Profile = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <NavDresser name="Logout">Logout from the app</NavDresser>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
            <LogoutButton />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const NavDresser = ({
  name,
  children,
}: {
  name: string;
  children: string | React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1 text-sm w-[20ch] cursor-pointer">
      <div className="leading-none font-medium text-left">{name}</div>
      <div className="line-clamp-2 text-muted-foreground text-left">
        {children}
      </div>
    </div>
  );
};
