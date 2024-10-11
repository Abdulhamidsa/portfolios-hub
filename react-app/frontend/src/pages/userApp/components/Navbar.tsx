import SignOutButton from "../../guestApp/components/auth/SignoutButton";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authRoutes } from "@/routes/routes";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container px-5 flex h-14 items-center justify-between w-full">
      <div className="mr-4 hidden md:flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full bg-primary" />
          <span className="hidden font-bold sm:inline-block">ACME Inc</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {authRoutes.map((item) => (
            <Link key={item.path} to={item.path} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {item.label}
            </Link>
          ))}
          <div className=" mr-auto">
            <SignOutButton />
          </div>
        </nav>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <Menu className="h-5 w-5 " />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby={undefined} side="left" className="pr-0">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          <MobileNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}
function MobileNav() {
  return (
    <div className="flex flex-col space-y-3 pt-6">
      <SheetClose asChild>
        <a href="/" className="mb-4 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full" />
          <span className="font-bold">LOGO</span>
        </a>
      </SheetClose>
      {navItems.map((item) => (
        <SheetClose key={item.path} asChild>
          <Link to={item.path} className="text-foreground/60 transition-colors hover:text-foreground/80">
            {item.label}
          </Link>
        </SheetClose>
      ))}

      <SheetClose asChild>
        <SignOutButton />
      </SheetClose>
    </div>
  );
}
