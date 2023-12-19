import Link from "next/link";
import useCart, { useCartCount } from "@/reactQueryHooks/useCart";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CardImage } from "../CardComponent/CardImage";
import { CardModalInfo } from "@/components/ModalComponent/CardModalInfo";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { getItem, setItem } from "@/tempStorage/storageFunction";
import { StampedSet } from "@/types";

export const CardModal = ({ info }: { info: PokemonTCG.Set }) => {
  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };
  const { random, setRandom } = useCartCount();
  const [cart, setCartCount] = useState<{ count: number; items: StampedSet[] }>(
    defaultState
  );
  useEffect(() => {
    let c = getItem("Cart");
    if (!c) c = defaultState;
    setCartCount(c);
  }, [random]);

  const incCount = () => {
    const newCart = {
      count: cart.count + 1,
      items: [...cart.items, { set: info, timeStamp: Date.now() } as StampedSet],
    };
    setItem("Cart", JSON.stringify(newCart));
    setCartCount(newCart);
    setRandom();
  };

  const { AddToCart, pushCartId } = useCart();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        className="px-10 py-2 mt-5 sm:text-[16px] text-[12px] rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-700 text-white transition"
        onClick={handleOpen}
      >
        Quick View
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-5" onClose={setOpen} open={open}>
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="fixed inset-0 bg-gray-700/50 dark:bg-black/50 backdrop-blur-xl transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center bottom-20 p-4 text-center  sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="duration-300"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-600 text-left shadow-xl transition-all w-[500px] sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white dark:bg-gray-600 px-5 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                      <div className="mt-3 sm:ml-4 sm:mt-0 text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-center font-semibold text-gray-900 dark:text-white"
                        >
                          Add to cart
                        </Dialog.Title>
                        <div className="mt-2">
                          <Link href={`/cardRouter/viewSet/${info.id}`}>
                            <div className="sm:h-[230px] h-[150px] sm:p-28 p-16 sm:pt-28 pt-16 mb-5 m-auto flex justify-center items-center bg-gray-100 hover:bg-gray-200 active:bg-gray-100 dark:bg-gray-500 dark:hover:bg-gray-400 dark:active:bg-gray-500 border-[1px] border-gray-300 transition rounded-md">
                              <CardImage images={info.images}></CardImage>
                            </div>
                          </Link>
                          <CardModalInfo info={info}></CardModalInfo>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-600 px-4 py-1 pb-10">
                    <div className="m-auto">
                      <div className="sm:px-10 px-5 grid grid-cols-2 text-[12px] sm:text-[16px]">
                        <div className="flex justify-start">
                          <button
                            type="button"
                            className="form-button clear w-28"
                            onClick={() => setOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="form-button submit w-28"
                            type="button"
                            onClick={() => {
                              AddToCart();
                              incCount();
                              pushCartId(info.id!);
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
