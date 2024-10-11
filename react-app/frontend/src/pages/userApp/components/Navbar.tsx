import SignOutButton from "../../guestApp/components/auth/SignoutButton";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/authContext";
import { authRoutes, guestRoutes } from "@/routes/routes";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="container px-5 flex h-14 items-center w-full max-w-full bg-blue-gray-400 ">
      <nav className="flex items-center text-sm font-medium w-full gap-7">
        <Link to="/" className="mr-6 flex items-center space-x-2 w-14">
          <img src="/logo.png" className="w-full" alt="" />
        </Link>

        {isAuthenticated ? (
          <>
            {authRoutes.map((item) => (
              <Link key={item.path} to={item.path} className=" transition-colors hover:text-gray-500 text-fff">
                {item.label}
              </Link>
            ))}
            <div className=" ml-auto">
              <SignOutButton />
            </div>
          </>
        ) : (
          <>
            {guestRoutes.map((item) => (
              <Link key={item.path} to={item.path} className="transition-colors hover:text-gray-500 text-fff">
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>
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
          <MobileNav isAuthenticated={isAuthenticated} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
function MobileNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="flex flex-col space-y-3 pt-6">
      <SheetClose asChild>
        <a href="/" className="mb-4 flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full" />
          <span className="font-bold">LOGO</span>
        </a>
      </SheetClose>
      {isAuthenticated ? (
        <>
          {authRoutes.map((item) => (
            <SheetClose key={item.path} asChild>
              <Link to={item.path} className="text-foreground/60 transition-colors hover:text-foreground/80">
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </>
      ) : (
        <>
          {guestRoutes.map((item) => (
            <SheetClose key={item.path} asChild>
              <Link to={item.path} className="text-foreground/60 transition-colors hover:text-foreground/80">
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </>
      )}

      <SheetClose asChild>
        <SignOutButton />
      </SheetClose>
    </div>
  );
}
