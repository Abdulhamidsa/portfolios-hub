import { VisuallyHidden } from "../ui/VisuallyHidden";
import { RegisterForm } from "@/components/auth/RegisterForm";
import SigninForm from "@/components/auth/SigninForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/routes/routes";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const toggleForm = (formType: string | null) => {
    setActiveForm(formType);
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
          <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent text-white hover:text-gray-500 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <Menu className="h-5 w-5 " />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby={undefined} side="left" className="pr-0">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          <MobileNav toggleForm={toggleForm} />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Dialog open={activeForm === "auth"} onOpenChange={(isOpen) => isOpen || setActiveForm(null)}>
            <VisuallyHidden>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
            <DialogTrigger asChild>
              <Button className="hidden md:inline-flex" onClick={() => toggleForm("auth")}>
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
              <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
              <SigninForm OpenModal={setActiveForm} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Dialog open={activeForm === "signup"} onOpenChange={(isOpen) => isOpen || setActiveForm(null)}>
            <VisuallyHidden>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
            <DialogTrigger asChild>
              <Button className="hidden md:inline-flex" onClick={() => toggleForm("signup")}>
                Sign Up
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
              <VisuallyHidden>
                <DialogTitle></DialogTitle>
              </VisuallyHidden>
              <RegisterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ toggleForm }: { toggleForm: (formType: string | null) => void }) {
  return (
    <div className="flex flex-col space-y-3 pt-6">
      <SheetClose asChild>
        <a href="/" className="mb-4 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full" />
          <span className="font-bold">ACME Inc</span>
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
        <Button className="w-fit" onClick={() => toggleForm("signup")}>
          Sign Up
        </Button>
      </SheetClose>
      <SheetClose asChild>
        <Button className="w-fit" onClick={() => toggleForm("auth")}>
          Sign In
        </Button>
      </SheetClose>
    </div>
  );
}
