import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="bg-gray-900 h-16 w-full flex justify-between items-center fixed top-0 left-0 px-10 z-30">
      <Link href="/showcase">
        <Image
          //   className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.png"
          alt="Next.js Logo"
          width={64}
          height={64}
          quality={100}
          priority
        />
      </Link>
      <Link href="/shopping-cart" className="bg-white rounded-md p-2">
        <ShoppingCart />
      </Link>
    </div>
  );
};
