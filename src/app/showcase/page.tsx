import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BeerCard } from "./components/BeerCard";

export default async function Showcase() {
  const response = await fetch("http://localhost:3333/beer/?limit=20");
  const result = await response.json();

  return (
    <div className="bg-gray-800 flex justify-center">
      <div
        id="container"
        className="max-w-[1500px] flex flex-col items-center justify-center gap-24 p-10"
      >
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Insira o nome de uma cerveja" />
          <Button type="submit">Buscar</Button>
        </div>
        <div
          id="content"
          className="flex gap-5 h-full items-center justify-center flex-wrap"
        >
          {result.data.map((beer: Beer) => (
            <BeerCard beer={beer} key={beer.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
