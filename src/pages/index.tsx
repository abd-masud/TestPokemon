import { Card } from "@/components/CardComponent/Card";
import { useSets } from "@/reactQueryHooks/useCardSets";
import cover from "@/Image/cover.png";
import Image from "next/image";
import { GetStaticProps } from "next";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "@/Enums/enum";
import { getAllSets } from "pokemon-tcg-sdk-typescript/dist/sdk";

export const getStaticProps = async (
  context: GetStaticProps
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.CardSets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) }
  };
};

export default function CardSets() {
  const setObject = useSets();
  const sets = setObject.data;
  sets?.sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));

  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <div className="sm:py-40 py-16 px-[10%] container m-auto">
        <Image
          className="h-auto w-auto m-auto"
          src={cover}
          alt="Logo"
          priority
        ></Image>
      </div>
      <div className="flex justify-center">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
          {sets ? (
            sets.map((item, index) => <Card item={item} key={index}></Card>)
          ) : (
            <>
              <div className="transition hover:-translate-y-3 2xl:mx-12 xl:mx-4 md:mx-12 mb-16">
                <div className="card">Loading</div>
              </div>

              <div className="transition hover:-translate-y-3 2xl:mx-12 xl:mx-4 md:mx-12 mb-16">
                <div className="card">Loading</div>
              </div>

              <div className="transition hover:-translate-y-3 2xl:mx-12 xl:mx-4 md:mx-12 mb-16">
                <div className="card">Loading</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
