"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { shoppingCartContext } from "@/contexts/ShoppingCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { checkoutContext } from "../../contexts/Checkout";

const schema = z.object({
  number: z.string().length(19, "O número do cartão deve ter 19 caracteres"),
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  date: z.string().length(5, "A data ter o formato MM/AA"),
  cvc: z.string().length(3, "O CVC deve ter 3 caracteres"),
});

export const Payment: FC = () => {
  const { goToStep } = useContext(checkoutContext);
  const { products, clearCart } = useContext(shoppingCartContext);

  const { toast } = useToast();

  const { push } = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      number: "",
      name: "",
      date: "",
      cvc: "",
    },
  });

  const [focus, setFocus] = useState<Focused>("number");

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    try {
      await fetch("http://localhost:3333/checkout", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          beers: products.map((product) => ({
            id: product.beer.id,
            quantity: product.quantity,
          })),
          payment: {
            cardNumber: values.number,
            holderName: values.name,
            expirationDate: values.date,
            cvv: values.cvc,
          },
        }),
      });

      toast({
        title: "Pedido realizado com sucesso!",
        description: "Obrigado pela preferência",
      });

      clearCart();

      push("/showcase");
    } catch (error) {
      console.log(error);

      toast({
        title: "Erro ao realizar o pedido",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        buttonRef.current!.click();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-5 p-2 overflow-auto">
      <Cards
        number={form.watch("number")}
        name={form.watch("name")}
        expiry={form.watch("date")}
        cvc={form.watch("cvc")}
        focused={focus}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="grid w-full max-w-sm items-center gap-2">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Número do cartão</FormLabel>
                  <FormControl>
                    <Input
                      onFocus={() => setFocus("number")}
                      placeholder="Número do cartão"
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{4})(\d)/, "$1 $2")
                          .replace(/(\d{4})(\d)/, "$1 $2")
                          .replace(/(\d{4})(\d)/, "$1 $2");
                        // max length
                        if (target.value.length > 19) {
                          target.value = target.value.substring(0, 19);
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Nome que está no cartão
                  </FormLabel>
                  <FormControl>
                    <Input
                      onFocus={() => setFocus("name")}
                      placeholder="Nome que está no cartão"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Data de expiração
                    </FormLabel>
                    <FormControl>
                      <Input
                        onFocus={() => setFocus("expiry")}
                        placeholder="MM/AA"
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          const input = target.value
                            .replace(/\D/g, "")
                            .substring(0, 4);
                          const month = input.substring(0, 2);
                          const year = input.substring(2, 4);

                          if (month && year) target.value = month + "/" + year;
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">CVC</FormLabel>
                    <FormControl>
                      <Input
                        onFocus={() => setFocus("cvc")}
                        placeholder="Código de segurança"
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value
                            .replace(/\D/g, "")
                            .substring(0, 3);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="ghost"
              className="bg-amber-500"
              onClick={() => goToStep("Detalhes")}
              size="icon"
            >
              <ArrowLeftIcon size={24} />
            </Button>
            <Button
              ref={buttonRef}
              variant="ghost"
              className="bg-amber-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Finalizar pedido
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
