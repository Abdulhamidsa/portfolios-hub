import { AuthFormWithImage } from "./auth-form-with-image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <div className="container px-5 flex h-14 items-center justify-between">
      <div className="mr-4 hidden md:flex">
        <a href="/" className="mr-6 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full bg-primary" />
          <span className="hidden font-bold sm:inline-block">ACME Inc</span>
        </a>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {item.label}
            </a>
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
          <MobileNav />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Button className="hidden md:inline-flex">Sign In</Button>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);

  const toggleAuthForm = () => {
    setAuthFormVisible(!isAuthFormVisible);
  };
  return (
    <div className="flex flex-col space-y-3 pt-6">
      <a href="/" className="mb-4 flex items-center space-x-2">
        <span className="h-6 w-6 rounded-full bg-primary" />
        <span className="font-bold">ACME Inc</span>
      </a>
      {navItems.map((item) => (
        <a key={item.href} href={item.href} className="text-foreground/60 transition-colors hover:text-foreground/80">
          {item.label}
        </a>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit" onClick={toggleAuthForm}>
            Sign In / Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <AuthFormWithImage />
        </DialogContent>
      </Dialog>
    </div>
  );
}
