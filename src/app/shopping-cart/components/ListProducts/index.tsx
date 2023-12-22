"use client";

import { shoppingCartContext } from "@/contexts/ShoppingCart";
import { useContext } from "react";
import { ProductCard } from "../ProductCard";

export const ListProducts = () => {
  const { products } = useContext(shoppingCartContext);

  return (
    <div className="flex justify-start flex-wrap gap-5">
      {products.map((product) => (
        <ProductCard product={product} key={product.beer.id} />
      ))}
    </div>
  );
};
