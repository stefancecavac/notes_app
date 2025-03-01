import SkeletonLoader from "./SkeletonLoader";

export const HeaderSkeleton = () => {
  return (
    <div className={` sticky top-0  min-w-full flex z-60 items-center justify-between text-sm bg-base-100 px-3 py-2`}>
      <div className="flex items-center gap-2">
        <SkeletonLoader width={150} height={25}></SkeletonLoader>
      </div>

      <div className="flex items-center gap-2 text-xs ">
        <SkeletonLoader width={50} height={25}></SkeletonLoader>
      </div>
    </div>
  );
};
