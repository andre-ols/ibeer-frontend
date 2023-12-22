"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

export type Product = {
  beer: Beer;
  quantity: number;
};

class Order {
  private price: number;
  private products: Product[];
  static INSTANCE: Order | null = null;
  private constructor() {
    const products = localStorage.getItem("products");
    this.products = products ? JSON.parse(products) : [];
    this.price = this.products.reduce(
      (acc, product) => acc + product.beer.price * product.quantity,
      0
    );
  }

  static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new Order();
    }
    return this.INSTANCE;
  }

  public getProducts() {
    return this.products;
  }

  public getPrice() {
    return this.price;
  }

  public addProduct(product: Product) {
    const productAlreadyExists = this.products.find(
      (p) => p.beer.id === product.beer.id
    );

    console.log(productAlreadyExists);

    if (productAlreadyExists) {
      productAlreadyExists.quantity += product.quantity;
      this.products = [...this.products];
    } else {
      this.products = [...this.products, product];
    }

    this.price += product.beer.price * product.quantity;
  }

  public removeProduct(product: Product) {
    const productAlreadyExists = this.products.find(
      (p) => p.beer.id === product.beer.id
    );

    if (!productAlreadyExists) return;

    if (productAlreadyExists.quantity < product.quantity)
      throw new Error("Invalid quantity");

    productAlreadyExists.quantity -= product.quantity;
    this.price -= product.beer.price * product.quantity;

    if (productAlreadyExists.quantity == 0) {
      this.products = this.products.filter(
        (p) => p.beer.id !== product.beer.id
      );
      return;
    }

    this.products = [...this.products];
  }
}

export type ShoppingCartContext = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  price: number;
};

export const shoppingCartContext = createContext<ShoppingCartContext>(
  {} as ShoppingCartContext
);

export const ShoppingCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const order = Order.getInstance();

  const removeProduct = (product: Product) => {
    order.removeProduct(product);

    localStorage.setItem("products", JSON.stringify(order.getProducts()));

    setProducts(order.getProducts());
  };

  const addProduct = (product: Product) => {
    console.log(product);
    console.log(order.getProducts());
    order.addProduct(product);

    console.log("adicionado");
    console.log(order.getProducts());

    localStorage.setItem("products", JSON.stringify(order.getProducts()));

    setProducts(order.getProducts());
  };

  useEffect(() => {
    setProducts(order.getProducts());
  }, []);

  return (
    <shoppingCartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        price: order.getPrice(),
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};
