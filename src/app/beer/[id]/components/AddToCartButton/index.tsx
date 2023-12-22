"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FC, useContext } from "react";
import { shoppingCartContext } from "../../../../../contexts/ShoppingCart";

export const AddToCartButton: FC<{
  beer: Beer;
}> = ({ beer }) => {
  const { addProduct } = useContext(shoppingCartContext);
  const { toast } = useToast();

  const { push } = useRouter();

  return (
    <Button
      variant="default"
      className="bg-amber-500 w-full"
      onClick={() => {
        addProduct({
          beer,
          quantity: 1,
        });

        toast({
          title: "Produto adicionado com sucesso!",
          description: "Vá até o carrinho para finalizar a compra",
        });

        push("/showcase");
      }}
    >
      Adicionar ao Carrinho
    </Button>
  );
};
