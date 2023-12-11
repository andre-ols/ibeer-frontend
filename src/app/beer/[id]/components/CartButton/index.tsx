"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FC, useContext } from "react";
import { shoppingCartContext } from "../../contexts/ShoppingCart";

export const CartButton: FC<{
  beer: Beer;
}> = ({ beer }) => {
  const { addProduct, products, removeProduct } =
    useContext(shoppingCartContext);

  return (
    <div className="bg-gray-900 rounded-3xl p-5 flex gap-3 justify-center items-center">
      <Button
        variant="ghost"
        size="icon"
        className="bg-amber-500"
        onClick={() =>
          addProduct({
            beer,
            quantity: 1,
          })
        }
      >
        <PlusIcon className="h-4 w-4" />
      </Button>

      <span className="text-white font-bold text-sm">
        {products.reduce((acc, curr) => acc + curr.quantity, 0)}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="bg-amber-500"
        onClick={() =>
          removeProduct({
            beer,
            quantity: 1,
          })
        }
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
