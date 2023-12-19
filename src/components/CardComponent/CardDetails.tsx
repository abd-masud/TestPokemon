export const CardDetails = (props: { name: string }) => {
  return (
    <div className="">
      <h2 className=" sm:text-[16px] text-[12px] dark:text-white">
        <span className="font-bold">Name :</span> {props.name}
      </h2>
    </div>
  );
};
