import { Logout } from "@/components/logout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
            <DialogClose>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button autoFocus onClick={Logout}>
              Logout
            </Button>
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
    <div className="flex flex-col gap-1 text-sm w-[10vw] cursor-pointer">
      <div className="leading-none font-medium text-left">{name}</div>
      <div className="line-clamp-2 text-muted-foreground text-left">
        {children}
      </div>
    </div>
  );
};
