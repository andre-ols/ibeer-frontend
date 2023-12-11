"use client";

import { Button } from "@/components/ui/button";
import { FC, useContext } from "react";
import { shoppingCartContext } from "../../contexts/ShoppingCart";

export const AddToCartButton: FC<{
  beer: Beer;
}> = ({ beer }) => {
  const { addProduct } = useContext(shoppingCartContext);

  return (
    <Button
      variant="default"
      className="bg-amber-500 w-full"
      onClick={() =>
        addProduct({
          beer,
          quantity: 1,
        })
      }
    >
      Adicionar ao Carrinho
    </Button>
  );
};
