"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { FC, useContext } from "react";
import {
  Product,
  shoppingCartContext,
} from "../../../../contexts/ShoppingCart";

export const CartButton: FC<{
  product: Product;
}> = ({ product }) => {
  const { addProduct, removeProduct } = useContext(shoppingCartContext);

  return (
    <div className="bg-gray-900 rounded-3xl flex gap-3 justify-center items-center">
      <Button
        variant="ghost"
        size="icon"
        className="bg-amber-500"
        onClick={() =>
          removeProduct({
            beer: product.beer,
            quantity: 1,
          })
        }
      >
        {product.quantity === 1 && <TrashIcon className="h-4 w-4" />}
        {product.quantity > 1 && <MinusIcon className="h-4 w-4" />}
      </Button>
      <span className="text-white font-bold text-sm">{product.quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="bg-amber-500"
        onClick={() =>
          addProduct({
            beer: product.beer,
            quantity: 1,
          })
        }
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
