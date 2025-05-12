import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo.jpg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Action = {
  isButton?: boolean;
  href: string;
  text: string;
};

type MobileLink = {
  href: string;
  text: string;
};

interface NavbarProps {
  className?: string;
  logo?: React.ReactNode;
  name?: string;
  homeUrl?: string;
  actions: Action[];
  mobileLinks: MobileLink[];
  showNavigation?: boolean;
  customNavigation?: React.ReactNode;
}

export default function Navbar({
  className,
  logo,
  name,
  homeUrl = "/",
  actions,
  mobileLinks,
  showNavigation,
  customNavigation,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 bg-white border-b", className)}>
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link
            to={homeUrl}
            className="flex items-center gap-2 text-xl font-bold"
          >
            {/* <img src={Logo} alt="Logo" className="w-25 h-25" /> */}
            <span style={{ color: "blue", fontSize: "30px" }}>LMS</span>
            {/* {name} */}
          </Link>
          {showNavigation && (customNavigation || null)}
        </div>

        {/* Right - Desktop */}
        <div className=" flex items-center gap-4">
          {actions.map((action, i) =>
            action.isButton ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant={"ghost"}
                    key={i}
                    className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    {action.text}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sing Up</SheetTitle>
                    <SheetDescription>
                      Make changes to your account here. Change the username and
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit" variant={"outline"}>Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ) : (
              <Link
                key={i}
                to={action.href}
                className="text-md text-gray-600 hover:text-black p-2 bg-gray-100 rounded hover:bg-gray-50"
              >
                {action.text}
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-4">
          <nav className="flex flex-col gap-3 mt-2">
            <a href={homeUrl} className="text-xl font-bold">
              {name}
            </a>
            {mobileLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-gray-600 hover:text-black"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
