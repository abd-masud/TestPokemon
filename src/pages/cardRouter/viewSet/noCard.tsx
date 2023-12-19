import Image from "next/image";
import emptyCard from "@/Image/emptyCard.png";

const NoCard = () => {
  return (
    <main className="h-[85vh] flex flex-col justify-center items-center text-center overflow-y-hidden bg-gray-300 dark:bg-gray-900">
      <Image
        className="sm:h-[300px] h-[200px] w-auto pb-10"
        width={200}
        height={200}
        src={emptyCard}
        alt="Empty Item"
        priority
      ></Image>
      <h3 className="text-center text-[30px] sm:text-[40px] dark:text-white">
        No items found :(
      </h3>
    </main>
  );
};

export default NoCard;
