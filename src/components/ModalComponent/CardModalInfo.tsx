import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const CardModalInfo = ({ info }: { info: Partial<PokemonTCG.Set> }) => {
  return (
    <div className="sm:px-10 px-5 pb-1 dark:text-white sm:text-[16px] text-[12px]">
      <p className="pb-2">
        <span className="font-bold">Name :</span> {info.name}
      </p>
      <p className="pb-2">
        <span className="font-bold">Printed Total :</span> {info.printedTotal}
      </p>
      <p className="pb-2">
        <span className="font-bold">PTCGO Code :</span> {info.ptcgoCode}
      </p>
      <p className="pb-2">
        <span className="font-bold">Series :</span> {info.series}
      </p>
      <p className="pb-2">
        <span className="font-bold">Total :</span> {info.total}
      </p>
      <p className="pb-2">
        <span className="font-bold">Release Date :</span> {info.releaseDate}
      </p>
      <p className="pb-2">
        <span className="font-bold">Updated At :</span> {info.updatedAt}
      </p>
    </div>
  );
};
