const SkeletonLoader = ({ height, width }: { height: number; width: string | number }) => {
  return (
    <div className=" flex  text-sm   animate-pulse">
      <div
        style={{
          height: height,
          width: width,
        }}
        className="p-1   bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400   rounded"
      ></div>
    </div>
  );
};

export default SkeletonLoader;
