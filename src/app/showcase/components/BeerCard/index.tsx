import Image from "next/image";
import { FC } from "react";

export const BeerCard: FC<{
  imageUri: string;
  title: string;
  ibu: number;
  abv: number;
  ebc: number;
}> = ({ imageUri, title, ibu, abv, ebc }) => {
  return (
    <div
      id="beer-card"
      className="h-[420px] w-[250px] flex items-end justify-end rounded-3xl relative overflow-hidden hover:cursor-pointer"
    >
      <svg
        id="wave"
        viewBox="0 0 1440 490"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-x-0 inset-y-16 z-10"
      >
        <path
          fill="rgb(17 24 39)"
          d="M0,343L80,351.2C160,359,320,376,480,359.3C640,343,800,294,960,245C1120,196,1280,147,1440,171.5C1600,196,1760,294,1920,334.8C2080,376,2240,359,2400,367.5C2560,376,2720,408,2880,359.3C3040,310,3200,180,3360,114.3C3520,49,3680,49,3840,65.3C4000,82,4160,114,4320,122.5C4480,131,4640,114,4800,155.2C4960,196,5120,294,5280,310.3C5440,327,5600,261,5760,220.5C5920,180,6080,163,6240,147C6400,131,6560,114,6720,155.2C6880,196,7040,294,7200,277.7C7360,261,7520,131,7680,114.3C7840,98,8000,196,8160,236.8C8320,278,8480,261,8640,212.3C8800,163,8960,82,9120,114.3C9280,147,9440,294,9600,310.3C9760,327,9920,212,10080,171.5C10240,131,10400,163,10560,163.3C10720,163,10880,131,11040,106.2C11200,82,11360,65,11440,57.2L11520,49L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"
        ></path>
      </svg>
      <div
        className={`h-[280px] w-full bg-gray-900 flex flex-col items-end z-10`}
      >
        <Image
          src={imageUri}
          alt={`Beer: ${title}`}
          width={250}
          height={250}
          priority
          className="absolute inset-y-0"
        />
        <div className="flex flex-col justify-end items-center w-full h-full p-3 pb-5">
          <h1 className="text-lg font-bold text-white text-center">{title}</h1>

          <div className="flex gap-2 text-white py-3">
            <div className="rounded-full flex items-center justify-center bg-slate-800 gap-2  px-3 py-1">
              <span className="text-white font-bold text-xs">IBU</span>
              <span className="text-white font-bold text-xs">{ibu}</span>
            </div>

            <div className="rounded-full flex items-center justify-center bg-slate-800 gap-2 px-3 py-1">
              <span className="text-white font-bold text-xs">ABV</span>
              <span className="text-white font-bold text-xs">{abv}</span>
            </div>

            <div className="rounded-full flex items-center justify-center bg-slate-800 gap-2 px-3 py-1">
              <span className="text-white font-bold text-xs">EBC</span>
              <span className="text-white font-bold text-xs">{ebc}</span>
            </div>
          </div>

          <span className="text-amber-500 font-bold text-2xl">R$ 50,00</span>
        </div>
      </div>
    </div>
  );
};
