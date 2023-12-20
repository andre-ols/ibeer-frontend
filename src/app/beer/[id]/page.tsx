import { FC } from "react";
import { AddToCartButton } from "./components/AddToCartButton";
import { Carousel } from "./components/Carrossel";
import { ShoppingCartProvider } from "./contexts/ShoppingCart";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <ShoppingCartProvider>
      <DetailsBeer id={params.id} />
    </ShoppingCartProvider>
  );
}

export const DetailsBeer: FC<{
  id: string;
}> = async (props) => {
  const response = await fetch(`http://localhost:3333/beer/${props.id}`);
  const result = await response.json();

  const data = result.data as Beer;

  return (
    <main className="bg-gray-800 h-full  min-h-screen flex justify-center items-center overflow-auto">
      <div
        id="container"
        className="max-w-[1300px] w-full h-full xl:max-h-[500px] flex md:flex-row flex-col flex-wrap items-center p-5 justify-center gap-5"
      >
        <Carousel
          images={[
            "http://localhost:3333" + `/assets/${data.name}/image-1.jfif`,
            "http://localhost:3333" + `/assets/${data.name}/image-2.jfif`,
            "http://localhost:3333" + `/assets/${data.name}/image-3.jfif`,
            "http://localhost:3333" + `/assets/${data.name}/image-4.jfif`,
          ]}
        />

        <div className="md:h-[500px] w-full max-w-[600px] md:max-w-[100px] bg-gray-900 rounded-3xl p-5 flex md:flex-col flex-row gap-2 justify-between">
          <div className="flex flex-col justify-center rounded-lg items-center bg-gray-800 gap-2  p-3">
            <span className="text-white font-bold text-xl">IBU</span>
            <span className="text-white font-bold text-xl">{data.ibu}</span>
          </div>

          <div className="flex flex-col justify-center rounded-lg items-center bg-gray-800 gap-2  p-3">
            <span className="text-white font-bold text-xl">ABV</span>
            <span className="text-white font-bold text-xl">{data.abv}%</span>
          </div>

          <div className="flex flex-col justify-center rounded-lg items-center bg-gray-800 gap-2  p-3">
            <span className="text-white font-bold text-xl">EBC</span>
            <span className="text-white font-bold text-xl">{data.ebc}</span>
          </div>
        </div>

        <div className="flex xl:h-[500px] max-w-[600px] flex-col items-center justify-between w-full gap-5">
          <header className="flex justify-between items-center w-full px-2">
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <div className="rounded-sm flex items-center justify-center bg-amber-500 px-3 py-1 h-fit">
              <span className="text-white font-bold text-xs">
                {data.category.name}
              </span>
            </div>
          </header>
          <div className="bg-gray-900 rounded-3xl p-5 w-full h-full">
            <p className="text-white text-sm text-justify">
              {data.description}
            </p>
          </div>

          <div className="flex md:flex-row flex-col gap-5">
            <div className="bg-gray-900 rounded-3xl p-5 flex flex-col gap-2 w-full">
              <span className="text-white font-bold text-sm">
                Comidas que armonizam:
              </span>

              {data.foodPairing.map((food: string) => (
                <div
                  key={food}
                  className="rounded-full flex items-center justify-center bg-gray-800 px-3 py-1"
                >
                  <span className="text-white font-bold text-xs">{food}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-3xl p-5 w-full">
              <span className="text-white font-bold text-sm">
                Dicas dos mestres cervejeiros:
              </span>
              <p className="text-white text-sm text-justify">
                {data.brewersTips}
              </p>
            </div>
          </div>

          <AddToCartButton beer={data} />
        </div>
      </div>
    </main>
  );
};
