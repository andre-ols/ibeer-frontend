import { Button } from "@/components/ui/button";
import { shoppingCartContext } from "@/contexts/ShoppingCart";
import { FC, useContext } from "react";

export const OrderDetails: FC = () => {
  const { products, price } = useContext(shoppingCartContext);
  return (
    <div className="flex flex-col w-full justify-center items-center gap-5 p-2">
      <div className="flex flex-col w-full gap-2 p-2 max-h-[350px] overflow-auto">
        {products.map((product) => (
          <div
            key={product.beer.id}
            className="flex flex-col w-full justify-center rounded-lg items-start bg-gray-800 gap-1 p-3"
          >
            <span className="text-white font-bold text-sm">
              {product.quantity} x {product.beer.name}
            </span>
            <span className="text-white font-bold text-sm">
              Valor:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.beer.price * product.quantity)}
            </span>
          </div>
        ))}
      </div>
      <span className="text-white font-bold text-xl">
        Total:{" "}
        {
          // format to BRL
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)
        }
      </span>

      <Button variant="ghost" className="bg-amber-500 w-full">
        Realizar pagamento
      </Button>
    </div>
  );
};
