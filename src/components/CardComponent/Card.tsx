import Link from "next/link";
import React from "react";
import { CardImage } from "@/components/CardComponent/CardImage";
import { CardModal } from "../ModalComponent/CardModal";
import { NameEdit } from "../NameComponent/NameEdit";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const Card = (props: { item: PokemonTCG.Set }) => {
  return (
    <main>
      <div className="transition hover:scale-[1.02] 2xl:mx-12 xl:mx-4 md:mx-12 mb-16 bg-white dark:bg-gray-700 border sm:px-12 px-8 py-8 sm:h-[400px] h-[300px] sm:w-[400px] w-[300px] border-gray-300 rounded-2xl shadow-lg shadow-black/50">
        <Link href={`/cardRouter/viewSet/${props.item.id}`}>
          <div className="h-[150px] sm:h-[230px] w-[230px] sm:w-[300px] sm:p-16 p-10 sm:pt-16 pt-10 mb-5 m-auto flex justify-center items-center bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 active:bg-gray-100 dark:active:bg-gray-500 border-[1px] border-gray-300 transition rounded-md">
            <CardImage images={props.item.images}></CardImage>
          </div>
        </Link>
        <div className="flex relative">
          <NameEdit id={props.item.id} name={props.item.name}></NameEdit>
        </div>
        <div className="flex justify-center">
          <CardModal info={props.item}></CardModal>
        </div>
      </div>
    </main>
  );
};
