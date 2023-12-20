"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

type Product = {
  beer: Beer;
  quantity: number;
};

export type ShoppingCartContext = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

export const shoppingCartContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

export const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  const { push } = useRouter();

  const addProduct = (product: Product) => {
    const productAlreadyExists = products.find(
      (p) => p.beer.id === product.beer.id
    );

    if (productAlreadyExists) {
      productAlreadyExists.quantity += product.quantity;
      setProducts([...products]);
    } else {
      setProducts([...products, product]);
    }

    toast({
      title: "Produto adicionado com sucesso!",
      description: "Vá até o carrinho para finalizar a compra",
    });

    push("/showcase");
  };

  const removeProduct = (product: Product) => {
    const productAlreadyExists = products.find(
      (p) => p.beer.id === product.beer.id
    );

    if (!productAlreadyExists) return;

    if (productAlreadyExists.quantity - product.quantity <= 0) {
      setProducts(products.filter((p) => p.beer.id !== product.beer.id));
      return;
    }

    productAlreadyExists.quantity -= product.quantity;
    setProducts([...products]);
  };

  useEffect(() => {
    const products = localStorage.getItem("products");
    if (products) {
      setProducts(JSON.parse(products));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <shoppingCartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};
