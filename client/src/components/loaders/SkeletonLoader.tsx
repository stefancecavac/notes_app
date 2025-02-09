const SkeletonLoader = ({ height, width }: { height: number; width: string | number }) => {
  return (
    <div
      className="skeleton"
      style={{
        height: height,
        width: width,
      }}
    ></div>
  );
};

export default SkeletonLoader;
