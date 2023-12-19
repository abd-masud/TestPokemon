import { PokemonTCG } from "pokemon-tcg-sdk-typescript"

export const getAllSets = async () => {
    const AllCard = await PokemonTCG.getAllSets();
    return AllCard;
}

export const getOneSet = async (setId: string) => {
    const OneCard = await PokemonTCG.findSetByID(setId);
    if(Array.isArray(OneCard)) return undefined;
    return OneCard;
}

export const editName = async (setId: string, setName: string) => {
    return{
        message: "name changed",
    };
};