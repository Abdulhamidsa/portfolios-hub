import { Button } from "@/components/ui/button";
import React from "react";

interface Button {
  label: string;
  onClick: () => void;
}
const handleClick = () => {
  console.log("Button clicked");
};

const Navbar: React.FC = () => {
  return (
    <>
      <Button onClick={handleClick}></Button>
    </>
  );
};

export default Navbar;
