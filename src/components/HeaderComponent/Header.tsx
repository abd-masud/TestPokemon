import pokemon from "@/Image/pokemon.png";
import Image from "next/image";
import Link from "next/link";
import useLogin from "@/reactQueryHooks/useLogin";
import CartSVG from "../SVGComponent/CartSVG";
import { useCartCount } from "@/reactQueryHooks/useCart";
import { useRouter } from "next/router";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useEffect, useState } from "react";
import { getItem } from "@/tempStorage/storageFunction";

export default function HeaderComponent() {
  const defaultState: { count: 0; items: PokemonTCG.Set[] } = {
    count: 0,
    items: [],
  };
  const { random, setRandom } = useCartCount();
  const [cart, setCartCount] = useState<{
    count: number;
    items: PokemonTCG.Set[];
  }>(defaultState);
  useEffect(() => {
    let count = getItem("Cart");
    if (!count) count = defaultState;
    setCartCount(count);
  }, [random]);

  const router = useRouter();
  const { login } = useLogin();
  const { username, updateLogin, updateUsername } = useLogin();

  return (
    <main className="bg-black text-white sticky top-0 z-10 sm:text-[16px] text-[12px]">
      <div className="container m-auto grid grid-cols-3">
        <div className="ml-3 my-auto flex items-center">
          <Link href={"/CartComponent/"}>
            <button
              type="button"
              className="flex items-center transition bg-gray-900 hover:bg-gray-800 active:bg-gray-900 px-4 rounded-md "
            >
              <CartSVG></CartSVG>
              {cart?.count}
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link href={"/"}>
            <Image
              className="h-auto w-48 my-2"
              src={pokemon}
              alt="Logo"
              priority
            ></Image>
          </Link>
        </div>
        <div className="flex justify-end items-center mr-3">
          <div className="sm:visible invisible">{username}</div>
          <Link href={"/LoginComponent/"}>
            <button
              onClick={(e) => {
                updateLogin("Login");
                updateUsername("");
              }}
              className="transition bg-gray-700 hover:bg-gray-600 active:bg-gray-700 py-1 px-5 rounded-md ml-5"
              type="submit"
            >
              {login}
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
function setItem(count: any) {
  throw new Error("Function not implemented.");
}
