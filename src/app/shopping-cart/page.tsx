import { ShoppingCartProvider } from "../../contexts/ShoppingCart";
import { Checkout } from "./components/Checkout";
import { ListProducts } from "./components/ListProducts";
import { CheckoutProvider } from "./contexts/Checkout";

export default function Page() {
  return (
    <ShoppingCartProvider>
      <div className="bg-gray-800 h-full flex sm:flex-row flex-col justify-center gap-10 p-10">
        <ListProducts />
        <CheckoutProvider>
          <Checkout />
        </CheckoutProvider>
      </div>
    </ShoppingCartProvider>
  );
}
