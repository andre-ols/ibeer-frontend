"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import Cards, { Focused } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export const Payment: FC = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState<Focused>("number");
  return (
    <div className="flex flex-col w-full justify-center items-center gap-5 p-2 overflow-auto">
      <Cards
        number={number}
        name={name}
        expiry={date}
        cvc={cvc}
        focused={focus}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="number" className="text-white">
          Número do cartão
        </Label>
        <Input
          type="text"
          id="number"
          placeholder="Número do Cartão"
          onFocus={() => setFocus("number")}
          onChange={(e) => setNumber(e.target.value)}
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
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name" className="text-white">
          Nome que está no cartão
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Nome que está no cartão"
          onFocus={() => setFocus("name")}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <div className="grid max-w-xs items-center gap-1.5">
          <Label className="text-white" htmlFor="expiry">
            Data de expiração
          </Label>
          <Input
            type="text"
            id="expiry"
            placeholder="MM/AA"
            onFocus={() => setFocus("expiry")}
            onChange={(e) => setDate(e.target.value)}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              const input = target.value.replace(/\D/g, "").substring(0, 4);
              const month = input.substring(0, 2);
              const year = input.substring(2, 4);

              if (month && year) target.value = month + "/" + year;
            }}
          />
        </div>
        <div className="grid max-w-xs items-center gap-1.5">
          <Label htmlFor="cvc" className="text-white">
            CVC
          </Label>
          <Input
            type="text"
            id="cvc"
            placeholder="Código de segurança"
            onFocus={() => setFocus("cvc")}
            onChange={(e) => setCvc(e.target.value)}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/\D/g, "").substring(0, 3);
            }}
          />
        </div>
      </div>
    </div>
  );
};
