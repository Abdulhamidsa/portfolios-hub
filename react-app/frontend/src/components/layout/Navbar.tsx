// import SignOutButton from "../forms/SignoutButton";
// import { VisuallyHidden } from "../ui/VisuallyHidden";
// import { useAuth } from "@/api/AuthContext";
// // import { RegisterForm } from "@/components/forms/RegisterForm";
// // import SigninForm from "@/components/forms/SigninForm";
// import { Button } from "@/components/ui/button";
// import { DialogTitle } from "@/components/ui/dialog";
// import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { navItems } from "@/routes/AppRoutes";
// import { routes } from "@/routes/AppRoutes";
// import { Menu } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// {
//   /* <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
//         <div className="w-full flex-1 md:w-auto md:flex-none">
//           <Dialog open={activeForm === "signin"} onOpenChange={(isOpen) => isOpen || setActiveForm(null)}>
//             <VisuallyHidden>
//               <DialogTitle></DialogTitle>
//             </VisuallyHidden>
//             <DialogTrigger asChild>
//               <Button className="hidden md:inline-flex" onClick={() => toggleForm("signin")}>
//                 Sign In
//               </Button>
//             </DialogTrigger>
//             <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
//               <VisuallyHidden>
//                 <DialogTitle></DialogTitle>
//               </VisuallyHidden>
//               <SigninForm openModal={setActiveForm} />
//             </DialogContent>
//           </Dialog>
//         </div>
//         <div className="w-full flex-1 md:w-auto md:flex-none">
//           <Dialog open={activeForm === "signup"} onOpenChange={(isOpen) => isOpen || setActiveForm(null)}>
//             <VisuallyHidden>
//               <DialogTitle></DialogTitle>
//             </VisuallyHidden>
//             <DialogTrigger asChild>
//               <Button className="hidden md:inline-flex" onClick={() => toggleForm("signup")}>
//                 Sign Up
//               </Button>
//             </DialogTrigger>
//             <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
//               <VisuallyHidden>
//                 <DialogTitle></DialogTitle>
//               </VisuallyHidden>
//               <RegisterForm />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div> */
// }
// export function Navbar() {
//   const { isLoggedIn } = useAuth();
//   console.log(isLoggedIn);
//   const [activeForm, setActiveForm] = useState<string | null>(null);

//   const toggleForm = (formType: string | null) => {
//     setActiveForm(formType);
//   };
//   return (
//     <div className="container flex h-full items-center justify-between relative md: mb-6">
//       <div className="md:p-6 hidden md:flex absolute top-0 z-10 bg-white w-screen">
//         <Link to="/" className="mr-6 flex items-center space-x-2">
//           <span className="h-6 w-6 rounded-full bg-primary" />
//           <span className="hidden font-bold sm:inline-block">ACME Inc</span>
//         </Link>
//         <nav className="flex items-center space-x-6 text-sm font-medium">
//           {navItems
//             .filter((item) => {
//               const route = routes.find((route) => route.path === item.path);
//               return !route?.protected || isLoggedIn;
//             })
//             .map((item) => (
//               <li key={item.path} className=" text-base">
//                 <Link to={item.path} className="text-foreground/60 transition-colors hover:text-foreground/80">
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//         </nav>
//       </div>

//       <Sheet>
//         <SheetTrigger asChild>
//           <div className="flex items-center justify-center h-full">
//             <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
//               <Menu className="h-5 w-5" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </div>
//         </SheetTrigger>
//         <SheetContent aria-describedby={undefined} side="left" className="pr-0">
//           <VisuallyHidden>
//             <DialogTitle></DialogTitle>
//           </VisuallyHidden>
//           <MobileNav toggleForm={toggleForm} />
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }
// function MobileNav({ toggleForm }: { toggleForm: (formType: string | null) => void }) {
//   const { isLoggedIn } = useAuth();
//   return (
//     <div className="flex flex-col space-y-3 pt-6">
//       <SheetClose asChild>
//         <a href="/" className="mb-4 flex items-center space-x-2">
//           <span className="h-6 w-6 rounded-full" />
//           <span className="font-bold">ACME Inc</span>
//         </a>
//       </SheetClose>
//       {navItems
//         .filter((item) => {
//           const route = routes.find((route) => route.path === item.path);
//           return !route?.protected || isLoggedIn;
//         })
//         .map((item) => (
//           <li key={item.path}>
//             <a href={item.path}>{item.label}</a>
//           </li>
//         ))}

//       {/* <SheetClose asChild>
//         <Button className="w-fit" onClick={() => toggleForm("signup")}>
//           Sign Up
//         </Button>
//       </SheetClose> */}
//       {/* <SheetClose asChild>
//         <Button className="w-fit" onClick={() => toggleForm("signin")}>
//           Sign In
//         </Button>
//       </SheetClose> */}
//       <SheetClose asChild>
//         <SignOutButton />
//       </SheetClose>
//     </div>
//   );
// }
