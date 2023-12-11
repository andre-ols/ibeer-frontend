import { Carousel } from "./components/Carrossel";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:3333/beer/${params.id}`);
  const result = await response.json();

  const data = result.data;

  return (
    <main className="bg-gray-800 h-full  min-h-screen flex justify-center">
      <div
        id="container"
        className="max-w-[1500px] w-full flex items-center justify-center p-10 gap-5"
      >
        <div className="carrousel">
          <Carousel
            images={[
              "http://localhost:3333" + `/assets/${data.name}/image-1.jfif`,
              "http://localhost:3333" + `/assets/${data.name}/image-2.jfif`,
              "http://localhost:3333" + `/assets/${data.name}/image-3.jfif`,
              "http://localhost:3333" + `/assets/${data.name}/image-4.jfif`,
            ]}
          />
        </div>

        <div
          id="details"
          className="h-full w-full max-w-[600px] flex flex-col items-center justify-center gap-5"
        >
          <header className="flex justify-between items-center w-full px-2">
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <div className="rounded-sm flex items-center justify-center bg-amber-500 px-3 py-1 h-fit">
              <span className="text-black font-bold text-xs">
                {data.category}
              </span>
            </div>
          </header>
          <div className="bg-gray-900 rounded-3xl p-5 w-full">
            <p className="text-white text-sm text-justify">
              {data.description}
            </p>
          </div>

          <div className="flex gap-5 w-full justify-between">
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

            <div className="bg-gray-900 rounded-3xl p-5 flex flex-col gap-2">
              <span className="text-white font-bold text-sm">Indicadores:</span>
              <div className="rounded-full flex items-center justify-center bg-gray-800 gap-2  px-3 py-1">
                <span className="text-white font-bold text-xs">IBU</span>
                <span className="text-white font-bold text-xs">{data.ibu}</span>
              </div>

              <div className="rounded-full flex items-center justify-center bg-gray-800 gap-2 px-3 py-1">
                <span className="text-white font-bold text-xs">ABV</span>
                <span className="text-white font-bold text-xs">
                  {data.abv}%
                </span>
              </div>

              <div className="rounded-full flex items-center justify-center bg-gray-800 gap-2 px-3 py-1">
                <span className="text-white font-bold text-xs">EBC</span>
                <span className="text-white font-bold text-xs">{data.ebc}</span>
              </div>
            </div>
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
      </div>
    </main>
  );
}
