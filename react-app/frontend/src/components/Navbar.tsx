import { navItems } from "../routes/routes";
import MultiStepLoginFormComponent from "./MultiStepLoginFormComponent";
import { MultiStepSignupFormComponent } from "./MultiStepSignupFormComponent";
// import MultiStepLoginFormComponent from "./MultiStepLoginFormComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [isSignupFormVisible, setSignupFormVisible] = useState(false);

  const toggleSignupForm = () => {
    setSignupFormVisible(!isSignupFormVisible);
  };
  const toggleAuthForm = () => {
    setAuthFormVisible(!isAuthFormVisible);
  };

  return (
    <div className="container px-5 flex h-14 items-center justify-between">
      <div className="mr-4 hidden md:flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full bg-primary" />
          <span className="hidden font-bold sm:inline-block">ACME Inc</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="pr-0">
          <MobileNav toggleAuthForm={toggleAuthForm} />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Dialog open={isAuthFormVisible} onOpenChange={setAuthFormVisible}>
            <DialogTrigger asChild>
              <Button className="hidden md:inline-flex" onClick={toggleAuthForm}>
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <MultiStepLoginFormComponent />
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Dialog open={isSignupFormVisible} onOpenChange={setSignupFormVisible}>
            <DialogTrigger asChild>
              <Button className="hidden md:inline-flex" onClick={toggleSignupForm}>
                Sign Up
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
              <MultiStepSignupFormComponent />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ toggleAuthForm }: { toggleAuthForm: () => void }) {
  return (
    <div className="flex flex-col space-y-3 pt-6">
      <a href="/" className="mb-4 flex items-center space-x-2">
        <span className="h-6 w-6 rounded-full bg-primary" />
        <span className="font-bold">ACME Inc</span>
      </a>
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} className="text-foreground/60 transition-colors hover:text-foreground/80">
          {item.label}
        </Link>
      ))}

      <Button className="w-fit" onClick={toggleAuthForm}>
        Sign In / Sign Up
      </Button>
    </div>
  );
}
