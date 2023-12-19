import Image from "next/image";
import Link from "next/link";
import useCart, { useCartCount } from "@/reactQueryHooks/useCart";
import { getOneSet } from "@/pokemonAPI/pokemonAPI";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllSets } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useCards } from "@/reactQueryHooks/useCardSets";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "@/Enums/enum";
import { StampedSet } from "@/types";
import { useEffect, useState } from "react";
import { getItem, setItem } from "@/tempStorage/storageFunction";
import NoCard from "./noCard";
import DynamicLoad from "./dynamicLoad";

export const getStaticPaths: GetStaticPaths = async (qry) => {
  const data = await getAllSets();
  const tempPaths = data.map((x) => x.id);
  let tempParams: { params: { cardView: string } }[] = [];
  tempPaths.forEach((x) => {
    tempParams.push({ params: { cardView: x } });
  });
  return {
    paths: tempParams.splice(0, 5),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const queryClient = new QueryClient();
  const id = context.params?.cardView as string;
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.CardSet],
    queryFn: async () => {
      const singleCard = await getOneSet(id);
      return singleCard;
    },
  });
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 10 };
};

const setShowModal = () => {
  const defaultState: { count: 0; items: StampedSet[] } = {
    count: 0,
    items: [],
  };
  const { random, setRandom } = useCartCount();
  const [cart, setCartCount] = useState<{ count: number, items: StampedSet[] }>(
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
      items: [...cart.items, { set: cards, timeStamp: Date.now() } as StampedSet],
    };
    setItem("Cart", JSON.stringify(newCart));
    setCartCount(newCart);
    setRandom();
  };

  const router = useRouter();

  const { AddToCart, pushCartId } = useCart();

  const id = router.query.cardView as string;
  const cardObject = useCards(id);
  const cards = cardObject.data;

  if (router.isFallback) {
    return <DynamicLoad></DynamicLoad>;
  }

  if (!cards) {
    return <NoCard></NoCard>;
  }

  return (
    <div className="h-[85vh] flex justify-center items-center bg-gray-300 dark:bg-gray-900 overflow-hidden">
      <div className="bg-white dark:bg-gray-700 mx-5 dark:text-white sm:text-[16px] text-[12px] sm:pt-20 sm:h-[500px] sm:w-[800px] w-[320px] rounded-xl shadow-lg shadow-black/50">
        <div className="sm:flex">
          <div className="p-20 sm:p-5 sm:ml-10 md:ml-0 md:p-20 sm:w-[250px] md:w-[400px] w-[320px] sm:h-[300px] h-[180px] flex justify-center items-center">
            <Image
              width={300}
              height={300}
              priority
              src={cards?.images?.logo}
              alt="Card Image"
            />
          </div>
          <div className="md:border-l-2 border-black dark:border-white sm:px-14 px-10 pr-24 py-2">
            <p className="sm:py-2 py-1">
              <strong>Name : </strong>
              {cards?.name}
            </p>
            <p className="sm:py-2 py-1">
              <strong>Printed Total : </strong>
              {cards?.printedTotal}
            </p>
            <p className="sm:py-2 py-1">
              <strong>PTCGO Code : </strong>
              {cards?.ptcgoCode}
            </p>
            <p className="sm:py-2 py-1">
              <strong>Series : </strong>
              {cards?.series}
            </p>
            <p className="sm:py-2 py-1">
              <strong>Total : </strong>
              {cards?.total}
            </p>
            <p className="sm:py-2 py-1">
              <strong>Release Date : </strong>
              {cards?.releaseDate}
            </p>
            <p className="sm:py-2 py-1">
              <strong>Updated At : </strong>
              {cards?.updatedAt}
            </p>
          </div>
        </div>

        <div className="m-auto mb-10 mt-5">
          <div className="px-10 grid grid-cols-2">
            <div className="flex justify-start sm:justify-center">
              <Link href={"/"}>
                <button
                  className="form-button clear sm:w-32 w-24 justify-end"
                  type="button"
                >
                  Close
                </button>
              </Link>
            </div>
            <div className="flex justify-end sm:justify-center">
              <button
                className="form-button submit sm:w-32 w-24"
                type="button"
                onClick={() => {
                  AddToCart(), pushCartId(cards?.id), incCount();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default setShowModal;
