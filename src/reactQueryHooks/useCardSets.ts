import { QueryKeys } from "@/Enums/enum"
import { getAllSets, getOneSet } from "@/pokemonAPI/pokemonAPI";
import { useQuery } from "@tanstack/react-query"
import { PokemonTCG } from "pokemon-tcg-sdk-typescript"

export const useSets = (isEnabled: boolean = false) => {
  return useQuery<PokemonTCG.Set[]>({
      queryKey: [QueryKeys.CardSets],
      queryFn: async () => {
          const sets = await getAllSets();
          return sets;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retryOnMount:false,
      enabled: true,
      retry: 1
  });
};

export const useCards = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.CardSet],
    queryFn: async () => {
      const singleCard = await getOneSet(id);
      return singleCard;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: true,
    retry: 1
  });
};