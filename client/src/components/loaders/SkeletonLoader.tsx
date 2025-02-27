const SkeletonLoader = ({ height, width }: { height: number; width: string | number }) => {
  return (
    <div
      className="animate-pulse bg-neutral rounded-lg "
      style={{
        height: height,
        width: width,
      }}
    ></div>
  );
};

export default SkeletonLoader;
