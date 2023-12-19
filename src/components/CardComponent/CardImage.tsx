import Image from "next/image";

export const CardImage = ({ images }: { images: any }) => {
  return (
    <>
      <Image
        src={images.logo}
        alt={"images"}
        width={200}
        height={200}
        priority
      />
    </>
  );
};
