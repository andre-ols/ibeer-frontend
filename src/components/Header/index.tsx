import { ShoppingCart } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";

export const Header: FC = () => {
  return (
    <header className="bg-gray-900 h-16 w-full flex justify-between items-center fixed top-0 left-0 px-10 z-30">
      <h1 className="text-white font-bold">IBeer</h1>
      <Button variant="outline" size="icon">
        <ShoppingCart />
      </Button>
    </header>
  );
};
