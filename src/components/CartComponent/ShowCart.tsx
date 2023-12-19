import Image from "next/image";
import { useCartCount } from "@/reactQueryHooks/useCart";
import { TrashSVG } from "../SVGComponent/TrashSVG";
import { StampedSet } from "@/types";
import { useEffect, useState } from "react";
import { deleteItem, getItem, setItem } from "@/tempStorage/storageFunction";

const ShowCart = ({ item }: { item: StampedSet }) => {
  const { random, setRandom } = useCartCount();
  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };
  const [cart, setCartCount] = useState<{ count: number; items: StampedSet[] }>(
    defaultState
  );

  useEffect(() => {
    let count = getItem("Cart");
    if (!count) count = defaultState;
    setCartCount(count);
  }, [random]);

  const removeCartCount = () => {
    let x = deleteItem("Cart");
    const filteredItems = cart.items.filter(
      (i) => !(i.set.id === item.set.id && i.timeStamp === item.timeStamp)
    );
    const newCart = { count: cart.count - 1, items: [...filteredItems] };
    setItem("Cart", JSON.stringify(newCart));
    setCartCount(newCart);
    setRandom();
  };

  return (
    <div className="grid grid-cols-5 m-5 border-2 border-gray-400 bg-gray-300 dark:bg-gray-700 shadow-lg shadow-gray-700 sm:h-32 h-24">
      <div className="flex justify-center items-center ml-2">
        <Image
          src={item?.set?.images?.logo}
          alt={"images"}
          height={80}
          width={80}
          priority
        />
      </div>
      <div className="flex justify-start items-center col-span-3 pl-5">
        <p className="dark:text-white sm:text-[16px] text-[12px]">
          <span className="font-bold">Name : </span>
          {item?.set?.name}
        </p>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="fill-white flex justify-center items-center form-button clear sm:w-10 w-8 sm:h-10 h-8 clear transition"
          type="button"
          onClick={() => {
            removeCartCount();
          }}
        >
          <TrashSVG></TrashSVG>
        </button>
      </div>
    </div>
  );
};

export default ShowCart;
