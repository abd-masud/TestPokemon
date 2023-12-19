import { QueryKeys } from "@/Enums/enum";
import { editName } from "@/pokemonAPI/pokemonAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const useEditName = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ setId, setName }: { setId: string; setName: string }) =>
            editName(setId, setName),
        onSuccess: (params, variables) => {
            queryClient.setQueryData(
                [QueryKeys.CardSets],
                (initialSets: PokemonTCG.Set[]) => {
                    const foundSet = structuredClone(initialSets);
                    const foundSetIndex = foundSet.findIndex((set) => set.id === variables.setId);
                    foundSet[foundSetIndex].name = variables.setName;
                    return foundSet;
                }
            )
        },
    });
};